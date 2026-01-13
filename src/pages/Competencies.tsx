import { Award, CheckCircle2, Clock, AlertCircle, FileImage, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useMyCompetencyProgress } from "@/hooks/useCompetencies";
import { useEnrollment } from "@/hooks/useEnrollment";

const statusConfig = {
  not_started: { label: 'لم يبدأ', color: 'bg-muted text-muted-foreground' },
  in_progress: { label: 'قيد التنفيذ', color: 'bg-warning/10 text-warning' },
  evidence_submitted: { label: 'تم رفع الدليل', color: 'bg-info/10 text-info' },
  achieved: { label: 'تم التحقق', color: 'bg-success/10 text-success' },
  not_achieved: { label: 'لم يتحقق', color: 'bg-destructive/10 text-destructive' },
};

export default function Competencies() {
  const { data: enrollment, isLoading: enrollmentLoading } = useEnrollment();
  const { data: competencies, summary, isLoading: competencyLoading } = useMyCompetencyProgress();

  const isLoading = enrollmentLoading || competencyLoading;

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (!enrollment) {
    return (
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground">الكفايات</h1>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>لا يوجد تسجيل نشط</AlertTitle>
          <AlertDescription>
            لم يتم تسجيلك في أي دفعة تدريبية حتى الآن.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const progressPercentage = summary.total > 0 
    ? Math.round((summary.achieved / summary.total) * 100) 
    : 0;

  // Group competencies by module
  const competenciesByModule = competencies.reduce((acc, comp) => {
    const moduleId = comp.module.id;
    if (!acc[moduleId]) {
      acc[moduleId] = {
        module: comp.module,
        competencies: [],
      };
    }
    acc[moduleId].competencies.push(comp);
    return acc;
  }, {} as Record<string, { module: typeof competencies[0]['module'], competencies: typeof competencies }>);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">الكفايات</h1>
        <p className="text-muted-foreground">{enrollment.cohort.name}</p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-2">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-foreground">{summary.achieved}</span>
                  <span className="text-muted-foreground">من {summary.total} كفاية</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <p className="text-sm text-muted-foreground mt-1">
                  {progressPercentage}% مكتمل
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{summary.achieved}</div>
                <p className="text-xs text-muted-foreground">محققة</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{summary.inProgress}</div>
                <p className="text-xs text-muted-foreground">قيد التنفيذ</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Competencies by module */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            قائمة الكفايات
          </CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(competenciesByModule).length > 0 ? (
            <Accordion type="multiple" className="space-y-2">
              {Object.entries(competenciesByModule).map(([moduleId, { module, competencies: moduleCompetencies }]) => {
                const achievedCount = moduleCompetencies.filter(c => c.status === 'achieved').length;
                
                return (
                  <AccordionItem key={moduleId} value={moduleId} className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center justify-between w-full ml-4">
                        <div className="text-right">
                          <p className="font-semibold text-foreground">{module.name}</p>
                          <p className="text-sm text-muted-foreground">{module.code}</p>
                        </div>
                        <Badge variant="outline" className={cn(
                          achievedCount === moduleCompetencies.length 
                            ? 'bg-success/10 text-success' 
                            : 'bg-muted text-muted-foreground'
                        )}>
                          {achievedCount}/{moduleCompetencies.length}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-2">
                        {moduleCompetencies.map((comp) => {
                          const status = statusConfig[comp.status];

                          return (
                            <div
                              key={comp.id}
                              className="flex items-start justify-between gap-4 p-3 rounded-lg border bg-card"
                            >
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-xs text-muted-foreground">{comp.code}</span>
                                  <Badge variant="outline" className={status.color}>
                                    {status.label}
                                  </Badge>
                                </div>
                                <h4 className="font-medium text-foreground">{comp.title}</h4>
                                {comp.description && (
                                  <p className="text-sm text-muted-foreground">{comp.description}</p>
                                )}
                                {comp.evidence_required && (
                                  <p className="text-xs text-muted-foreground">
                                    <span className="font-medium">الدليل المطلوب:</span> {comp.evidence_required}
                                  </p>
                                )}
                              </div>
                              {comp.status === 'not_started' && (
                                <Button size="sm" variant="outline">
                                  <Upload className="w-4 h-4 ml-1" />
                                  رفع دليل
                                </Button>
                              )}
                              {comp.evidence && (
                                <Button size="sm" variant="ghost">
                                  <FileImage className="w-4 h-4 ml-1" />
                                  عرض الدليل
                                </Button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              لم يتم تحديد كفايات لهذه الدفعة بعد
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
