import { SlideLayout, d } from "@/components/deck/SlideLayout";

function chirpPath() {
  const pts: string[] = [];
  const W = 700, H = 200, n = 3;
  for (let c = 0; c < n; c++) {
    const x0 = (c * W) / n;
    pts.push(`M ${x0} ${H}`);
    pts.push(`L ${x0 + W / n - 8} 20`);
  }
  return pts.join(" ");
}

function chirpWave() {
  let p = "M 0 55";
  for (let x = 0; x <= 700; x += 2) {
    const t = (x % 233) / 233;
    const phase = 2 * Math.PI * (2 * t + 8 * t * t);
    p += ` L ${x} ${55 - 40 * Math.sin(phase)}`;
  }
  return p;
}

export default function Slide3HowItWorks() {
  const principles = [
    { title: "Radio Frequency", desc: "Information travels as radio waves through the air." },
    { title: "Chirp Spread Spectrum", desc: "Signals sweep through frequencies — these sweeps are called chirps." },
    { title: "Robust Reception", desc: "Receivers can detect chirps even when signals are extremely weak." },
  ];

  return (
    <SlideLayout number={3} label="How it works">
      <div className="grid h-full grid-cols-[580px_1fr] gap-20 items-center">
        <div className="flex flex-col justify-center gap-8">
          <p className="slide-label reveal" style={d(0)}>Working Principle</p>

          <h1 className="slide-title reveal" style={d(1)}>How does<br />LoRa work?</h1>

          {principles.map(({ title, desc }, i) => (
            <div key={title} className="reveal border-l-[3px] border-[#2563eb] pl-6" style={d(2 + i)}>
              <p className="slide-body font-semibold text-gray-800">{title}</p>
              <p className="slide-caption mt-1 text-gray-500">{desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center gap-8">
          {/* Chirp diagram */}
          <div className="card-clean reveal p-8" style={d(3)}>
            <p className="slide-caption mb-5 font-semibold text-gray-700">Chirp — frequency rises over time</p>
            <svg viewBox="-70 -10 790 280" className="w-full">
              <line x1="0" y1="220" x2="710" y2="220" stroke="#e5e7eb" strokeWidth="1.5" />
              <line x1="0" y1="0" x2="0" y2="220" stroke="#e5e7eb" strokeWidth="1.5" />
              <path d={chirpPath()} fill="none" stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round" className="draw-path" />
              <text x="-14" y="20" textAnchor="end" fontSize="14" fill="#9ca3af">High</text>
              <text x="-14" y="220" textAnchor="end" fontSize="14" fill="#9ca3af">Low</text>
              <text x="710" y="252" textAnchor="end" fontSize="14" fill="#9ca3af">Time →</text>
              <text x="-50" y="120" fontSize="14" fill="#9ca3af" transform="rotate(-90 -50 120)" textAnchor="middle">Frequency</text>
            </svg>
            <svg viewBox="0 0 700 110" className="mt-2 h-[80px] w-full">
              <path d={chirpWave()} fill="none" stroke="#1a1a2e" strokeWidth="1.5" className="reveal-fade" />
            </svg>
          </div>

          {/* Transmitter → Receiver */}
          <div className="card-clean reveal flex items-center gap-6 px-8 py-5" style={d(5)}>
            <Device label="Transmitter" />
            <div className="relative h-[50px] flex-1">
              <div className="absolute top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-gray-200" />
              {[0, 0.9, 1.8].map((delay) => (
                <span key={delay} className="packet absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563eb]" style={{ animationDelay: `${delay}s` }} />
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
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 border border-gray-200">
        <span className="wave-ring absolute inset-0 rounded-2xl border-2 border-blue-300" />
        <span className="h-5 w-5 rounded-full bg-[#2563eb]" />
      </div>
      <span className="text-[14px] font-medium text-gray-600">{label}</span>
    </div>
  );
}
