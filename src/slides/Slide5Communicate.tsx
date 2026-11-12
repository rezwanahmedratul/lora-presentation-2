import { useState, useEffect } from "react";
import { SlideLayout, d } from "@/components/deck/SlideLayout";
import { Send, Radio, Terminal, Cpu, MonitorCheck, ArrowRight, ShieldCheck, Zap } from "lucide-react";

const pipelineStages = [
  { id: 1, name: "Sensor", desc: "Measures physical metric (Temp / Moisture)", icon: Zap },
  { id: 2, name: "TX MCU", desc: "Encodes payload into packet buffer", icon: Cpu },
  { id: 3, name: "LoRa TX", desc: "Modulates CSS chirps & broadcasts RF", icon: Radio },
  { id: 4, name: "Radio Waves", desc: "Travels 5–15 km through atmosphere", icon: Send },
  { id: 5, name: "LoRa RX", desc: "Detects chirps, checks CRC & fires DIO0", icon: ShieldCheck },
  { id: 6, name: "Gateway / Screen", desc: "Displays data & uploads to cloud", icon: MonitorCheck },
];

export default function Slide5Communicate() {
  const [activeStage, setActiveStage] = useState(3);
  const [packetCount, setPacketCount] = useState(1);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [temp, setTemp] = useState(24.8);
  const [rssi, setRssi] = useState(-112);

  // Auto progression of packet transmission
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStage((prev) => {
        if (prev >= 6) {
          setPacketCount((c) => c + 1);
          setTemp(+(22 + Math.random() * 5).toFixed(1));
          setRssi(-110 - Math.floor(Math.random() * 10));
          return 1;
        }
        return prev + 1;
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const triggerManualSend = () => {
    if (isTransmitting) return;
    setIsTransmitting(true);
    setActiveStage(1);
    setPacketCount((c) => c + 1);
    setTemp(+(22 + Math.random() * 5).toFixed(1));
    setTimeout(() => setActiveStage(2), 500);
    setTimeout(() => setActiveStage(3), 1000);
    setTimeout(() => setActiveStage(4), 1600);
    setTimeout(() => setActiveStage(5), 2200);
    setTimeout(() => {
      setActiveStage(6);
      setIsTransmitting(false);
    }, 2800);
  };

  return (
    <SlideLayout number={5} label="Communication Protocol">
      <div className="flex h-full flex-col justify-between py-2">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 reveal" style={d(0)}>
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
              <p className="slide-kicker text-primary">05 // Transmission Lifecycle</p>
            </div>
            <h1 className="slide-title reveal mt-2" style={d(1)}>
              How two LoRa devices <span className="text-gradient-cyan">communicate.</span>
            </h1>
          </div>

          <button
            onClick={triggerManualSend}
            disabled={isTransmitting}
            className="reveal flex items-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-50"
            style={d(2)}
          >
            <Send size={16} className={isTransmitting ? "animate-pulse" : ""} />
            <span>{isTransmitting ? "Broadcasting..." : "Transmit Test Packet"}</span>
          </button>
        </div>

        {/* 6-Stage Pipeline Graphic */}
        <div className="reveal grid grid-cols-6 gap-3.5" style={d(2)}>
          {pipelineStages.map((stage) => {
            const Icon = stage.icon;
            const isCurrent = activeStage === stage.id;
            const isPassed = activeStage > stage.id;
            return (
              <div
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`relative flex flex-col justify-between p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                  isCurrent
                    ? "border-primary bg-primary/15 shadow-[0_0_25px_rgba(56,189,248,0.25)] scale-[1.03]"
                    : isPassed
                    ? "border-cyan-500/40 bg-secondary/60 text-foreground"
                    : "border-border/60 bg-secondary/30 text-muted-foreground opacity-60"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="slide-chrome font-mono text-xs font-bold text-primary">
                    0{stage.id}
                  </span>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                      isCurrent
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-secondary text-foreground"
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                </div>

                <div>
                  <span className="slide-body font-bold text-base block text-foreground">
                    {stage.name}
                  </span>
                  <p className="slide-chrome text-[12px] text-muted-foreground mt-1 line-clamp-2">
                    {stage.desc}
                  </p>
                </div>

                {isCurrent && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-12 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Interactive Simulation Grid */}
        <div className="grid grid-cols-[1fr_820px] gap-10 items-stretch">
          {/* Left: Step Explanations */}
          <div className="card-soft p-7 rounded-3xl border border-border/80 flex flex-col justify-between reveal" style={d(3)}>
            <div className="flex flex-col gap-4">
              <span className="slide-chrome font-mono text-xs text-primary font-bold uppercase tracking-wider">
                Step by Step Protocol Flow
              </span>

              <ol className="flex flex-col gap-3">
                {[
                  { n: 1, text: "Microcontroller polls sensor and serializes data into a small payload." },
                  { n: 2, text: "Data is streamed over SPI into the SX1278 internal FIFO memory buffer." },
                  { n: 3, text: "Transceiver calculates CRC checksum and modulates payload into CSS chirps." },
                  { n: 4, text: "Radio waves radiate at 915 MHz, penetrating obstacles up to 15 kilometers." },
                  { n: 5, text: "Remote receiver continuously performs CAD (Channel Activity Detection)." },
                  { n: 6, text: "Receiver de-chirps signal, verifies CRC, triggers DIO0, and outputs readings." },
                ].map((item) => (
                  <li
                    key={item.n}
                    className={`flex items-start gap-3.5 p-2 rounded-xl transition-colors ${
                      activeStage === item.n ? "bg-primary/10 text-foreground font-medium" : "text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-xs font-bold ${
                        activeStage === item.n
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-subtle"
                      }`}
                    >
                      {item.n}
                    </span>
                    <span className="slide-caption text-sm leading-snug">{item.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right: Live Interactive Telemetry Console & Devices */}
          <div className="card-soft p-7 rounded-3xl border border-border/80 flex flex-col justify-between gap-5 reveal" style={d(4)}>
            {/* Live Terminal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-2.5">
                <Terminal size={18} className="text-primary" />
                <span className="slide-chrome font-mono text-xs font-bold text-foreground uppercase tracking-wider">
                  RF Packet Inspector (Live Air Link)
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-semibold">LINK ACTIVE · 915 MHz</span>
              </div>
            </div>

            {/* Visual Node Devices with Chat / Message Exchange */}
            <div className="grid grid-cols-2 gap-5 items-center">
              {/* Transmitter Device Card */}
              <div
                className={`rounded-2xl p-4.5 border transition-all duration-300 ${
                  activeStage <= 3
                    ? "border-primary bg-primary/[0.08] shadow-[0_0_20px_rgba(56,189,248,0.15)]"
                    : "border-border/60 bg-secondary/40"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="slide-chrome font-mono text-xs font-bold text-foreground">
                    Node 1 (Field Sensor TX)
                  </span>
                  <span className="slide-chrome font-mono text-[11px] text-cyan-400">
                    ID: 0x4A21
                  </span>
                </div>
                <div className="rounded-xl bg-background/90 p-3 font-mono text-xs border border-border/70 text-cyan-300">
                  <span className="text-subtle block text-[10px]">TRANSMITTED PAYLOAD:</span>
                  <span className="font-bold text-sm block mt-0.5">
                    {`{"t": ${temp}, "h": 58, "pkt": ${packetCount}}`}
                  </span>
                </div>
                <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-subtle">
                  <span>TX POWER: +14 dBm</span>
                  <span>SF: 7 · BW: 125k</span>
                </div>
              </div>

              {/* Receiver Device Card */}
              <div
                className={`rounded-2xl p-4.5 border transition-all duration-300 ${
                  activeStage >= 5
                    ? "border-emerald-500 bg-emerald-500/[0.08] shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                    : "border-border/60 bg-secondary/40"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="slide-chrome font-mono text-xs font-bold text-foreground">
                    Node 2 (Gateway RX)
                  </span>
                  <span className="slide-chrome font-mono text-[11px] text-emerald-400">
                    CRC VALID ✓
                  </span>
                </div>
                <div className="rounded-xl bg-background/90 p-3 font-mono text-xs border border-border/70 text-emerald-300">
                  <span className="text-subtle block text-[10px]">DECODED TELEMETRY:</span>
                  <span className="font-bold text-sm block mt-0.5">
                    {activeStage >= 5
                      ? `Temp: ${temp}°C · Humidity: 58%`
                      : "Listening for preamble chirps..."}
                  </span>
                </div>
                <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-subtle">
                  <span>RSSI: {rssi} dBm</span>
                  <span className="text-emerald-400">SNR: +7.8 dB</span>
                </div>
              </div>
            </div>

            {/* Packet Raw Specs Grid */}
            <div className="rounded-xl bg-secondary/50 p-3 px-4 border border-border/50 grid grid-cols-4 gap-3 text-xs font-mono">
              <div>
                <span className="text-subtle block text-[10px]">AIRTIME</span>
                <span className="text-foreground font-semibold">61.7 ms</span>
              </div>
              <div>
                <span className="text-subtle block text-[10px]">FREQUENCY</span>
                <span className="text-cyan-400 font-semibold">915.00 MHz</span>
              </div>
              <div>
                <span className="text-subtle block text-[10px]">CODING RATE</span>
                <span className="text-foreground font-semibold">CR 4/5</span>
              </div>
              <div>
                <span className="text-subtle block text-[10px]">PACKETS SENT</span>
                <span className="text-emerald-400 font-semibold">#{packetCount} ACK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
