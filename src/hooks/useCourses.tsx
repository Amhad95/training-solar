import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEnrollment } from './useEnrollment';

export interface Course {
  id: string;
  code: string;
  name: string;
  description: string | null;
  sort_order: number;
  is_prerequisite: boolean;
  is_support_track: boolean;
  theory_weight: number;
  practical_weight: number;
  cohort_id: string;
}

export interface CourseWithProgress extends Course {
  lessonsCount: number;
  completedLessons: number;
  progress: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'locked';
}

export function useCourses() {
  const { data: enrollment } = useEnrollment();

  return useQuery({
    queryKey: ['courses', enrollment?.cohort_id],
    queryFn: async (): Promise<Course[]> => {
      if (!enrollment?.cohort_id) return [];

      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('cohort_id', enrollment.cohort_id)
        .order('sort_order');

      if (error) throw error;
      return data || [];
    },
    enabled: !!enrollment?.cohort_id,
  });
}

export function useCourseDetails(courseId: string) {
  return useQuery({
    queryKey: ['course', courseId],
    queryFn: async (): Promise<Course | null> => {
      if (!courseId) return null;

      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!courseId,
  });
}
