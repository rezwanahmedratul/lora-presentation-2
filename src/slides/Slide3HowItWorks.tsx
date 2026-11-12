import { useState, useRef } from "react";
import { SlideLayout, d } from "@/components/deck/SlideLayout";
import { Activity, Volume2, ShieldAlert, Sparkles, Sliders } from "lucide-react";

export default function Slide3HowItWorks() {
  const [chirpType, setChirpType] = useState<"up" | "down">("up");
  const [spreadingFactor, setSpreadingFactor] = useState(7);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play an actual audio chirp using Web Audio API to demonstrate the concept!
  const playAudioChirp = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = audioCtxRef.current || new AudioCtx();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;
      const duration = 0.45;

      osc.type = "sine";
      if (chirpType === "up") {
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(2400, now + duration);
      } else {
        osc.frequency.setValueAtTime(2400, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + duration);
      }

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Audio not supported or blocked
    }
  };

  // Generate CSS Sawtooth Path
  const chirpSawtooth = () => {
    const W = 760;
    const H = 200;
    const n = 3;
    const pts: string[] = [];
    for (let c = 0; c < n; c++) {
      const x0 = (c * W) / n;
      const x1 = ((c + 1) * W) / n - 10;
      if (chirpType === "up") {
        pts.push(`M ${x0} ${H - 10} L ${x1} 15`);
      } else {
        pts.push(`M ${x0} 15 L ${x1} ${H - 10}`);
      }
    }
    return pts.join(" ");
  };

  // Generate Frequency Waveform Path
  const chirpSineWave = () => {
    let p = "M 0 50";
    const W = 760;
    for (let x = 0; x <= W; x += 2) {
      const segT = (x % 253) / 253;
      const t = chirpType === "up" ? segT : 1 - segT;
      const phase = 2 * Math.PI * (1.5 * t + 8.5 * t * t);
      const y = 50 - 38 * Math.sin(phase);
      p += ` L ${x} ${y}`;
    }
    return p;
  };

  return (
    <SlideLayout number={3} label="How LoRa Works">
      <div className="grid h-full grid-cols-[640px_1fr] gap-16 items-center">
        {/* Left Column: Theory & Principles */}
        <div className="flex flex-col justify-center gap-6">
          <div className="flex items-center gap-3 reveal" style={d(0)}>
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            <p className="slide-kicker text-primary">03 // Signal Physics</p>
          </div>

          <h1 className="slide-title reveal" style={d(1)}>
            Chirp Spread <span className="text-gradient-cyan">Spectrum.</span>
          </h1>

          <p className="slide-body text-muted-foreground reveal" style={d(2)}>
            Traditional radio uses fixed frequencies prone to noise and interference.
            LoRa modulates data into continuous frequency sweeps called <strong className="text-foreground">chirps</strong>.
          </p>

          <div className="flex flex-col gap-3.5 reveal" style={d(3)}>
            <div className="border-l-2 border-primary pl-5 py-1">
              <span className="slide-body font-semibold text-foreground block">
                1. Frequency Modulation (CSS)
              </span>
              <p className="slide-caption text-muted-foreground mt-0.5">
                The radio signal continuously sweeps across the bandwidth from minimum to maximum frequency.
              </p>
            </div>

            <div className="border-l-2 border-emerald-400 pl-5 py-1">
              <span className="slide-body font-semibold text-foreground block">
                2. Penetrates Below the Noise Floor
              </span>
              <p className="slide-caption text-muted-foreground mt-0.5">
                CSS signals can be decoded even when the signal power is 20 dB weaker than ambient background noise (<span className="text-emerald-400 font-mono font-medium">SNR = -20 dB</span>).
              </p>
            </div>

            <div className="border-l-2 border-purple-400 pl-5 py-1">
              <span className="slide-body font-semibold text-foreground block">
                3. Spreading Factor (SF7 – SF12)
              </span>
              <p className="slide-caption text-muted-foreground mt-0.5">
                Adjusts the chirp duration: higher SF spreads the chirp longer, trading raw data speed for immense range.
              </p>
            </div>
          </div>

          {/* Interactive Spreading Factor Selector */}
          <div className="card-soft p-5 rounded-2xl border border-border/80 reveal" style={d(4)}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sliders size={16} className="text-primary" />
                <span className="slide-chrome font-semibold text-xs text-foreground uppercase tracking-wider">
                  Spreading Factor: SF{spreadingFactor}
                </span>
              </div>
              <span className="slide-chrome font-mono text-xs text-cyan-400 font-semibold">
                {spreadingFactor === 7
                  ? "Fastest (5.5 kbps) · ~5 km"
                  : spreadingFactor === 12
                  ? "Maximum Range (0.25 kbps) · 15+ km"
                  : "Balanced"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {[7, 8, 9, 10, 11, 12].map((sf) => (
                <button
                  key={sf}
                  onClick={() => setSpreadingFactor(sf)}
                  className={`flex-1 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all ${
                    spreadingFactor === sf
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  SF{sf}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Chirp Waveform & Transmission Simulator */}
        <div className="flex flex-col justify-center gap-6">
          {/* Interactive Spectrogram / Frequency Sweep Card */}
          <div className="card-soft p-8 rounded-3xl border border-border/80 reveal" style={d(3)}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <Activity size={20} className="text-primary" />
                <div>
                  <span className="slide-subtitle text-xl font-bold text-foreground block">
                    CSS Chirp Spectrogram (Frequency vs Time)
                  </span>
                  <span className="slide-chrome font-mono text-xs text-subtle">
                    Bandwidth: 125 kHz · Center: 868 / 915 MHz
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setChirpType((t) => (t === "up" ? "down" : "up"))}
                  className="slide-chrome font-mono text-xs px-3.5 py-1.5 rounded-xl bg-secondary border border-border/70 hover:bg-secondary/90 transition-colors font-medium text-foreground"
                >
                  Type: <strong className="text-primary uppercase">{chirpType}‑Chirp</strong>
                </button>

                <button
                  onClick={playAudioChirp}
                  className="flex items-center gap-1.5 slide-chrome font-mono text-xs px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-sm"
                  title="Play audio representation of the chirp"
                >
                  <Volume2 size={14} />
                  <span>Hear Chirp</span>
                </button>
              </div>
            </div>

            {/* Frequency Ramp SVG */}
            <div className="relative rounded-2xl bg-secondary/30 p-4 border border-border/50">
              <svg viewBox="-70 0 840 230" className="w-full h-[180px]">
                {/* Coordinate Grid */}
                <line x1="0" y1="200" x2="760" y2="200" stroke="var(--border)" strokeWidth="1.5" />
                <line x1="0" y1="10" x2="0" y2="200" stroke="var(--border)" strokeWidth="1.5" />
                <line x1="0" y1="105" x2="760" y2="105" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" className="opacity-40" />

                {/* Sweeping Sawtooth Chrirp */}
                <path
                  key={`${chirpType}-${spreadingFactor}`}
                  d={chirpSawtooth()}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  className="draw-path"
                />

                {/* Axis Labels */}
                <text x="-15" y="25" textAnchor="end" fontSize="13" fill="var(--muted-foreground)" fontFamily="var(--font-mono)">f_max (+62.5 kHz)</text>
                <text x="-15" y="110" textAnchor="end" fontSize="13" fill="var(--muted-foreground)" fontFamily="var(--font-mono)">f_center</text>
                <text x="-15" y="200" textAnchor="end" fontSize="13" fill="var(--muted-foreground)" fontFamily="var(--font-mono)">f_min (-62.5 kHz)</text>
                <text x="760" y="222" textAnchor="end" fontSize="13" fill="var(--muted-foreground)" fontFamily="var(--font-mono)">Time (Symbol Duration) →</text>
              </svg>

              {/* Time-domain RF Sine Wave */}
              <div className="mt-2 pt-2 border-t border-border/40">
                <span className="slide-chrome font-mono text-[11px] text-subtle block mb-1">
                  Time Domain Carrier Modulation:
                </span>
                <svg viewBox="0 0 760 100" className="w-full h-[70px]">
                  <path
                    key={`sine-${chirpType}`}
                    d={chirpSineWave()}
                    fill="none"
                    stroke="var(--foreground)"
                    strokeWidth="2"
                    className="reveal-fade opacity-85"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Device to Device Wave Transmission Simulator */}
          <div className="card-soft p-6 px-8 rounded-3xl border border-border/80 flex items-center justify-between gap-8 reveal" style={d(5)}>
            <div className="flex flex-col items-center gap-2">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary/80 border border-border/80">
                <span className="wave-ring absolute inset-0 rounded-2xl border-2 border-cyan-400" />
                <span className="h-6 w-6 rounded-full bg-cyan-400 shadow-[0_0_15px_#38bdf8]" />
              </div>
              <span className="slide-chrome font-mono text-xs font-semibold text-foreground">
                LoRa TX Node
              </span>
              <span className="slide-chrome font-mono text-[11px] text-subtle">
                +14 dBm (25 mW)
              </span>
            </div>

            {/* Over the Air Radio Waves */}
            <div className="relative h-[64px] flex-1 flex flex-col justify-center">
              <div className="relative h-[2px] w-full bg-border/60">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 opacity-60" />
              </div>

              {[0, 0.8, 1.6].map((delay) => (
                <div
                  key={delay}
                  className="packet absolute top-1/2 flex items-center justify-center"
                  style={{ animationDelay: `${delay}s` }}
                >
                  <span className="h-4 w-4 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8]" />
                  <span className="absolute -top-6 text-[10px] font-mono text-cyan-300 font-semibold whitespace-nowrap">
                    CSS Packet
                  </span>
                </div>
              ))}

              <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-subtle">
                <span>Free Air Space</span>
                <span className="text-emerald-400 font-semibold">10 km Rural Reach</span>
                <span>Obstacles & Rain</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary/80 border border-border/80">
                <span className="h-6 w-6 rounded-full bg-emerald-400 shadow-[0_0_15px_#10b981]" />
              </div>
              <span className="slide-chrome font-mono text-xs font-semibold text-foreground">
                LoRa RX Gateway
              </span>
              <span className="slide-chrome font-mono text-[11px] text-emerald-400 font-semibold">
                RSSI: -122 dBm
              </span>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
