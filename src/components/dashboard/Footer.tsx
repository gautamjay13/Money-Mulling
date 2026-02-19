import { Github, Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/30 px-6 py-6 mt-4">
      <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Shield className="h-4 w-4" />
          <span>Money Muling Detection System</span>
          <span className="font-mono text-xs bg-secondary px-2 py-0.5 rounded">v1.0</span>
        </div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github className="h-4 w-4" />
          GitHub Repository
        </a>
      </div>
    </footer>
  );
};

export default Footer;
