import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Mail, Lock, User, Phone, MapPin, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SUDAN_STATES, EDUCATION_LEVELS, APP_NAME } from "@/lib/constants";

export default function Auth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Signup form state
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    nationalId: "",
    state: "",
    city: "",
    educationLevel: "",
    referralSource: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: error.message === "Invalid login credentials" 
            ? "البريد الإلكتروني أو كلمة المرور غير صحيحة"
            : error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحباً بك في منصة التدريب",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ غير متوقع",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: signupData.fullName,
            phone: signupData.phone,
            national_id: signupData.nationalId,
            state: signupData.state,
            city: signupData.city,
            education_level: signupData.educationLevel,
            referral_source: signupData.referralSource,
          },
        },
      });

      if (error) {
        let errorMessage = error.message;
        if (error.message.includes("already registered")) {
          errorMessage = "هذا البريد الإلكتروني مسجل مسبقاً";
        }
        toast({
          title: "خطأ في إنشاء الحساب",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "تم إنشاء الحساب بنجاح",
          description: "يمكنك الآن تسجيل الدخول",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ غير متوقع",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-subtle">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-primary">
            <Sun className="w-9 h-9 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">{APP_NAME}</h1>
          <p className="text-muted-foreground mt-1">الدُفعة التجريبية 01</p>
        </div>

        <Card className="shadow-soft">
          <Tabs defaultValue="login" className="w-full">
            <CardHeader className="pb-2">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
                <TabsTrigger value="signup">حساب جديد</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              {/* Login Tab */}
              <TabsContent value="login" className="mt-0">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">البريد الإلكتروني</Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="example@email.com"
                        className="pr-10"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">كلمة المرور</Label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pr-10 pl-10"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                        dir="ltr"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? "جاري التحميل..." : "تسجيل الدخول"}
                  </Button>
                </form>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup" className="mt-0">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">الاسم الكامل</Label>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="الاسم الثلاثي"
                        className="pr-10"
                        value={signupData.fullName}
                        onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">البريد الإلكتروني</Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="example@email.com"
                        className="pr-10"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        required
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">كلمة المرور</Label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="6 أحرف على الأقل"
                        className="pr-10 pl-10"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        required
                        minLength={6}
                        dir="ltr"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="signup-phone">رقم الهاتف</Label>
                      <div className="relative">
                        <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="signup-phone"
                          type="tel"
                          placeholder="09XXXXXXXX"
                          className="pr-10"
                          value={signupData.phone}
                          onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-national-id">رقم الهوية</Label>
                      <Input
                        id="signup-national-id"
                        type="text"
                        placeholder="رقم الهوية الوطنية"
                        value={signupData.nationalId}
                        onChange={(e) => setSignupData({ ...signupData, nationalId: e.target.value })}
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>الولاية</Label>
                      <Select
                        value={signupData.state}
                        onValueChange={(value) => setSignupData({ ...signupData, state: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الولاية" />
                        </SelectTrigger>
                        <SelectContent>
                          {SUDAN_STATES.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-city">المدينة</Label>
                      <div className="relative">
                        <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="signup-city"
                          type="text"
                          placeholder="المدينة"
                          className="pr-10"
                          value={signupData.city}
                          onChange={(e) => setSignupData({ ...signupData, city: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>المستوى التعليمي</Label>
                    <Select
                      value={signupData.educationLevel}
                      onValueChange={(value) => setSignupData({ ...signupData, educationLevel: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المستوى التعليمي" />
                      </SelectTrigger>
                      <SelectContent>
                        {EDUCATION_LEVELS.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? "جاري التحميل..." : "إنشاء حساب"}
                  </Button>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          بتسجيل الدخول أو إنشاء حساب، فإنك توافق على شروط الاستخدام وسياسة الخصوصية
        </p>
      </div>
    </div>
  );
}
