import { useState } from "react";
import { SlideLayout, Question, d } from "@/components/deck/SlideLayout";

const pins = [
  { name: "VCC",  role: "Power 3.3 V",         spi: false },
  { name: "GND",  role: "Ground",               spi: false },
  { name: "MOSI", role: "Master Out, Slave In", spi: true },
  { name: "MISO", role: "Master In, Slave Out", spi: true },
  { name: "SCK",  role: "Serial Clock",         spi: true },
  { name: "NSS",  role: "Chip Select",          spi: true },
];

export default function Slide4Module() {
  const [show, setShow] = useState(false);

  return (
    <SlideLayout number={4} label="Hardware">
      <div className="grid h-full grid-cols-[1fr_860px] gap-20 items-center">
        <div className="flex flex-col justify-center gap-6">
          <p className="slide-label reveal" style={d(0)}>Hardware</p>

          <h1 className="slide-title reveal" style={d(1)}>
            LoRa module<br />and connection.
          </h1>

          <div className="reveal flex gap-3" style={d(2)}>
            {["SX1278", "SX1276", "RFM95"].map((m) => (
              <span key={m} className="rounded-full bg-gray-100 px-5 py-2 font-mono text-[14px] font-medium text-gray-700">{m}</span>
            ))}
          </div>

          <p className="slide-body reveal text-gray-500" style={d(3)}>
            Antenna · RF transceiver · connection pins.
          </p>

          <p className="slide-body reveal text-gray-500" style={d(4)}>
            Works with <span className="font-semibold text-gray-800">Arduino</span> and <span className="font-semibold text-gray-800">ESP32</span> using <span className="font-semibold text-gray-800">SPI</span>.
          </p>

          <Question delay={5}>Can you identify the SPI pins on the diagram?</Question>

          <button
            onClick={(e) => { e.stopPropagation(); setShow((s) => !s); }}
            className="reveal self-start rounded-full bg-[#2563eb] px-7 py-3 text-[16px] font-semibold text-white transition-opacity hover:opacity-90"
            style={d(6)}
          >
            {show ? "Hide answer" : "Reveal SPI pins"}
          </button>
        </div>

        <div className="card-clean reveal flex items-center gap-12 p-12" style={d(2)}>
          {/* SVG Module diagram */}
          <svg viewBox="0 0 300 400" className="w-[280px] shrink-0">
            <rect x="10" y="60" width="280" height="280" rx="16" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="2" />
            <rect x="70" y="95" width="180" height="180" rx="10" fill="white" stroke="#e5e7eb" strokeWidth="2" />
            <text x="160" y="180" textAnchor="middle" fontSize="26" fontWeight="700" fill="#1a1a2e">SX1278</text>
            <text x="160" y="210" textAnchor="middle" fontSize="15" fill="#9ca3af">RF Transceiver</text>
            {/* Antenna */}
            <path d="M230 60 V10" stroke="#1a1a2e" strokeWidth="3" />
            <path d="M222 48 l16 -6 l-16 -6 l16 -6 l-16 -6 l16 -6" fill="none" stroke="#1a1a2e" strokeWidth="2" />
            {/* Pins */}
            {pins.map((p, i) => (
              <circle key={p.name} cx={35 + i * 46} cy="320" r="9" fill={show && p.spi ? "#2563eb" : "white"} stroke={show && p.spi ? "#2563eb" : "#d1d5db"} strokeWidth="2.5" style={{ transition: "fill 400ms, stroke 400ms" }} />
            ))}
            <text x="150" y="380" textAnchor="middle" fontSize="13" fill="#9ca3af">Header Pins</text>
          </svg>

          {/* Pin list */}
          <div className="flex flex-1 flex-col gap-2.5">
            {pins.map((p) => (
              <div
                key={p.name}
                className={`flex items-center justify-between rounded-xl px-5 py-3.5 transition-colors duration-400 ${
                  show && p.spi ? "bg-blue-50 border border-blue-200" : "bg-gray-50 border border-gray-100"
                }`}
              >
                <span className={`font-mono text-[16px] font-semibold ${show && p.spi ? "text-[#2563eb]" : "text-gray-800"}`}>{p.name}</span>
                <span className="text-[14px] text-gray-500">{p.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
