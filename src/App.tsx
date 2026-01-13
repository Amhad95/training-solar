import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Protected routes with layout */}
          <Route element={<AppLayout userName="أحمد محمد علي" userRole="student" />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<Dashboard />} />
            <Route path="/assignments" element={<Dashboard />} />
            <Route path="/grades" element={<Dashboard />} />
            <Route path="/attendance" element={<Dashboard />} />
            <Route path="/competencies" element={<Dashboard />} />
            <Route path="/resources" element={<Dashboard />} />
            <Route path="/help" element={<Dashboard />} />
          </Route>
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
