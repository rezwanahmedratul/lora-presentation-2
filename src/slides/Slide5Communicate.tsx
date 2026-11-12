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
          <p className="slide-label reveal" style={d(0)}>Communication</p>
          <h1 className="slide-title reveal mt-4" style={d(1)}>How two LoRa<br />devices talk.</h1>
        </div>

        {/* Chain */}
        <div className="reveal flex items-center justify-between" style={d(2)}>
          {chain.map((c, i) => (
            <div key={i} className="flex items-center">
              <div className={`flex h-[90px] w-[190px] items-center justify-center rounded-2xl text-[16px] font-semibold ${
                c === "Radio Waves"
                  ? "bg-blue-50 text-[#2563eb] border border-blue-200"
                  : "card-clean"
              }`}>
                {c}
              </div>
              {i < chain.length - 1 && <span className="mx-2 text-[18px] text-gray-300">→</span>}
            </div>
          ))}
        </div>

        {/* Steps + Live chat */}
        <div className="grid grid-cols-[1fr_680px] gap-14">
          <ol className="flex flex-col gap-3">
            {steps.map((s, i) => (
              <li key={s} className="slide-body reveal flex gap-5" style={d(3 + i)}>
                <span className="font-mono text-[#2563eb] font-semibold">{i + 1}</span>
                <span className="text-gray-500">{s}</span>
              </li>
            ))}
          </ol>

          <div className="card-clean reveal flex flex-col justify-center gap-4 p-8" style={d(5)}>
            <p className="text-[13px] text-gray-400">Live message exchange</p>
            <Bubble show={phase >= 0} side="left" who="Node 1">Hello from Node 1</Bubble>
            <div className="h-5 text-center text-[13px] text-gray-400">{phase === 1 ? "transmitting…" : ""}</div>
            <Bubble show={phase >= 2} side="right" who="Node 2">Received by Node 2</Bubble>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}

function Bubble({ show, side, who, children }: { show: boolean; side: "left" | "right"; who: string; children: string }) {
  return (
    <div className={`flex flex-col gap-1.5 transition-all duration-500 ${side === "right" ? "items-end" : "items-start"} ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
      <span className="text-[13px] text-gray-400">{who}</span>
      <span className={`rounded-2xl px-6 py-3 text-[18px] ${
        side === "right"
          ? "bg-[#2563eb] text-white"
          : "bg-gray-100 text-gray-800"
      }`}>
        {children}
      </span>
    </div>
  );
}
