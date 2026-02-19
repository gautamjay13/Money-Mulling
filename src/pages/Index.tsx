import { useState } from "react";
import Header from "@/components/dashboard/Header";
import CsvUpload from "@/components/dashboard/CsvUpload";
import ProcessingStatus from "@/components/dashboard/ProcessingStatus";
import SummaryCards from "@/components/dashboard/SummaryCards";
import NetworkGraph from "@/components/dashboard/NetworkGraph";
import SuspiciousTable from "@/components/dashboard/SuspiciousTable";
import FraudRingsTable from "@/components/dashboard/FraudRingsTable";
import DownloadButton from "@/components/dashboard/DownloadButton";
import Footer from "@/components/dashboard/Footer";

type Status = "idle" | "processing" | "success" | "error";

const Index = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [showResults, setShowResults] = useState(true);

  const handleUpload = (_file: File) => {
    setStatus("processing");
    setShowResults(false);
    setTimeout(() => {
      setStatus("success");
      setShowResults(true);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col gap-6 py-8">
        <CsvUpload onUpload={handleUpload} />
        <ProcessingStatus status={status} />

        {showResults && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <SummaryCards />
            <NetworkGraph />
            <SuspiciousTable />
            <FraudRingsTable />
            <DownloadButton />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
