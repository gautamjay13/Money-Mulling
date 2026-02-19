import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const DownloadButton = () => {
  const handleDownload = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      version: "1.0",
      summary: {
        totalAccounts: 1247,
        suspiciousAccounts: 38,
        fraudRings: 5,
        processingTime: 2.34,
      },
      suspiciousAccounts: [
        { id: "A002", score: 0.94, patterns: ["Rapid layering", "Circular flow"], ringId: "R-001" },
        { id: "A003", score: 0.89, patterns: ["Smurfing"], ringId: "R-001" },
        { id: "A005", score: 0.87, patterns: ["Circular flow", "High velocity"], ringId: "R-001" },
        { id: "A008", score: 0.82, patterns: ["Funnel account"], ringId: "R-002" },
        { id: "A012", score: 0.76, patterns: ["Rapid layering"], ringId: "R-002" },
      ],
      fraudRings: [
        { ringId: "R-001", pattern: "Circular Layering", memberCount: 3, riskScore: 0.92 },
        { ringId: "R-002", pattern: "Funnel & Disperse", memberCount: 2, riskScore: 0.79 },
      ],
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "investigation-report.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="container mx-auto max-w-6xl px-6">
      <Button onClick={handleDownload} size="lg" className="gap-2 glow-blue w-full sm:w-auto">
        <Download className="h-5 w-5" />
        Download Investigation Report (JSON)
      </Button>
    </section>
  );
};

export default DownloadButton;
