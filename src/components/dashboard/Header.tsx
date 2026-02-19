import { Shield, Activity } from "lucide-react";

const Header = () => {
  return (
    <header className="relative overflow-hidden border-b border-border bg-card/50 px-6 py-8 md:py-12">
      {/* Background grid effect */}
      <div className="absolute inset-0 scan-line opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative container mx-auto max-w-6xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <Shield className="h-10 w-10 text-primary" />
            <div className="absolute inset-0 animate-pulse-glow">
              <Shield className="h-10 w-10 text-primary blur-sm" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-cyber-green animate-pulse" />
            <span className="text-xs font-mono text-cyber-green uppercase tracking-widest">System Active</span>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-2">
          Money Muling Detection System
        </h1>
        <h2 className="text-lg md:text-xl text-primary font-medium mb-3">
          Graph-Based Financial Fraud Detection Engine
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Advanced network analysis and pattern recognition to identify suspicious financial transactions, 
          money mule rings, and fraudulent fund flows in real-time.
        </p>
      </div>
    </header>
  );
};

export default Header;
