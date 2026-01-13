import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface AttendanceRecord {
  id: string;
  status: 'present' | 'late' | 'excused' | 'absent';
  notes: string | null;
  marked_at: string;
  session: {
    id: string;
    session_date: string;
    session_time: string | null;
    course: {
      id: string;
      code: string;
      name: string;
    };
  };
}

export interface AttendanceSummary {
  totalSessions: number;
  attended: number;
  late: number;
  excused: number;
  absent: number;
  percentage: number;
}

export function useAttendanceRecords(courseId?: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['attendance', user?.id, courseId],
    queryFn: async (): Promise<AttendanceRecord[]> => {
      if (!user?.id) return [];

      let query = supabase
        .from('attendance_records')
        .select(`
          id,
          status,
          notes,
          marked_at,
          session:attendance_sessions (
            id,
            session_date,
            session_time,
            course:courses (
              id,
              code,
              name
            )
          )
        `)
        .eq('user_id', user.id)
        .order('marked_at', { ascending: false });

      if (courseId) {
        query = query.eq('attendance_sessions.course_id', courseId);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      // Transform nested data
      return (data || []).map(record => ({
        ...record,
        session: Array.isArray(record.session) ? record.session[0] : record.session
      })).filter(r => r.session) as AttendanceRecord[];
    },
    enabled: !!user?.id,
  });
}

export function useAttendanceSummary(courseId?: string) {
  const { data: records, isLoading } = useAttendanceRecords(courseId);

  const summary: AttendanceSummary = {
    totalSessions: records?.length || 0,
    attended: records?.filter(r => r.status === 'present').length || 0,
    late: records?.filter(r => r.status === 'late').length || 0,
    excused: records?.filter(r => r.status === 'excused').length || 0,
    absent: records?.filter(r => r.status === 'absent').length || 0,
    percentage: 0,
  };

  if (summary.totalSessions > 0) {
    summary.percentage = Math.round(
      ((summary.attended + summary.late) / summary.totalSessions) * 100
    );
  }

  return { data: summary, isLoading };
}
