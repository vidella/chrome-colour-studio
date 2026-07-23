import type { ReactNode } from "react";

interface RetroWindowProps {
  children: ReactNode;
  title?: string;
  accent?: string;
  statusLeft?: string;
  statusRight?: string;
  onFile?: () => void;
  onBack?: () => void;
}

export function RetroWindow({
  children,
  title = "chromé.exe — colour studio",
  accent = "#c8ed69",
  statusLeft = "READY",
  statusRight = "CHROMÉ COLOUR SYSTEM",
  onFile,
  onBack,
}: RetroWindowProps) {
  return (
    <div className="retro-app">
      <section className="retro-window" style={{ "--window-accent": accent } as React.CSSProperties}>
        <header className="retro-titlebar">
          <span>{title}</span>
          <div className="retro-window-controls" aria-hidden="true">
            <span>_</span><span>□</span><span>×</span>
          </div>
        </header>
        <nav className="retro-menubar" aria-label="Application menu">
          <button onClick={onFile} disabled={!onFile}>File</button>
          <button onClick={onBack} disabled={!onBack}>Edit</button>
        </nav>
        {children}
        <footer className="retro-statusbar">
          <span>{statusLeft}</span>
          <span>{statusRight}</span>
        </footer>
      </section>
    </div>
  );
}
