import { useEffect, useState } from "react";
import { SlideLayout, d } from "@/components/deck/SlideLayout";

const quiz = [
  ["Does LoRa prioritize range or data speed?", "Range"],
  ["Which interface connects SX1278 to Arduino?", "SPI"],
  ["Can LoRa transmit video efficiently?", "No"],
];
const recap = ["Long‑range, low‑power wireless communication.", "Ideal for IoT and embedded systems.", "Two modules exchange messages via radio waves."];

export default function Slide7Conclusion() {
  const [open, setOpen] = useState<number[]>([]);
  const [count, setCount] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setCount((c) => c + 1), 2500);
    return () => clearInterval(t);
  }, []);
  return (
    <SlideLayout number={7} label="Recap & Quiz">
      <div className="grid h-full grid-cols-[1fr_1fr] gap-20">
        <div className="flex flex-col justify-center gap-10">
          <p className="slide-kicker reveal text-primary" style={d(0)}>Conclusion</p>
          <h1 className="slide-title reveal" style={d(1)}>Long range.<br />Low power.</h1>
          {recap.map((r, i) => (<p key={r} className="slide-body reveal text-muted-foreground" style={d(2 + i)}>{r}</p>))}
          <div className="card-soft reveal flex items-center gap-8 p-8" style={d(5)}>
            <Node title="Transmitter" text={`Sending packet #${count}`} />
            <div className="relative h-[40px] flex-1">
              <div className="absolute top-1/2 h-[2px] w-full bg-border" />
              <span className="packet absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
            </div>
            <Node title="Receiver" text={`Hello #${count} ✓`} screen />
          </div>
        </div>
        <div className="flex flex-col justify-center gap-6">
          <p className="slide-kicker reveal text-muted-foreground" style={d(2)}>Quick quiz · tap to reveal</p>
          {quiz.map(([q, a], i) => {
            const isOpen = open.includes(i);
            return (
              <button key={q} onClick={(e) => { e.stopPropagation(); setOpen((o) => (isOpen ? o.filter((x) => x !== i) : [...o, i])); }}
                className="card-soft reveal flex items-center justify-between gap-8 p-10 text-left" style={d(3 + i)}>
                <span className="slide-body font-medium">{q}</span>
                <span className={`slide-subtitle shrink-0 text-primary transition-all duration-500 ${isOpen ? "opacity-100" : "opacity-0 blur-sm"}`}>{a}</span>
              </button>
            );
          })}
          <p className="slide-subtitle reveal mt-6" style={d(7)}>Thank you.</p>
        </div>
      </div>
    </SlideLayout>
  );
}

function Node({ title, text, screen }: { title: string; text: string; screen?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="slide-chrome text-subtle">{title}</span>
      <span className={`slide-chrome rounded-xl px-5 py-3 font-mono ${screen ? "bg-foreground text-background" : "bg-secondary"}`}>{text}</span>
    </div>
  );
}
