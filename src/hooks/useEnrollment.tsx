import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Enrollment {
  id: string;
  cohort_id: string;
  enrolled_at: string;
  status: string;
  cohort: {
    id: string;
    code: string;
    name: string;
    description: string | null;
    start_date: string | null;
    end_date: string | null;
    status: string;
    attendance_threshold: number;
    pass_threshold: number;
  };
}

export function useEnrollment() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['enrollment', user?.id],
    queryFn: async (): Promise<Enrollment | null> => {
      if (!user?.id) return null;

      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          id,
          cohort_id,
          enrolled_at,
          status,
          cohort:cohorts (
            id,
            code,
            name,
            description,
            start_date,
            end_date,
            status,
            attendance_threshold,
            pass_threshold
          )
        `)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .maybeSingle();

      if (error) throw error;
      
      // Transform the data to match our interface
      if (data && data.cohort) {
        return {
          ...data,
          cohort: Array.isArray(data.cohort) ? data.cohort[0] : data.cohort
        } as Enrollment;
      }
      
      return null;
    },
    enabled: !!user?.id,
  });
}
