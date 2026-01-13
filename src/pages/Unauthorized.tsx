import { Sun, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { APP_NAME } from "@/lib/constants";

export default function Unauthorized() {
  const navigate = useNavigate();
  const { user, roles } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-subtle">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-9 h-9 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">غير مصرح</h1>
          <p className="text-muted-foreground mt-1">ليس لديك صلاحية للوصول لهذه الصفحة</p>
        </div>

        <Card className="shadow-soft">
          <CardHeader className="text-center">
            <CardTitle>صلاحيات غير كافية</CardTitle>
            <CardDescription>
              حسابك لا يملك الصلاحيات اللازمة للوصول إلى هذه الصفحة.
              إذا كنت تعتقد أن هذا خطأ، يرجى التواصل مع مدير النظام.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {user && (
              <div className="text-center text-sm text-muted-foreground">
                <p>الحساب: {user.email}</p>
                {roles.length > 0 && (
                  <p>الأدوار: {roles.join(', ')}</p>
                )}
              </div>
            )}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => navigate(-1)}
              >
                العودة
              </Button>
              <Button 
                className="flex-1"
                onClick={() => navigate('/dashboard')}
              >
                الصفحة الرئيسية
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
