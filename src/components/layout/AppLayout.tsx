import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";

interface AppLayoutProps {
  userName?: string;
  userRole?: string;
}

export function AppLayout({ userName = "أحمد محمد", userRole = "student" }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <AppSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          userRole={userRole}
        />
        
        {/* Main content area */}
        <div className="flex-1 flex flex-col min-h-screen lg:mr-0">
          <AppHeader 
            onMenuClick={() => setSidebarOpen(true)}
            userName={userName}
            userRole={userRole}
          />
          
          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
