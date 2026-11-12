import type { CSSProperties, ReactNode } from "react";

export function SlideLayout({ children, number, total = 7, label }: { children: ReactNode; number: number; total?: number; label: string }) {
  return (
    <div className="slide-content bg-white text-[#1a1a2e]">
      {/* Top bar */}
      <div className="absolute inset-x-[120px] top-[56px] flex items-center justify-between reveal-fade">
        <span className="slide-label">LoRa · Long Range Communication</span>
        <span className="text-[13px] font-medium text-gray-400">{label}</span>
      </div>

      {/* Content area */}
      <div className="absolute inset-x-[120px] top-[140px] bottom-[120px]">{children}</div>

      {/* Bottom bar */}
      <div className="absolute inset-x-[120px] bottom-[52px] flex items-center justify-between reveal-fade">
        <div className="flex items-center gap-4">
          <div className="h-[3px] w-[200px] overflow-hidden rounded-full bg-gray-200">
            <div className="h-full rounded-full bg-[#2563eb] transition-all duration-500" style={{ width: `${(number / total) * 100}%` }} />
          </div>
        </div>
        <span className="font-mono text-[13px] text-gray-400">{String(number).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
      </div>
    </div>
  );
}

export const d = (n: number) => ({ "--d": n }) as CSSProperties;

export function Question({ children, delay = 6 }: { children: ReactNode; delay?: number }) {
  return (
    <div className="reveal flex items-start gap-5 rounded-2xl border border-blue-100 bg-blue-50/60 px-8 py-6" style={d(delay)}>
      <span className="mt-0.5 text-[13px] font-semibold uppercase tracking-wider text-blue-600">Think</span>
      <p className="slide-body font-medium text-gray-800">{children}</p>
    </div>
  );
}
