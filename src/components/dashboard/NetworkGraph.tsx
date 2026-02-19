import { useEffect, useRef } from "react";
import { Network, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Node {
  id: string;
  x: number;
  y: number;
  suspicious: boolean;
  label: string;
}

interface Edge {
  from: string;
  to: string;
}

const MOCK_NODES: Node[] = [
  { id: "A001", x: 300, y: 200, suspicious: false, label: "A001" },
  { id: "A002", x: 450, y: 120, suspicious: true, label: "A002" },
  { id: "A003", x: 500, y: 280, suspicious: true, label: "A003" },
  { id: "A004", x: 200, y: 320, suspicious: false, label: "A004" },
  { id: "A005", x: 380, y: 380, suspicious: true, label: "A005" },
  { id: "A006", x: 150, y: 150, suspicious: false, label: "A006" },
  { id: "A007", x: 600, y: 180, suspicious: false, label: "A007" },
  { id: "A008", x: 550, y: 350, suspicious: true, label: "A008" },
  { id: "A009", x: 100, y: 250, suspicious: false, label: "A009" },
  { id: "A010", x: 680, y: 280, suspicious: false, label: "A010" },
  { id: "A011", x: 350, y: 80, suspicious: false, label: "A011" },
  { id: "A012", x: 250, y: 420, suspicious: true, label: "A012" },
];

const MOCK_EDGES: Edge[] = [
  { from: "A001", to: "A002" },
  { from: "A002", to: "A003" },
  { from: "A003", to: "A005" },
  { from: "A005", to: "A002" },
  { from: "A001", to: "A004" },
  { from: "A004", to: "A009" },
  { from: "A006", to: "A001" },
  { from: "A002", to: "A007" },
  { from: "A007", to: "A010" },
  { from: "A003", to: "A008" },
  { from: "A008", to: "A005" },
  { from: "A011", to: "A002" },
  { from: "A004", to: "A012" },
  { from: "A012", to: "A005" },
];

const NetworkGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const scaleX = w / 800;
    const scaleY = h / 500;

    const getPos = (node: Node) => ({
      x: node.x * scaleX,
      y: node.y * scaleY,
    });

    const nodeMap = new Map(MOCK_NODES.map((n) => [n.id, n]));

    // Draw edges
    ctx.lineWidth = 1;
    MOCK_EDGES.forEach((edge) => {
      const from = nodeMap.get(edge.from);
      const to = nodeMap.get(edge.to);
      if (!from || !to) return;
      const p1 = getPos(from);
      const p2 = getPos(to);

      const isSuspicious = from.suspicious || to.suspicious;
      ctx.strokeStyle = isSuspicious
        ? "hsla(0, 72%, 55%, 0.4)"
        : "hsla(215, 60%, 56%, 0.2)";
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    });

    // Draw nodes
    MOCK_NODES.forEach((node) => {
      const pos = getPos(node);
      const r = node.suspicious ? 10 : 7;

      // Glow
      if (node.suspicious) {
        const gradient = ctx.createRadialGradient(pos.x, pos.y, r, pos.x, pos.y, r * 3);
        gradient.addColorStop(0, "hsla(0, 72%, 55%, 0.3)");
        gradient.addColorStop(1, "hsla(0, 72%, 55%, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Node circle
      ctx.fillStyle = node.suspicious
        ? "hsl(0, 72%, 55%)"
        : "hsl(215, 90%, 56%)";
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
      ctx.fill();

      // Label
      ctx.fillStyle = "hsl(210, 20%, 75%)";
      ctx.font = `${10 * Math.min(scaleX, 1)}px 'JetBrains Mono', monospace`;
      ctx.textAlign = "center";
      ctx.fillText(node.label, pos.x, pos.y + r + 14);
    });
  }, []);

  return (
    <section className="container mx-auto max-w-6xl px-6">
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <div className="flex items-center gap-2">
            <Network className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Transaction Network Graph</h3>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1.5 mr-4 text-xs text-muted-foreground">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary" /> Normal
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-alert ml-2" /> Suspicious
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="relative bg-background/50 p-2" style={{ minHeight: 400 }}>
          <canvas
            ref={canvasRef}
            className="w-full rounded"
            style={{ height: 400 }}
          />
        </div>
      </div>
    </section>
  );
};

export default NetworkGraph;
