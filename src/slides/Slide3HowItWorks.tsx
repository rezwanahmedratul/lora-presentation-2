import { SlideLayout, d } from "@/components/deck/SlideLayout";

function chirpPath() {
  // sawtooth of rising frequency: each chirp ramps from low to high
  const pts: string[] = [];
  const W = 760, H = 220, n = 3;
  for (let c = 0; c < n; c++) {
    const x0 = (c * W) / n;
    pts.push(`M ${x0} ${H}`);
    pts.push(`L ${x0 + W / n - 8} 20`);
  }
  return pts.join(" ");
}

function chirpWave() {
  let p = "M 0 60";
  for (let x = 0; x <= 760; x += 2) {
    const t = (x % 253) / 253;
    const phase = 2 * Math.PI * (2 * t + 9 * t * t);
    p += ` L ${x} ${60 - 45 * Math.sin(phase)}`;
  }
  return p;
}

export default function Slide3HowItWorks() {
  const points = [
    ["Radio Frequency", "Information travels as radio waves."],
    ["Chirp Spread Spectrum", "Signals sweep through frequencies — called chirps."],
    ["Robust", "Receivers detect chirps even when signals are very weak."],
  ];
  return (
    <SlideLayout number={3} label="How it works">
      <div className="grid h-full grid-cols-[640px_1fr] gap-24">
        <div className="flex flex-col justify-center gap-10">
          <p className="slide-kicker reveal text-primary" style={d(0)}>Working Principle</p>
          <h1 className="slide-title reveal" style={d(1)}>How does LoRa work?</h1>
          {points.map(([t, s], i) => (
            <div key={t} className="reveal border-l-[3px] border-primary pl-8" style={d(2 + i)}>
              <p className="slide-body font-semibold">{t}</p>
              <p className="slide-caption mt-2 text-muted-foreground">{s}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center gap-10">
          <div className="card-soft reveal px-10 py-8" style={d(3)}>
            <p className="slide-caption mb-6 font-semibold">CSS chirp — frequency rises over time</p>
            <svg viewBox="-80 -10 860 300" className="w-full">
              <line x1="0" y1="230" x2="770" y2="230" stroke="var(--border)" strokeWidth="2" />
              <line x1="0" y1="0" x2="0" y2="230" stroke="var(--border)" strokeWidth="2" />
              <path d={chirpPath()} fill="none" stroke="var(--primary)" strokeWidth="5" strokeLinecap="round" className="draw-path" />
              <text x="-20" y="20" textAnchor="end" fontSize="20" fill="var(--muted-foreground)">High</text>
              <text x="-20" y="230" textAnchor="end" fontSize="20" fill="var(--muted-foreground)">Low</text>
              <text x="770" y="270" textAnchor="end" fontSize="20" fill="var(--muted-foreground)">Time →</text>
              <text x="-60" y="125" fontSize="20" fill="var(--muted-foreground)" transform="rotate(-90 -60 125)" textAnchor="middle">Frequency</text>
            </svg>
            <svg viewBox="0 0 760 120" className="mt-2 h-[90px] w-full">
              <path d={chirpWave()} fill="none" stroke="var(--foreground)" strokeWidth="2" className="reveal-fade" />
            </svg>
          </div>
          <div className="card-soft reveal flex items-center gap-8 px-10 py-6" style={d(5)}>
            <Device label="Transmitter" />
            <div className="relative h-[60px] flex-1">
              <div className="absolute top-1/2 h-[2px] w-full -translate-y-1/2 bg-border" />
              {[0, 0.85, 1.7].map((delay) => (
                <span key={delay} className="packet absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" style={{ animationDelay: `${delay}s` }} />
              ))}
            </div>
            <Device label="Receiver" />
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}

function Device({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative flex h-24 w-24 items-center justify-center rounded-[22px] bg-secondary">
        <span className="wave-ring absolute inset-0 rounded-[22px] border-2 border-primary" />
        <span className="h-8 w-8 rounded-full bg-primary" />
      </div>
      <span className="slide-chrome font-medium">{label}</span>
    </div>
  );
}
