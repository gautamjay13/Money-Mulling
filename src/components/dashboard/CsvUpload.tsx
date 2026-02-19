import { Upload, FileText, Info } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

interface CsvUploadProps {
  onUpload: (file: File) => void;
}

const CsvUpload = ({ onUpload }: CsvUploadProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.name.endsWith(".csv")) {
      setFileName(file.name);
    }
  };

  const handleUpload = () => {
    const file = fileRef.current?.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <section className="container mx-auto max-w-6xl px-6">
      <div className="rounded-lg border border-border bg-card p-6 gradient-border">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Upload Transaction Data</h3>
        </div>

        <div
          className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-all duration-200 ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-muted-foreground/40"
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
          }}
        >
          <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground mb-2">
            Drag & drop your CSV file here, or click to browse
          </p>
          <input
            ref={fileRef}
            type="file"
            accept=".csv"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
          {fileName && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1.5 text-sm text-primary font-mono">
              <FileText className="h-4 w-4" />
              {fileName}
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <Info className="h-4 w-4 mt-0.5 shrink-0" />
            <span className="font-mono">
              Required fields: transaction_id, sender_id, receiver_id, amount, timestamp
            </span>
          </div>
          <Button
            onClick={handleUpload}
            disabled={!fileName}
            className="gap-2 glow-blue"
          >
            <Upload className="h-4 w-4" />
            Analyze Transactions
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CsvUpload;
