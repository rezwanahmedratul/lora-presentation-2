import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  Moon,
  Sun,
  Layers,
  Sparkles,
} from "lucide-react";
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showDrawer, setShowDrawer] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  // Sync theme with document class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const go = useCallback(
    (n: number) => {
      setIndex((cur) => {
        const next = Math.max(0, Math.min(slides.length - 1, n));
        if (next !== cur) onChange(next);
        return next;
      });
    },
    [onChange]
  );

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
      // Don't trigger if user is in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

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
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen?.();
          setIsFullscreen(true);
        } else {
          document.exitFullscreen?.();
          setIsFullscreen(false);
        }
      }
      if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        toggleTheme();
      }
      if (e.key >= "1" && e.key <= String(slides.length)) {
        e.preventDefault();
        go(Number(e.key) - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go, toggleTheme]);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  useEffect(() => {
    document.title = `${index + 1}/${slides.length} — ${
      slides[index]?.title ?? ""
    } · LoRa Masterclass`;
  }, [index]);

  const current = slides[index]!;
  const { Component } = current;

  return (
    <div
      ref={ref}
      className="group relative h-screen w-screen overflow-hidden bg-background text-foreground transition-colors duration-300"
      onTouchStart={(e) => (touchX.current = e.touches[0]!.clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0]!.clientX - touchX.current;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      {/* 1920x1080 Scaled Stage */}
      <div
        className="absolute left-1/2 top-1/2 origin-center"
        style={{
          width: 1920,
          height: 1080,
          marginLeft: -960,
          marginTop: -540,
          transform: `scale(${scale})`,
        }}
      >
        <div key={index} className="slide-enter h-full w-full">
          <Component />
        </div>
      </div>

      {/* Slide Navigation Drawer / Quick Jump Pill */}
      {showDrawer && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 rounded-2xl bg-card/95 border border-border/80 backdrop-blur-xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => {
                go(i);
                setShowDrawer(false);
              }}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                i === index
                  ? "bg-primary text-primary-foreground font-semibold shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <span className="font-mono text-xs opacity-75">{i + 1}</span>
              <span>{s.title}</span>
            </button>
          ))}
        </div>
      )}

      {/* Floating Bottom Control Bar */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-border/80 bg-card/85 px-3 py-1.5 shadow-xl backdrop-blur-xl transition-all duration-300 group-hover:opacity-100 opacity-40 hover:opacity-100 z-40">
        <button
          aria-label="Previous slide"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          title="Previous slide (←)"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={() => setShowDrawer((v) => !v)}
          className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-foreground hover:bg-secondary transition-colors"
          title="Jump to slide (click to view all)"
        >
          <Layers size={14} className="text-primary" />
          <span>
            {index + 1} / {slides.length}
          </span>
        </button>

        <button
          aria-label="Next slide"
          onClick={() => go(index + 1)}
          disabled={index === slides.length - 1}
          className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          title="Next slide (→ / Space)"
        >
          <ChevronRight size={18} />
        </button>

        <div className="mx-1 h-4 w-px bg-border/80" />

        <button
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          title="Toggle Dark/Light Mode (T)"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <button
          aria-label="Toggle fullscreen"
          onClick={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen?.();
              setIsFullscreen(true);
            } else {
              document.exitFullscreen?.();
              setIsFullscreen(false);
            }
          }}
          className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          title="Fullscreen (F)"
        >
          {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
        </button>
      </div>
    </div>
  );
}
