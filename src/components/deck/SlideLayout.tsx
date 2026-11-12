import type { CSSProperties, ReactNode } from "react";
import { Radio, Lightbulb } from "lucide-react";

export function SlideLayout({
  children,
  number,
  total = 7,
  label,
}: {
  children: ReactNode;
  number: number;
  total?: number;
  label: string;
}) {
  return (
    <div className="slide-content select-none bg-background text-foreground bg-ambient-light">
      {/* Background ambient grid pattern */}
      <div className="absolute inset-0 bg-tech-dots pointer-events-none opacity-60" />

      {/* Subtle edge glow frame */}
      <div className="absolute inset-6 rounded-[36px] border border-border/40 pointer-events-none" />

      {/* Top chrome bar */}
      <header className="absolute inset-x-[100px] top-[48px] flex items-center justify-between text-subtle reveal-fade">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 rounded-full bg-secondary/80 px-4 py-1.5 border border-border/60 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
            </span>
            <span className="slide-chrome font-semibold tracking-tight text-foreground">LoRa</span>
            <span className="slide-chrome text-subtle font-mono text-[14px]">· 868/915 MHz</span>
          </div>
          <span className="slide-chrome text-subtle/80 font-medium tracking-wide">
            Long Range Low Power Wireless
          </span>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/50 border border-border/40">
            {Array.from({ length: total }).map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i + 1 === number
                    ? "w-6 bg-primary shadow-[0_0_10px_rgba(56,189,248,0.6)]"
                    : i + 1 < number
                    ? "w-2 bg-primary/40"
                    : "w-2 bg-border"
                }`}
              />
            ))}
          </div>
          <span className="slide-kicker text-primary font-semibold tracking-wider">
            {label}
          </span>
        </div>
      </header>

      {/* Main slide stage */}
      <main className="absolute inset-x-[100px] top-[125px] bottom-[115px]">
        {children}
      </main>

      {/* Bottom chrome bar */}
      <footer className="absolute inset-x-[100px] bottom-[46px] flex items-center justify-between text-subtle reveal-fade">
        <div className="flex items-center gap-6">
          <div className="h-[4px] w-[280px] overflow-hidden rounded-full bg-border/80">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-300 transition-all duration-500 shadow-[0_0_12px_rgba(56,189,248,0.5)]"
              style={{ width: `${(number / total) * 100}%` }}
            />
          </div>
          <span className="slide-chrome font-mono font-semibold text-foreground/90">
            {String(number).padStart(2, "0")} <span className="text-subtle font-normal">/ {String(total).padStart(2, "0")}</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-subtle font-mono text-[15px]">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-secondary/50 border border-border/30">
            <span>← / →</span>
            <span>Navigate</span>
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-secondary/50 border border-border/30">
            <span>F</span>
            <span>Fullscreen</span>
          </span>
        </div>
      </footer>
    </div>
  );
}

export const d = (n: number) => ({ "--d": n }) as CSSProperties;

export function Question({
  children,
  delay = 6,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <div
      className="reveal group flex items-start gap-6 rounded-[24px] border border-primary/25 bg-primary/[0.08] p-7 backdrop-blur-md shadow-[0_12px_30px_rgba(56,189,248,0.06)]"
      style={d(delay)}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
        <Lightbulb size={24} className="transition-transform group-hover:scale-110" />
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="slide-kicker text-primary">Think & Discuss</span>
        <p className="slide-body-lg font-semibold text-foreground leading-snug">{children}</p>
      </div>
    </div>
  );
}
