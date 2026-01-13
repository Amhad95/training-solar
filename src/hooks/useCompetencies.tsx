import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useEnrollment } from './useEnrollment';

export interface Competency {
  id: string;
  code: string;
  title: string;
  description: string | null;
  performance_criteria: string | null;
  evidence_required: string | null;
  module: {
    id: string;
    code: string;
    name: string;
    course: {
      id: string;
      code: string;
      name: string;
    };
  };
}

export interface CompetencyEvidence {
  id: string;
  competency_id: string;
  evidence_type: string;
  file_path: string | null;
  description: string | null;
  submitted_at: string;
  status: 'not_started' | 'in_progress' | 'evidence_submitted' | 'achieved' | 'not_achieved';
  signoffs: {
    id: string;
    status: string;
    feedback: string | null;
    signed_at: string;
  }[];
}

export interface CompetencyWithStatus extends Competency {
  evidence: CompetencyEvidence | null;
  status: 'not_started' | 'in_progress' | 'evidence_submitted' | 'achieved' | 'not_achieved';
}

export function useCompetencies() {
  const { data: enrollment } = useEnrollment();

  return useQuery({
    queryKey: ['competencies', enrollment?.cohort_id],
    queryFn: async (): Promise<Competency[]> => {
      if (!enrollment?.cohort_id) return [];

      const { data, error } = await supabase
        .from('competencies')
        .select(`
          id,
          code,
          title,
          description,
          performance_criteria,
          evidence_required,
          module:modules!inner (
            id,
            code,
            name,
            course:courses!inner (
              id,
              code,
              name,
              cohort_id
            )
          )
        `)
        .eq('modules.courses.cohort_id', enrollment.cohort_id)
        .order('sort_order');

      if (error) throw error;
      
      return (data || []).map(c => ({
        ...c,
        module: {
          ...(Array.isArray(c.module) ? c.module[0] : c.module),
          course: Array.isArray((c.module as any)?.course) 
            ? (c.module as any).course[0] 
            : (c.module as any)?.course
        }
      })) as Competency[];
    },
    enabled: !!enrollment?.cohort_id,
  });
}

export function useMyCompetencyProgress() {
  const { user } = useAuth();
  const { data: competencies, isLoading: loadingCompetencies } = useCompetencies();

  const { data: evidences, isLoading: loadingEvidences } = useQuery({
    queryKey: ['competency-evidence', user?.id],
    queryFn: async (): Promise<CompetencyEvidence[]> => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('competency_evidence')
        .select(`
          id,
          competency_id,
          evidence_type,
          file_path,
          description,
          submitted_at,
          status,
          signoffs:competency_signoffs (
            id,
            status,
            feedback,
            signed_at
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const isLoading = loadingCompetencies || loadingEvidences;

  const competenciesWithStatus: CompetencyWithStatus[] = (competencies || []).map(comp => {
    const evidence = evidences?.find(e => e.competency_id === comp.id) || null;
    return {
      ...comp,
      evidence,
      status: evidence?.status || 'not_started',
    };
  });

  const summary = {
    total: competenciesWithStatus.length,
    achieved: competenciesWithStatus.filter(c => c.status === 'achieved').length,
    inProgress: competenciesWithStatus.filter(c => 
      ['in_progress', 'evidence_submitted'].includes(c.status)
    ).length,
    notStarted: competenciesWithStatus.filter(c => c.status === 'not_started').length,
  };

  return {
    data: competenciesWithStatus,
    summary,
    isLoading,
  };
}
