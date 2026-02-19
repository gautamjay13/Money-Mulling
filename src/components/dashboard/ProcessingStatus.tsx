import { Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

type Status = "idle" | "processing" | "success" | "error";

interface ProcessingStatusProps {
  status: Status;
  errorMessage?: string;
}

const ProcessingStatus = ({ status, errorMessage }: ProcessingStatusProps) => {
  if (status === "idle") return null;

  return (
    <section className="container mx-auto max-w-6xl px-6">
      <div className="rounded-lg border border-border bg-card p-6">
        {status === "processing" && (
          <div className="flex items-center gap-3">
            <Loader2 className="h-6 w-6 text-primary animate-spin-slow" />
            <div>
              <p className="text-sm font-medium text-foreground">Analyzing transaction network...</p>
              <p className="text-xs text-muted-foreground font-mono">Building graph • Detecting patterns • Scoring nodes</p>
            </div>
          </div>
        )}
        {status === "success" && (
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-success/10 p-1.5">
              <CheckCircle2 className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Analysis Complete</p>
              <p className="text-xs text-muted-foreground">Transaction graph processed successfully. Results displayed below.</p>
            </div>
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-alert/10 p-1.5">
              <AlertTriangle className="h-5 w-5 text-alert" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Processing Error</p>
              <p className="text-xs text-muted-foreground">{errorMessage || "An error occurred during analysis."}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProcessingStatus;
