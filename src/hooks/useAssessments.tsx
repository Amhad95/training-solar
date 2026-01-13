import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useEnrollment } from './useEnrollment';

export interface Assessment {
  id: string;
  title: string;
  description: string | null;
  type: 'quiz' | 'assignment' | 'practical_task' | 'capstone';
  max_score: number;
  passing_score: number;
  weight: number;
  time_limit_minutes: number | null;
  attempt_limit: number;
  opens_at: string | null;
  closes_at: string | null;
  course: {
    id: string;
    code: string;
    name: string;
  };
}

export interface AssessmentSubmission {
  id: string;
  assessment_id: string;
  attempt_number: number;
  status: 'pending' | 'submitted' | 'graded' | 'returned';
  submitted_at: string | null;
  score: number | null;
  feedback: string | null;
  assessment: Assessment;
}

export interface PendingTask {
  id: string;
  title: string;
  type: 'quiz' | 'assignment' | 'practical_task' | 'capstone';
  courseCode: string;
  courseName: string;
  dueDate: string | null;
  status: 'pending' | 'submitted' | 'overdue';
}

export function useAssessments() {
  const { data: enrollment } = useEnrollment();

  return useQuery({
    queryKey: ['assessments', enrollment?.cohort_id],
    queryFn: async (): Promise<Assessment[]> => {
      if (!enrollment?.cohort_id) return [];

      const { data, error } = await supabase
        .from('assessments')
        .select(`
          id,
          title,
          description,
          type,
          max_score,
          passing_score,
          weight,
          time_limit_minutes,
          attempt_limit,
          opens_at,
          closes_at,
          course:courses!inner (
            id,
            code,
            name,
            cohort_id
          )
        `)
        .eq('courses.cohort_id', enrollment.cohort_id)
        .order('closes_at', { ascending: true, nullsFirst: false });

      if (error) throw error;
      
      return (data || []).map(a => ({
        ...a,
        course: Array.isArray(a.course) ? a.course[0] : a.course
      })) as Assessment[];
    },
    enabled: !!enrollment?.cohort_id,
  });
}

export function useMySubmissions() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['submissions', user?.id],
    queryFn: async (): Promise<AssessmentSubmission[]> => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('assessment_submissions')
        .select(`
          id,
          assessment_id,
          attempt_number,
          status,
          submitted_at,
          score,
          feedback,
          assessment:assessments (
            id,
            title,
            description,
            type,
            max_score,
            passing_score,
            weight,
            time_limit_minutes,
            attempt_limit,
            opens_at,
            closes_at,
            course:courses (
              id,
              code,
              name
            )
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return (data || []).map(s => ({
        ...s,
        assessment: {
          ...(Array.isArray(s.assessment) ? s.assessment[0] : s.assessment),
          course: Array.isArray((s.assessment as any)?.course) 
            ? (s.assessment as any).course[0] 
            : (s.assessment as any)?.course
        }
      })) as AssessmentSubmission[];
    },
    enabled: !!user?.id,
  });
}

export function usePendingTasks() {
  const { data: assessments, isLoading: loadingAssessments } = useAssessments();
  const { data: submissions, isLoading: loadingSubmissions } = useMySubmissions();

  const isLoading = loadingAssessments || loadingSubmissions;

  const pendingTasks: PendingTask[] = [];

  if (assessments && submissions) {
    const submittedIds = new Set(submissions.map(s => s.assessment_id));
    const now = new Date();

    assessments.forEach(assessment => {
      // Skip if already submitted
      if (submittedIds.has(assessment.id)) return;
      
      // Skip if not yet open
      if (assessment.opens_at && new Date(assessment.opens_at) > now) return;

      const isOverdue = assessment.closes_at && new Date(assessment.closes_at) < now;

      pendingTasks.push({
        id: assessment.id,
        title: assessment.title,
        type: assessment.type,
        courseCode: assessment.course.code,
        courseName: assessment.course.name,
        dueDate: assessment.closes_at,
        status: isOverdue ? 'overdue' : 'pending',
      });
    });
  }

  // Sort by due date (overdue first, then by closest deadline)
  pendingTasks.sort((a, b) => {
    if (a.status === 'overdue' && b.status !== 'overdue') return -1;
    if (b.status === 'overdue' && a.status !== 'overdue') return 1;
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return 0;
  });

  return { data: pendingTasks, isLoading };
}
