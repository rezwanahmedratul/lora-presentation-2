import type { CSSProperties, ReactNode } from "react";

export function SlideLayout({ children, number, total = 7, label }: { children: ReactNode; number: number; total?: number; label: string }) {
  return (
    <div className="slide-content">
      <div className="absolute inset-x-[120px] top-[64px] flex items-center justify-between text-subtle reveal-fade">
        <span className="slide-chrome font-medium tracking-wide">LoRa · Long Range Communication</span>
        <span className="slide-chrome">{label}</span>
      </div>
      <div className="absolute inset-x-[120px] top-[150px] bottom-[130px]">{children}</div>
      <div className="absolute inset-x-[120px] bottom-[60px] flex items-center justify-between text-subtle reveal-fade">
        <div className="h-[3px] w-[240px] overflow-hidden rounded-full bg-border">
          <div className="h-full rounded-full bg-primary" style={{ width: `${(number / total) * 100}%` }} />
        </div>
        <span className="slide-chrome font-mono">{String(number).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
      </div>
    </div>
  );
}

export const d = (n: number) => ({ "--d": n }) as CSSProperties;

export function Question({ children, delay = 6 }: { children: ReactNode; delay?: number }) {
  return (
    <div className="reveal flex items-start gap-6 rounded-[28px] bg-accent px-10 py-8" style={d(delay)}>
      <span className="slide-kicker mt-2 text-accent-foreground">Think</span>
      <p className="slide-body-lg font-semibold text-accent-foreground">{children}</p>
    </div>
  );
}
