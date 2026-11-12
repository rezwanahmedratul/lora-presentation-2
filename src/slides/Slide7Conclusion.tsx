import { useEffect, useState } from "react";
import { SlideLayout, d } from "@/components/deck/SlideLayout";
import { Radio, ShieldCheck, Zap, Sparkles, Layers } from "lucide-react";

const keyTakeaways = [
  {
    icon: Radio,
    title: "15+ km Wireless Reach",
    desc: "Chirp Spread Spectrum (CSS) enables reliable non-line-of-sight propagation through terrain, foliage, and dense walls.",
  },
  {
    icon: Zap,
    title: "Decade-Long Battery Life",
    desc: "Microampere sleep currents allow remote battery-powered sensors to operate autonomously for 5 to 10 years.",
  },
  {
    icon: ShieldCheck,
    title: "Zero Carrier Subscriptions",
    desc: "Broadcasts over license-free sub-gigahertz ISM spectrum (433 / 868 / 915 MHz) without recurring SIM fees.",
  },
];

export default function Slide7Conclusion() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const t = setInterval(() => setCount((c) => c + 1), 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <SlideLayout number={7} label="Conclusion">
      <div className="grid h-full grid-cols-2 gap-20 items-center">
        {/* Left Column: Big Statement & Live Telemetry */}
        <div className="flex flex-col justify-center gap-8">
          <div className="flex items-center gap-2.5 reveal" style={d(0)}>
            <span className="accent-dot" />
            <p className="slide-label">07 // Final Summary</p>
          </div>

          <h1 className="slide-title reveal" style={d(1)}>
            Long range. <br />
            <span className="text-blue-600">Low power.</span>
          </h1>

          <p className="slide-body text-gray-500 reveal" style={d(2)}>
            LoRa fundamentally bridges the gap between short-range Wi‑Fi and expensive cellular networks, enabling the next generation of pervasive IoT monitoring.
          </p>

          {/* Live transmitter & receiver demo card */}
          <div className="card-clean reveal flex items-center gap-6 p-6" style={d(3)}>
            <Node title="Transmitter" text={`Packet #${count}`} />
            <div className="relative h-[36px] flex-1">
              <div className="absolute top-1/2 h-[1.5px] w-full bg-gray-200" />
              <span className="packet absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600" />
            </div>
            <Node title="Receiver" text={`ACK #${count} ✓`} screen />
          </div>

          <div className="reveal flex items-center gap-2 text-gray-400 text-xs font-mono" style={d(4)}>
            <Sparkles size={14} className="text-blue-600" />
            <span>Telemetry Link · 915 MHz ISM Band</span>
          </div>
        </div>

        {/* Right Column: Key Takeaways & Closing Card */}
        <div className="flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-3.5 reveal" style={d(2)}>
            {keyTakeaways.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="card-clean flex items-start gap-4 p-5 rounded-2xl border border-gray-200/80"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                    <Icon size={20} />
                  </div>
                  <div>
                    <span className="font-bold text-[17px] text-gray-900 block leading-tight">
                      {item.title}
                    </span>
                    <p className="text-[13px] text-gray-500 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Thank You & Q&A Banner */}
          <div className="card-clean reveal flex items-center justify-between p-6 px-8 rounded-2xl bg-blue-50/50 border border-blue-100" style={d(5)}>
            <div>
              <p className="slide-subtitle font-bold text-gray-900">Thank you.</p>
              <p className="text-[14px] text-gray-500 mt-0.5">Questions & Open Discussion</p>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 border border-blue-200 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="font-mono text-xs font-semibold text-blue-600">
                LoRa Complete
              </span>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}

function Node({ title, text, screen }: { title: string; text: string; screen?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[12px] font-mono text-gray-400">{title}</span>
      <span
        className={`rounded-xl px-4 py-2 font-mono text-[13px] font-semibold ${
          screen ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        {text}
      </span>
    </div>
  );
}
