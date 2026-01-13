import { useState } from "react";
import { HelpCircle, Send, MessageCircle, BookOpen, Settings, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

const helpTypes = [
  { value: "technical", label: "مشكلة تقنية", icon: Settings },
  { value: "academic", label: "استفسار أكاديمي", icon: BookOpen },
  { value: "administrative", label: "طلب إداري", icon: MessageCircle },
];

const faqs = [
  {
    question: "كيف أستعيد كلمة المرور؟",
    answer: "يمكنك استعادة كلمة المرور من خلال الضغط على رابط 'نسيت كلمة المرور' في صفحة تسجيل الدخول، وستصلك رسالة على بريدك الإلكتروني لإعادة تعيينها."
  },
  {
    question: "كيف أرفع الواجبات والمهام؟",
    answer: "اذهب إلى صفحة 'المهام'، ثم اختر المهمة المطلوبة، واضغط على زر 'رفع الملف' لإرفاق عملك."
  },
  {
    question: "متى تُحدَّث الدرجات؟",
    answer: "يتم تحديث الدرجات بعد تصحيح المدرب للمهام والاختبارات. ستصلك إشعار فور نشر الدرجة."
  },
  {
    question: "كيف أتواصل مع المدرب؟",
    answer: "يمكنك التواصل مع المدرب من خلال صفحة 'طلب مساعدة' باختيار 'استفسار أكاديمي' وكتابة رسالتك."
  },
  {
    question: "ماذا أفعل إذا تغيّب عن حصة؟",
    answer: "في حال الغياب، تواصل مع المدرب أو الإدارة لتقديم عذر رسمي خلال 48 ساعة من تاريخ الغياب."
  },
];

export default function Help() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    subject: "",
    details: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type || !formData.subject || !formData.details) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "تم إرسال طلبك",
      description: "سيتم الرد عليك خلال 24-48 ساعة عمل",
    });
    
    setFormData({ type: "", subject: "", details: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">طلب مساعدة</h1>
        <p className="text-muted-foreground">أرسل استفسارك وسنرد عليك في أقرب وقت</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Help Request Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              نموذج طلب المساعدة
            </CardTitle>
            <CardDescription>
              اختر نوع المساعدة واكتب تفاصيل طلبك
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">نوع المساعدة *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="اختر نوع المساعدة" />
                  </SelectTrigger>
                  <SelectContent>
                    {helpTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <type.icon className="w-4 h-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">موضوع الطلب *</Label>
                <Input
                  id="subject"
                  placeholder="اكتب موضوع طلبك باختصار"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="details">تفاصيل الطلب *</Label>
                <Textarea
                  id="details"
                  placeholder="اشرح مشكلتك أو استفسارك بالتفصيل..."
                  className="min-h-[120px]"
                  value={formData.details}
                  onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                    جارٍ الإرسال...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 ml-2" />
                    إرسال الطلب
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              الأسئلة الشائعة
            </CardTitle>
            <CardDescription>
              إجابات سريعة على الأسئلة الأكثر شيوعًا
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-right">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
