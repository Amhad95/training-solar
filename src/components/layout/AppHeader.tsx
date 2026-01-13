import { Menu, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { USER_ROLE_LABELS } from "@/lib/constants";

interface AppHeaderProps {
  onMenuClick: () => void;
  userName?: string;
  userRole?: string;
}

export function AppHeader({ onMenuClick, userName = "مستخدم", userRole = "student" }: AppHeaderProps) {
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const roleLabel = USER_ROLE_LABELS[userRole] || "متدرب";

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between h-full px-4">
        {/* Right side - Menu button (mobile) */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="hidden sm:block">
            <h2 className="text-lg font-semibold text-foreground">مرحباً، {userName}</h2>
            <p className="text-xs text-muted-foreground">{roleLabel}</p>
          </div>
        </div>

        {/* Left side - Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <Badge 
              className="absolute -top-1 -left-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]"
            >
              3
            </Badge>
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-sm font-medium">{userName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{userName}</span>
                  <span className="text-xs font-normal text-muted-foreground">{roleLabel}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="w-4 h-4 ml-2" />
                الملف الشخصي
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                تسجيل الخروج
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
