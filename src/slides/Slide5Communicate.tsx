import { useEffect, useState } from "react";
import { SlideLayout, d } from "@/components/deck/SlideLayout";

const chain = ["Sensor", "Arduino", "LoRa TX", "Radio Waves", "LoRa RX", "Arduino", "Display"];
const steps = [
  "Microcontroller generates a message.",
  "Message goes to the LoRa transmitter via SPI.",
  "Transmitter sends data through radio waves.",
  "Receiver module picks up the signal.",
  "Receiving microcontroller reads and displays it.",
];

export default function Slide5Communicate() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % 3), 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <SlideLayout number={5} label="Communication">
      <div className="flex h-full flex-col justify-between">
        <div>
          <p className="slide-kicker reveal text-primary" style={d(0)}>Communication</p>
          <h1 className="slide-title reveal mt-6" style={d(1)}>How two LoRa devices talk.</h1>
        </div>
        <div className="reveal flex items-center justify-between" style={d(2)}>
          {chain.map((c, i) => (
            <div key={i} className="flex items-center">
              <div className={`slide-caption flex h-[110px] w-[200px] items-center justify-center rounded-[24px] font-semibold transition-transform ${c === "Radio Waves" ? "bg-accent text-accent-foreground" : "card-soft"}`}>{c}</div>
              {i < chain.length - 1 && <span className="slide-caption mx-[9px] text-subtle">→</span>}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-[1fr_760px] gap-16">
          <ol className="flex flex-col gap-4">
            {steps.map((s, i) => (
              <li key={s} className="slide-body reveal flex gap-6" style={d(3 + i)}>
                <span className="font-mono text-primary">{i + 1}</span>
                <span className="text-muted-foreground">{s}</span>
              </li>
            ))}
          </ol>
          <div className="card-soft reveal flex flex-col justify-center gap-6 p-10" style={d(5)}>
            <p className="slide-chrome text-subtle">Live message exchange</p>
            <Bubble show={phase >= 0} side="left" who="Node 1">Hello from Node 1</Bubble>
            <div className="slide-chrome h-6 text-center text-subtle">{phase === 1 ? "transmitting…" : ""}</div>
            <Bubble show={phase >= 2} side="right" who="Node 2">Received by Node 2</Bubble>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}

function Bubble({ show, side, who, children }: { show: boolean; side: "left" | "right"; who: string; children: string }) {
  return (
    <div className={`flex flex-col gap-2 transition-all duration-500 ${side === "right" ? "items-end" : "items-start"} ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <span className="slide-chrome text-subtle">{who}</span>
      <span className={`slide-body rounded-[24px] px-8 py-4 ${side === "right" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>{children}</span>
    </div>
  );
}
