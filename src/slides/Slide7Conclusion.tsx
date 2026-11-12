import { useEffect, useState } from "react";
import { SlideLayout, d } from "@/components/deck/SlideLayout";

const quiz = [
  ["Does LoRa prioritize range or data speed?", "Range"],
  ["Which interface connects SX1278 to Arduino?", "SPI"],
  ["Can LoRa transmit video efficiently?", "No"],
];

const recap = [
  "Long‑range, low‑power wireless communication.",
  "Ideal for IoT and embedded systems.",
  "Two modules exchange messages via radio waves.",
];

export default function Slide7Conclusion() {
  const [open, setOpen] = useState<number[]>([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const t = setInterval(() => setCount((c) => c + 1), 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <SlideLayout number={7} label="Recap & Quiz">
      <div className="grid h-full grid-cols-2 gap-20 items-center">
        {/* Left: recap */}
        <div className="flex flex-col justify-center gap-8">
          <p className="slide-label reveal" style={d(0)}>Conclusion</p>

          <h1 className="slide-title reveal" style={d(1)}>Long range.<br />Low power.</h1>

          {recap.map((r, i) => (
            <p key={r} className="slide-body reveal text-gray-500" style={d(2 + i)}>{r}</p>
          ))}

          {/* Live transmitter */}
          <div className="card-clean reveal flex items-center gap-6 p-6" style={d(5)}>
            <Node title="Transmitter" text={`Sending packet #${count}`} />
            <div className="relative h-[36px] flex-1">
              <div className="absolute top-1/2 h-[1.5px] w-full bg-gray-200" />
              <span className="packet absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563eb]" />
            </div>
            <Node title="Receiver" text={`Hello #${count} ✓`} screen />
          </div>
        </div>

        {/* Right: quiz */}
        <div className="flex flex-col justify-center gap-5">
          <p className="reveal text-[13px] font-semibold uppercase tracking-wider text-gray-400" style={d(2)}>
            Quick quiz · tap to reveal
          </p>

          {quiz.map(([q, a], i) => {
            const isOpen = open.includes(i);
            return (
              <button
                key={q}
                onClick={(e) => { e.stopPropagation(); setOpen((o) => (isOpen ? o.filter((x) => x !== i) : [...o, i])); }}
                className="card-clean reveal flex items-center justify-between gap-6 p-8 text-left transition-shadow hover:shadow-md"
                style={d(3 + i)}
              >
                <span className="slide-body font-medium text-gray-800">{q}</span>
                <span className={`slide-subtitle shrink-0 text-[#2563eb] transition-all duration-500 ${isOpen ? "opacity-100" : "opacity-0 blur-sm"}`}>
                  {a}
                </span>
              </button>
            );
          })}

          <p className="slide-subtitle reveal mt-4 text-gray-800" style={d(7)}>Thank you.</p>
        </div>
      </div>
    </SlideLayout>
  );
}

function Node({ title, text, screen }: { title: string; text: string; screen?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[13px] text-gray-400">{title}</span>
      <span className={`rounded-xl px-4 py-2.5 font-mono text-[14px] ${
        screen ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}>
        {text}
      </span>
    </div>
  );
}
