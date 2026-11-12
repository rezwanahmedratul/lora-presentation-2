import { useState } from "react";
import farm from "@/assets/farm.jpg";
import { SlideLayout, Question, d } from "@/components/deck/SlideLayout";
import { Wifi, Smartphone, Radio, Zap, Activity } from "lucide-react";

export default function Slide1Problem() {
  const [pingCount, setPingCount] = useState(1);
  const [pinging, setPinging] = useState(false);

  const triggerPing = () => {
    if (pinging) return;
    setPinging(true);
    setPingCount((c) => c + 1);
    setTimeout(() => setPinging(false), 2400);
  };

  const options = [
    {
      icon: Wifi,
      title: "Wi‑Fi",
      limitation: "Range < 100m",
      detail: "Massive throughput, but drains battery in days and can't cover vast acreage.",
      tag: "High Power · Short Range",
      status: "bad",
    },
    {
      icon: Smartphone,
      title: "Cellular (4G / 5G)",
      limitation: "Expensive & Power Hungry",
      detail: "Requires SIM cards, recurring monthly data plans, and suffers from rural dead-zones.",
      tag: "High Cost · Heavy Draw",
      status: "bad",
    },
    {
      icon: Radio,
      title: "The LoRa Solution",
      limitation: "10+ km Range · 10 Year Battery",
      detail: "Transmits periodic telemetry across entire horizons on license-free spectrum.",
      tag: "Ultra-Low Power · Free ISM",
      status: "highlight",
    },
  ];

  return (
    <SlideLayout number={1} label="The Problem">
      <div className="grid h-full grid-cols-[1fr_820px] gap-16 items-center">
        {/* Left Column: Story & Comparison */}
        <div className="flex flex-col justify-center gap-7">
          <div className="flex items-center gap-3 reveal" style={d(0)}>
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            <p className="slide-kicker text-primary">01 // The Horizon Challenge</p>
          </div>

          <h1 className="slide-title reveal" style={d(1)}>
            Connecting things,{" "}
            <span className="text-gradient-cyan">wirelessly.</span>
          </h1>

          <p className="slide-body-lg text-muted-foreground reveal" style={d(2)}>
            Imagine monitoring a sprawling farm, wildlife reserve, or remote industrial zone.
            Existing wireless protocols force a painful compromise:
          </p>

          {/* Protocol Comparison Cards */}
          <div className="grid grid-cols-1 gap-3.5 reveal" style={d(3)}>
            {options.map((item, i) => {
              const Icon = item.icon;
              const isHighlight = item.status === "highlight";
              return (
                <div
                  key={item.title}
                  className={`flex items-center justify-between rounded-2xl p-4.5 px-6 transition-all duration-300 border ${
                    isHighlight
                      ? "border-primary/40 bg-primary/[0.08] shadow-[0_8px_24px_rgba(56,189,248,0.12)]"
                      : "border-border/60 bg-secondary/40 hover:bg-secondary/60"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        isHighlight
                          ? "bg-primary text-primary-foreground shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="slide-body font-semibold text-foreground">
                          {item.title}
                        </span>
                        <span
                          className={`slide-chrome font-mono text-xs px-2.5 py-0.5 rounded-full ${
                            isHighlight
                              ? "bg-primary/20 text-cyan-300 border border-primary/30"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {item.tag}
                        </span>
                      </div>
                      <p className="slide-caption text-muted-foreground mt-0.5">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <span
                      className={`slide-caption font-semibold ${
                        isHighlight ? "text-primary" : "text-subtle line-through"
                      }`}
                    >
                      {item.limitation}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <Question delay={5}>
            How would you send soil readings from a sensor 5 km away without Wi‑Fi or cellular?
          </Question>
        </div>

        {/* Right Column: Hero Farm Visual with Animated HUD */}
        <div className="reveal-fade relative h-[780px] w-full overflow-hidden rounded-[36px] border border-border/80 shadow-2xl" style={d(1)}>
          <img
            src={farm}
            alt="Expansive farm field under sky"
            className="h-full w-full object-cover filter brightness-[0.9] contrast-[1.05]"
          />

          {/* High-tech HUD Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/30 pointer-events-none" />

          {/* Top GPS HUD bar */}
          <div className="absolute top-6 inset-x-6 flex items-center justify-between rounded-2xl bg-card/80 px-5 py-3 backdrop-blur-md border border-border/60">
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="slide-chrome font-mono text-xs text-foreground font-semibold">
                SECTOR #42 · VALLEY OBSERVATORY
              </span>
            </div>
            <span className="slide-chrome font-mono text-xs text-subtle">
              LAT 45.312° N · LON 122.981° W
            </span>
          </div>

          {/* Simulated LoRa Beam Path */}
          <svg className="absolute inset-0 h-full w-full pointer-events-none">
            <line
              x1="180"
              y1="560"
              x2="620"
              y2="340"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeDasharray="6 6"
              className="opacity-60"
            />
            {pinging && (
              <circle
                cx="620"
                cy="340"
                r="8"
                fill="#38bdf8"
                className="animate-ping"
              />
            )}
          </svg>

          {/* Gateway Pin (Bottom Left) */}
          <div className="absolute left-16 bottom-32 flex items-center gap-3">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-card/90 border border-primary/50 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.25)]">
              <Radio size={24} className="text-primary" />
              <span className="wave-ring absolute inset-0 rounded-2xl border-2 border-primary/60" />
            </div>
            <div className="rounded-xl bg-card/90 px-3.5 py-2 backdrop-blur-md border border-border/60">
              <span className="slide-chrome font-semibold block text-xs text-foreground">
                LoRa Gateway
              </span>
              <span className="slide-chrome font-mono text-[11px] text-primary">
                Base Station #01
              </span>
            </div>
          </div>

          {/* Remote Field Sensor Node (Far Field) */}
          <div className="absolute right-20 top-64 flex flex-col items-center">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 border-2 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.5)]">
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <span className="wave-ring absolute inset-0 rounded-full border-2 border-emerald-400" />
            </div>

            {/* Floating Telemetry Box */}
            <div className="mt-3 w-[260px] rounded-2xl bg-card/95 p-4 backdrop-blur-md border border-border/80 shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-border/60">
                <span className="slide-chrome font-semibold text-xs text-foreground">
                  Soil Sensor #04
                </span>
                <span className="slide-chrome font-mono text-[11px] text-emerald-400 font-medium">
                  2.4 km away
                </span>
              </div>
              <div className="mt-2.5 grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="rounded-lg bg-secondary/60 p-2">
                  <span className="text-subtle block text-[10px]">MOISTURE</span>
                  <span className="text-foreground font-semibold text-sm">42.8%</span>
                </div>
                <div className="rounded-lg bg-secondary/60 p-2">
                  <span className="text-subtle block text-[10px]">TEMP</span>
                  <span className="text-foreground font-semibold text-sm">21.4°C</span>
                </div>
              </div>
              <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-subtle">
                <span>BATTERY: 98%</span>
                <span className="text-primary">RSSI: -116 dBm</span>
              </div>
            </div>
          </div>

          {/* Interactive Ping Telemetry Trigger */}
          <div className="absolute bottom-6 inset-x-6 flex items-center justify-between rounded-2xl bg-card/90 p-4 backdrop-blur-md border border-border/60">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <Activity size={18} />
              </div>
              <div>
                <span className="slide-chrome block text-xs font-semibold text-foreground">
                  Live Field Telemetry
                </span>
                <span className="slide-chrome font-mono text-[11px] text-subtle">
                  Packet #{pingCount} transmitted over 2.4 km via LoRa CSS
                </span>
              </div>
            </div>
            <button
              onClick={triggerPing}
              disabled={pinging}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-50"
            >
              <Zap size={14} className={pinging ? "animate-spin" : ""} />
              <span>{pinging ? "Transmitting..." : "Send Test Ping"}</span>
            </button>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
