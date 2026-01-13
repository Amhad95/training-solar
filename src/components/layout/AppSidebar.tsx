import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  BookOpen, 
  ClipboardList, 
  GraduationCap,
  CalendarCheck,
  Award,
  FolderOpen,
  HelpCircle,
  Users,
  BarChart3,
  Shield,
  Settings,
  LogOut,
  Sun,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { APP_SHORT_NAME } from "@/lib/constants";
import { useAuth } from "@/hooks/useAuth";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: string;
}

const studentNav: NavItem[] = [
  { path: "/dashboard", label: "لوحة المتدرب", icon: <LayoutDashboard className="w-5 h-5" /> },
  { path: "/courses", label: "المقررات", icon: <BookOpen className="w-5 h-5" /> },
  { path: "/assignments", label: "المهام", icon: <ClipboardList className="w-5 h-5" /> },
  { path: "/grades", label: "الدرجات", icon: <GraduationCap className="w-5 h-5" /> },
  { path: "/attendance", label: "الحضور", icon: <CalendarCheck className="w-5 h-5" /> },
  { path: "/competencies", label: "الكفايات", icon: <Award className="w-5 h-5" /> },
  { path: "/resources", label: "المواد", icon: <FolderOpen className="w-5 h-5" /> },
  { path: "/help", label: "طلب مساعدة", icon: <HelpCircle className="w-5 h-5" /> },
];

const instructorNav: NavItem[] = [
  { path: "/dashboard", label: "لوحة التحكم", icon: <LayoutDashboard className="w-5 h-5" /> },
  { path: "/courses", label: "المقررات", icon: <BookOpen className="w-5 h-5" /> },
  { path: "/students", label: "المتدربون", icon: <Users className="w-5 h-5" /> },
  { path: "/attendance", label: "الحضور", icon: <CalendarCheck className="w-5 h-5" /> },
  { path: "/assessments", label: "التقييمات", icon: <ClipboardList className="w-5 h-5" /> },
  { path: "/gradebook", label: "سجل الدرجات", icon: <GraduationCap className="w-5 h-5" /> },
  { path: "/competencies", label: "الكفايات", icon: <Award className="w-5 h-5" /> },
];

const managerNav: NavItem[] = [
  { path: "/dashboard", label: "لوحة التحكم", icon: <LayoutDashboard className="w-5 h-5" /> },
  { path: "/cohorts", label: "الدفعات", icon: <Users className="w-5 h-5" /> },
  { path: "/courses", label: "المقررات", icon: <BookOpen className="w-5 h-5" /> },
  { path: "/certificates", label: "الشهادات", icon: <Award className="w-5 h-5" /> },
  { path: "/reports", label: "التقارير", icon: <BarChart3 className="w-5 h-5" /> },
  { path: "/audit", label: "سجل التدقيق", icon: <Shield className="w-5 h-5" /> },
  { path: "/settings", label: "الإعدادات", icon: <Settings className="w-5 h-5" /> },
];

export function AppSidebar({ isOpen, onClose, userRole = "student" }: AppSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };
  
  const getNavItems = () => {
    switch (userRole) {
      case "lead_instructor":
      case "assistant_instructor":
      case "examiner":
        return instructorNav;
      case "program_manager":
      case "course_manager":
      case "system_admin":
      case "me_officer":
        return managerNav;
      default:
        return studentNav;
    }
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-72 bg-sidebar border-l border-sidebar-border",
          "transform transition-transform duration-300 ease-in-out",
          "lg:translate-x-0 lg:static lg:z-auto",
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Sun className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-sidebar-foreground">{APP_SHORT_NAME}</h1>
                <p className="text-xs text-muted-foreground">الطاقة الشمسية</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-8 w-8"
              onClick={onClose}
            >
              <ChevronLeft className="w-5 h-5 rtl-flip" />
            </Button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 p-3">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={cn(
                      "nav-item",
                      isActive ? "nav-item-active" : "nav-item-inactive"
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="p-3 border-t border-sidebar-border">
            <Separator className="mb-3" />
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
              onClick={handleSignOut}
            >
              <LogOut className="w-5 h-5" />
              <span>تسجيل الخروج</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
