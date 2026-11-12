import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize } from "lucide-react";
import { slides } from "@/slides";

export function Deck({ initial, onChange }: { initial: number; onChange: (i: number) => void }) {
  const [index, setIndex] = useState(initial);
  const [scale, setScale] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback((n: number) => {
    setIndex((cur) => {
      const next = Math.max(0, Math.min(slides.length - 1, n));
      if (next !== cur) onChange(next);
      return next;
    });
  }, [onChange]);

  useEffect(() => {
    const fit = () => {
      const el = ref.current;
      if (!el) return;
      setScale(Math.min(el.clientWidth / 1920, el.clientHeight / 1080));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", " ", "PageDown"].includes(e.key)) { e.preventDefault(); go(index + 1); }
      if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); go(index - 1); }
      if (e.key === "f" || e.key === "F5") { e.preventDefault(); document.documentElement.requestFullscreen?.(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  useEffect(() => {
    document.title = `${index + 1}/${slides.length} — ${slides[index]?.title ?? ""} · LoRa`;
  }, [index]);

  const current = slides[index]!;
  const { Component } = current;

  return (
    <div
      ref={ref}
      className="group relative h-screen w-screen overflow-hidden bg-background"
      onTouchStart={(e) => (touchX.current = e.touches[0]!.clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0]!.clientX - touchX.current;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <div
        className="absolute left-1/2 top-1/2"
        style={{ width: 1920, height: 1080, marginLeft: -960, marginTop: -540, transform: `scale(${scale})` }}
      >
        <div key={index} className="slide-enter">
          <Component />
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border bg-card/90 p-1 opacity-0 shadow-sm backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
        <button aria-label="Previous slide" onClick={() => go(index - 1)} className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"><ChevronLeft size={18} /></button>
        <span className="px-2 font-mono text-xs text-muted-foreground">{index + 1} / {slides.length}</span>
        <button aria-label="Next slide" onClick={() => go(index + 1)} className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"><ChevronRight size={18} /></button>
        <button aria-label="Fullscreen" onClick={() => document.documentElement.requestFullscreen?.()} className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"><Maximize size={16} /></button>
      </div>
    </div>
  );
}
