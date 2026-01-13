import { useAuth } from '@/hooks/useAuth';
import { USER_ROLE_LABELS } from '@/lib/constants';

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallback?: React.ReactNode;
}

export function RoleGate({ children, allowedRoles, fallback = null }: RoleGateProps) {
  const { hasAnyRole, loading } = useAuth();

  if (loading) return null;

  if (!hasAnyRole(allowedRoles)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export function RoleBadge({ role }: { role: string }) {
  const label = USER_ROLE_LABELS[role] || role;
  
  const colorMap: Record<string, string> = {
    system_admin: 'bg-destructive/10 text-destructive',
    program_manager: 'bg-primary/10 text-primary',
    course_manager: 'bg-info/10 text-info',
    lead_instructor: 'bg-success/10 text-success',
    assistant_instructor: 'bg-success/10 text-success',
    examiner: 'bg-warning/10 text-warning',
    me_officer: 'bg-accent text-accent-foreground',
    admin_finance: 'bg-muted text-muted-foreground',
    student: 'bg-primary/10 text-primary',
    external_viewer: 'bg-muted text-muted-foreground',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorMap[role] || 'bg-muted text-muted-foreground'}`}>
      {label}
    </span>
  );
}
