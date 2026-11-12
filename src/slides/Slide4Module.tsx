import { useState } from "react";
import { SlideLayout, Question, d } from "@/components/deck/SlideLayout";

const pins = [
  { name: "VCC", role: "Power 3.3V", spi: false },
  { name: "GND", role: "Ground", spi: false },
  { name: "MOSI", role: "Master Out, Slave In", spi: true },
  { name: "MISO", role: "Master In, Slave Out", spi: true },
  { name: "SCK", role: "Serial Clock", spi: true },
  { name: "NSS", role: "Chip Select", spi: true },
];

export default function Slide4Module() {
  const [show, setShow] = useState(false);
  return (
    <SlideLayout number={4} label="Hardware">
      <div className="grid h-full grid-cols-[1fr_900px] gap-20">
        <div className="flex flex-col justify-center gap-7">
          <p className="slide-kicker reveal text-primary" style={d(0)}>Hardware</p>
          <h1 className="slide-title reveal" style={d(1)}>LoRa module<br />and connection.</h1>
          <div className="reveal flex gap-4" style={d(2)}>
            {["SX1278", "SX1276", "RFM95"].map((m) => (
              <span key={m} className="slide-chrome rounded-full bg-secondary px-6 py-3 font-mono font-medium">{m}</span>
            ))}
          </div>
          <p className="slide-body reveal text-muted-foreground" style={d(3)}>Antenna · RF transceiver · connection pins.</p>
          <p className="slide-body reveal text-muted-foreground" style={d(4)}>Works with <span className="font-semibold text-foreground">Arduino</span> and <span className="font-semibold text-foreground">ESP32</span> using <span className="font-semibold text-foreground">SPI</span>.</p>
          <Question delay={5}>Can you identify the SPI pins on the diagram?</Question>
          <button onClick={(e) => { e.stopPropagation(); setShow((s) => !s); }} className="slide-caption reveal self-start rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground transition-opacity hover:opacity-90" style={d(6)}>
            {show ? "Hide answer" : "Reveal SPI pins"}
          </button>
        </div>
        <div className="card-soft reveal flex items-center gap-14 p-14" style={d(2)}>
          <svg viewBox="0 0 320 420" className="w-[320px] shrink-0">
            <rect x="10" y="60" width="300" height="300" rx="18" fill="var(--secondary)" stroke="var(--border)" strokeWidth="3" />
            <rect x="80" y="100" width="190" height="190" rx="10" fill="var(--card)" stroke="var(--border)" strokeWidth="3" />
            <text x="175" y="190" textAnchor="middle" fontSize="30" fontWeight="700" fill="var(--foreground)">SX1278</text>
            <text x="175" y="225" textAnchor="middle" fontSize="18" fill="var(--muted-foreground)">RF Transceiver</text>
            <path d="M250 60 V10" stroke="var(--foreground)" strokeWidth="4" />
            <path d="M240 50 l20 -6 l-20 -6 l20 -6 l-20 -6 l20 -6" fill="none" stroke="var(--foreground)" strokeWidth="3" />
            {pins.map((p, i) => (
              <circle key={p.name} cx={40 + i * 48} cy="335" r="10" fill={show && p.spi ? "var(--primary)" : "var(--card)"} stroke="var(--foreground)" strokeWidth="3" style={{ transition: "fill 400ms" }} />
            ))}
            <text x="175" y="400" textAnchor="middle" fontSize="16" fill="var(--muted-foreground)">Pins</text>
          </svg>
          <div className="flex flex-1 flex-col gap-3">
            {pins.map((p) => (
              <div key={p.name} className={`flex items-center justify-between rounded-2xl px-6 py-4 transition-colors duration-500 ${show && p.spi ? "bg-accent" : "bg-secondary"}`}>
                <span className={`slide-caption font-mono font-semibold ${show && p.spi ? "text-accent-foreground" : ""}`}>{p.name}</span>
                <span className="slide-chrome text-muted-foreground">{p.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
