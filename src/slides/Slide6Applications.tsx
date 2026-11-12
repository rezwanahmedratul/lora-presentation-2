import { useState } from "react";
import {
  Sprout,
  Droplets,
  ParkingSquare,
  Flame,
  Factory,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Radio,
} from "lucide-react";
import { SlideLayout, Question, d } from "@/components/deck/SlideLayout";

const apps = [
  {
    icon: Sprout,
    title: "Smart Agriculture",
    sub: "Soil & Crop Health",
    metric: "1,000+ Acres",
    detail: "Soil moisture, temperature, and automated irrigation valves across vast farmland.",
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  },
  {
    icon: Droplets,
    title: "Flood & River Alert",
    sub: "Hydrology Sensors",
    metric: "15 km Upstream",
    detail: "Autonomous solar stations monitoring water levels and storm runoff in mountains.",
    color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
  },
  {
    icon: ParkingSquare,
    title: "Smart Cities",
    sub: "Parking & Utilities",
    metric: "10-Yr Battery",
    detail: "Sub-surface magnetic bay occupancy detectors and automated smart street lighting.",
    color: "text-blue-400 bg-blue-500/10 border-blue-500/30",
  },
  {
    icon: Flame,
    title: "Wildfire Detection",
    sub: "Remote Reserves",
    metric: "Mesh Coverage",
    detail: "Gas and heat sensors detecting smoke within minutes deep inside national forests.",
    color: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  },
  {
    icon: Factory,
    title: "Industrial & Logistics",
    sub: "Asset Tracking",
    metric: "Zero SIM Bills",
    detail: "Container tracking across shipping ports and automated gas/water meter readings.",
    color: "text-purple-400 bg-purple-500/10 border-purple-500/30",
  },
];

export default function Slide6Applications() {
  const [selectedApp, setSelectedApp] = useState(0);

  return (
    <SlideLayout number={6} label="Applications & Limits">
      <div className="flex h-full flex-col justify-between py-1">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 reveal" style={d(0)}>
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            <p className="slide-kicker text-primary">06 // Deployments & Trade-offs</p>
          </div>
          <h1 className="slide-title reveal mt-2" style={d(1)}>
            Applications and <span className="text-gradient-cyan">limitations.</span>
          </h1>
        </div>

        {/* 5 Application Cards Row */}
        <div className="grid grid-cols-5 gap-4 reveal" style={d(2)}>
          {apps.map((item, i) => {
            const Icon = item.icon;
            const isSelected = selectedApp === i;
            return (
              <div
                key={item.title}
                onClick={() => setSelectedApp(i)}
                className={`card-soft-interactive flex flex-col justify-between p-6 rounded-2xl cursor-pointer border transition-all duration-300 ${
                  isSelected
                    ? "border-primary bg-primary/[0.12] shadow-[0_0_25px_rgba(56,189,248,0.2)] scale-[1.02]"
                    : "border-border/70 hover:border-primary/40"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${item.color}`}>
                      <Icon size={24} />
                    </div>
                    <span className="slide-chrome font-mono text-[11px] font-semibold px-2.5 py-1 rounded-full bg-secondary border border-border/60">
                      {item.metric}
                    </span>
                  </div>

                  <span className="slide-body font-bold text-lg text-foreground block">
                    {item.title}
                  </span>
                  <span className="slide-chrome font-mono text-xs text-subtle block mb-2">
                    {item.sub}
                  </span>
                  <p className="slide-caption text-xs text-muted-foreground leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
                  <span className="slide-chrome font-mono text-[11px] text-cyan-400 font-semibold">
                    LoRa Enabled
                  </span>
                  <span className="slide-chrome font-mono text-[11px] text-subtle">
                    0{i + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section: Side-by-side What LoRa is for vs What it isn't */}
        <div className="grid grid-cols-[1fr_1fr] gap-8 reveal" style={d(4)}>
          {/* Where LoRa Shines */}
          <div className="rounded-3xl bg-secondary/40 border border-emerald-500/30 p-6 flex flex-col justify-between backdrop-blur-md">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <CheckCircle2 size={20} className="text-emerald-400" />
                <span className="slide-subtitle text-lg font-bold text-foreground">
                  Where LoRa Dominates
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {[
                  "Small periodic sensor readings (5–100 bytes)",
                  "Battery-operated devices needing 10+ year life",
                  "Sensors deep in rural or off-grid locations",
                  "Private campus networks with zero recurring fees",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-2.5">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    <span className="slide-caption text-xs text-foreground/90 leading-snug">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-mono text-emerald-400">
              <span>Rule: Ideal for small telemetry packets</span>
              <span>Payload: ~50–250 bytes</span>
            </div>
          </div>

          {/* Limitations / Reality Check */}
          <div className="rounded-3xl bg-secondary/40 border border-red-500/30 p-6 flex flex-col justify-between backdrop-blur-md">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <XCircle size={20} className="text-red-400" />
                <span className="slide-subtitle text-lg font-bold text-foreground">
                  Engineering Limitations
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {[
                  "Low data rate (0.3 – 50 kbps) — no video/audio",
                  "Duty-cycle laws (EU limit: 1% airtime / 36s per hr)",
                  "Not for high-frequency low-latency gaming",
                  "Firmware OTA updates must be tiny & chunked",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-2.5">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                    <span className="slide-caption text-xs text-foreground/90 leading-snug">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-mono text-red-400">
              <span>"Whispers across kilometers, not conversations across rooms."</span>
            </div>
          </div>
        </div>

        {/* Audience Question */}
        <div className="reveal" style={d(5)}>
          <Question delay={5}>
            Which wireless technology would you pick to monitor soil moisture across a 500-acre vineyard?
          </Question>
        </div>
      </div>
    </SlideLayout>
  );
}
