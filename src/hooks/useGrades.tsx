import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Grade {
  id: string;
  score: number;
  max_score: number;
  weight: number;
  is_final: boolean;
  is_published: boolean;
  notes: string | null;
  course: {
    id: string;
    code: string;
    name: string;
  };
  assessment: {
    id: string;
    title: string;
    type: string;
  } | null;
}

export interface CourseGradeSummary {
  courseId: string;
  courseCode: string;
  courseName: string;
  grades: Grade[];
  totalScore: number;
  maxScore: number;
  percentage: number;
  isPassing: boolean;
}

export function useMyGrades() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['grades', user?.id],
    queryFn: async (): Promise<Grade[]> => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('grades')
        .select(`
          id,
          score,
          max_score,
          weight,
          is_final,
          is_published,
          notes,
          course:courses (
            id,
            code,
            name
          ),
          assessment:assessments (
            id,
            title,
            type
          )
        `)
        .eq('user_id', user.id)
        .eq('is_published', true);

      if (error) throw error;
      
      return (data || []).map(g => ({
        ...g,
        course: Array.isArray(g.course) ? g.course[0] : g.course,
        assessment: g.assessment ? (Array.isArray(g.assessment) ? g.assessment[0] : g.assessment) : null
      })) as Grade[];
    },
    enabled: !!user?.id,
  });
}

export function useGradesSummary() {
  const { data: grades, isLoading } = useMyGrades();

  const courseGrades: Map<string, CourseGradeSummary> = new Map();

  grades?.forEach(grade => {
    if (!grade.course) return;
    
    const courseId = grade.course.id;
    if (!courseGrades.has(courseId)) {
      courseGrades.set(courseId, {
        courseId,
        courseCode: grade.course.code,
        courseName: grade.course.name,
        grades: [],
        totalScore: 0,
        maxScore: 0,
        percentage: 0,
        isPassing: false,
      });
    }

    const summary = courseGrades.get(courseId)!;
    summary.grades.push(grade);
    summary.totalScore += grade.score;
    summary.maxScore += grade.max_score;
  });

  // Calculate percentages
  courseGrades.forEach(summary => {
    if (summary.maxScore > 0) {
      summary.percentage = Math.round((summary.totalScore / summary.maxScore) * 100);
      summary.isPassing = summary.percentage >= 60; // Default pass threshold
    }
  });

  const summaryArray = Array.from(courseGrades.values());
  
  // Calculate overall
  const totalScore = summaryArray.reduce((sum, c) => sum + c.totalScore, 0);
  const maxScore = summaryArray.reduce((sum, c) => sum + c.maxScore, 0);
  const overallPercentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  return {
    data: summaryArray,
    overall: {
      totalScore,
      maxScore,
      percentage: overallPercentage,
      isPassing: overallPercentage >= 60,
    },
    isLoading,
  };
}
