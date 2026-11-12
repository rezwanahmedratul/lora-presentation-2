import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize } from "lucide-react";
import { slides } from "@/slides";

export function Deck({
  initial,
  onChange,
}: {
  initial: number;
  onChange: (i: number) => void;
}) {
  const [index, setIndex] = useState(initial);
  const [scale, setScale] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (n: number) => {
      setIndex((cur) => {
        const next = Math.max(0, Math.min(slides.length - 1, n));
        if (next !== cur) onChange(next);
        return next;
      });
    },
    [onChange],
  );

  useEffect(() => {
    const fit = () => {
      const el = ref.current;
      if (!el) return;
      setScale(
        Math.min((el.clientWidth - 40) / 1920, (el.clientHeight - 112) / 1080),
      );
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", " ", "PageDown"].includes(e.key)) {
        e.preventDefault();
        go(index + 1);
      }
      if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        go(index - 1);
      }
      if (e.key === "f" || e.key === "F5") {
        e.preventDefault();
        document.documentElement.requestFullscreen?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  useEffect(() => {
    document.title = `${index + 1}/${slides.length} — ${slides[index]?.title ?? ""} · LoRa`;
  }, [index]);

  const { Component } = slides[index]!;

  return (
    <main
      ref={ref}
      aria-label="LoRa presentation"
      className="deck-shell group relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden"
      onTouchStart={(e) => (touchX.current = e.touches[0]!.clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0]!.clientX - touchX.current;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <div
        className="deck-stage absolute left-1/2 top-1/2 overflow-hidden"
        style={{
          width: 1920,
          height: 1080,
          marginLeft: -960,
          marginTop: -540,
          transform: `scale(${scale})`,
        }}
      >
        <div key={index} className="slide-enter">
          <Component />
        </div>
      </div>

      <nav
        aria-label="Presentation controls"
        className="deck-controls absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full px-2 py-1.5"
      >
        <button
          aria-label="Previous slide"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          className="deck-control-button rounded-full p-2 transition-colors disabled:opacity-30"
        >
          <ChevronLeft size={18} />
        </button>
        <span
          aria-live="polite"
          className="deck-counter min-w-[76px] px-2 text-center font-mono text-[11px] tracking-[0.12em]"
        >
          {String(index + 1).padStart(2, "0")}{" "}
          <span className="deck-counter-divider">/</span>{" "}
          {String(slides.length).padStart(2, "0")}
        </span>
        <button
          aria-label="Next slide"
          onClick={() => go(index + 1)}
          disabled={index === slides.length - 1}
          className="deck-control-button rounded-full p-2 transition-colors disabled:opacity-30"
        >
          <ChevronRight size={18} />
        </button>
        <span
          aria-hidden="true"
          className="deck-controls-divider mx-1 h-5 w-px"
        />
        <button
          aria-label="Fullscreen"
          onClick={() => document.documentElement.requestFullscreen?.()}
          className="deck-control-button rounded-full p-2 transition-colors"
        >
          <Maximize size={16} />
        </button>
      </nav>
    </main>
  );
}
