import { useState } from "react";
import lora from "@/assets/lora-module.jpg";
import { SlideLayout, Question, d } from "@/components/deck/SlideLayout";
import { Radio, BatteryCharging, ShieldCheck, Cpu, Signal, Layers } from "lucide-react";

const pillars = [
  {
    icon: Radio,
    name: "Long Range",
    sub: "The 'Lo' in LoRa",
    metric: "10–15 km",
    detail: "Reaches several kilometers through forests, terrain, and reinforced concrete walls.",
    accent: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
  },
  {
    icon: BatteryCharging,
    name: "Low Power",
    sub: "The 'Ra' in LoRa",
    metric: "10+ Years",
    detail: "Operates on a small AA or coin battery with ultra-low deep sleep currents (< 1 µA).",
    accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  },
  {
    icon: ShieldCheck,
    name: "License‑Free",
    sub: "ISM Spectrum",
    metric: "Zero Fees",
    detail: "Utilizes public sub-gigahertz ISM radio bands (433 / 868 / 915 MHz) — no SIM or carrier bills.",
    accent: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  },
  {
    icon: Cpu,
    name: "IoT Native",
    sub: "High Capacity",
    metric: "10,000+ Nodes",
    detail: "Engineered specifically for low-bandwidth periodic sensor telemetry at scale.",
    accent: "text-purple-400 bg-purple-500/10 border-purple-500/30",
  },
];

const specs = {
  Overview: [
    { label: "Modulation", val: "Chirp Spread Spectrum (CSS)" },
    { label: "Sensitivity", val: "Down to -148 dBm" },
    { label: "Data Rate", val: "0.3 kbps to 50 kbps" },
    { label: "Typical Range", val: "15 km line-of-sight" },
  ],
  Frequencies: [
    { label: "Americas / US", val: "902 – 928 MHz" },
    { label: "Europe / EU", val: "863 – 870 MHz" },
    { label: "Asia / China", val: "470 – 510 MHz / 433 MHz" },
    { label: "India", val: "865 – 867 MHz" },
  ],
  "Power Budget": [
    { label: "Transmit Current", val: "~20 – 120 mA (peak TX)" },
    { label: "Receive Current", val: "~10 – 12 mA (RX)" },
    { label: "Deep Sleep Current", val: "< 1 µA (ultra-low)" },
    { label: "Coin Battery Life", val: "5 to 10 years" },
  ],
};

export default function Slide2WhatIsLora() {
  const [activeTab, setActiveTab] = useState<keyof typeof specs>("Overview");

  return (
    <SlideLayout number={2} label="What is LoRa?">
      <div className="grid h-full grid-cols-[1fr_720px] gap-16 items-center">
        {/* Left Column: Pillars & Explanation */}
        <div className="flex flex-col justify-center gap-7">
          <div className="flex items-center gap-3 reveal" style={d(0)}>
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            <p className="slide-kicker text-primary">02 // Core Technology</p>
          </div>

          <h1 className="slide-title reveal" style={d(1)}>
            What is <span className="text-gradient-cyan">LoRa?</span>
          </h1>

          <p className="slide-body-lg text-muted-foreground reveal" style={d(2)}>
            <strong className="text-foreground">LoRa</strong> (short for{" "}
            <span className="text-cyan-300 font-semibold">Lo</span>ng{" "}
            <span className="text-cyan-300 font-semibold">Ra</span>nge) is a revolutionary
            wireless radio frequency technology engineered specifically for the Internet of Things.
          </p>

          {/* 4 Pillars Cards */}
          <div className="grid grid-cols-2 gap-4 reveal" style={d(3)}>
            {pillars.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="card-soft-interactive flex flex-col justify-between p-6 rounded-2xl border border-border/80"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${item.accent}`}>
                        <Icon size={20} />
                      </div>
                      <span className="slide-chrome font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary border border-border/60">
                        {item.metric}
                      </span>
                    </div>
                    <span className="slide-subtitle text-2xl font-bold text-foreground block">
                      {item.name}
                    </span>
                    <span className="slide-chrome font-mono text-xs text-subtle block mb-2">
                      {item.sub}
                    </span>
                    <p className="slide-caption text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Question delay={5}>
            For a battery-powered sensor in the wild, why does extreme range matter more than streaming video?
          </Question>
        </div>

        {/* Right Column: Hardware Module Hero & Specs Workbench */}
        <div className="reveal-fade flex flex-col gap-6" style={d(2)}>
          {/* Hardware Frame with Callouts */}
          <div className="relative overflow-hidden rounded-[32px] border border-border/80 bg-secondary/50 shadow-2xl">
            <img
              src={lora}
              alt="LoRa SX1278 module with helical spring antenna"
              className="h-[430px] w-full object-cover filter contrast-[1.05]"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40 pointer-events-none" />

            {/* Hardware Callout Badges */}
            <div className="absolute top-5 left-5 rounded-full bg-card/90 px-4 py-1.5 backdrop-blur-md border border-border/80 shadow-lg">
              <span className="slide-chrome font-mono text-xs font-semibold text-cyan-300">
                SX1278 · 433 MHz Transceiver
              </span>
            </div>

            <div className="absolute top-5 right-5 flex items-center gap-2 rounded-full bg-card/90 px-4 py-1.5 backdrop-blur-md border border-border/80">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="slide-chrome font-mono text-xs text-foreground">
                Helical Spring Antenna
              </span>
            </div>

            <div className="absolute bottom-5 inset-x-5 flex items-center justify-between rounded-2xl bg-card/90 p-3.5 backdrop-blur-md border border-border/70">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <Signal size={16} />
                </div>
                <span className="slide-chrome text-xs font-medium text-muted-foreground">
                  Semtech CSS Modulation Engine inside metal shield
                </span>
              </div>
              <span className="slide-chrome font-mono text-xs text-cyan-400 font-semibold">
                SPI Bus
              </span>
            </div>
          </div>

          {/* Interactive Technical Specifications Box */}
          <div className="card-soft p-6 rounded-2xl border border-border/80">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/60">
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-primary" />
                <span className="slide-chrome font-semibold text-xs text-foreground uppercase tracking-wider">
                  Technical Specifications
                </span>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1.5 rounded-xl bg-secondary/80 p-1 border border-border/60">
                {(Object.keys(specs) as (keyof typeof specs)[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      activeTab === tab
                        ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Spec Items Grid */}
            <div className="grid grid-cols-2 gap-3">
              {specs[activeTab].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl bg-secondary/40 p-3 border border-border/40 flex flex-col justify-between"
                >
                  <span className="slide-chrome font-mono text-[11px] text-subtle">
                    {item.label}
                  </span>
                  <span className="slide-body font-mono text-sm font-semibold text-foreground mt-1">
                    {item.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
