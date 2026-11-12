import { useState, useEffect } from "react";
import { SlideLayout, d } from "@/components/deck/SlideLayout";
import { CheckCircle2, XCircle, Award, Sparkles, Radio, HelpCircle, RotateCcw } from "lucide-react";

interface QuizItem {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const quizData: QuizItem[] = [
  {
    question: "What does LoRa fundamentally prioritize over raw data bandwidth?",
    options: ["Low latency & video streaming", "Extreme range & 10-year battery life", "Gigabit throughput"],
    correct: 1,
    explanation: "LoRa uses Chirp Spread Spectrum to maximize link budget and range rather than data rate.",
  },
  {
    question: "Which serial hardware interface connects an SX1278 module to an MCU?",
    options: ["I2C (2-Wire)", "SPI (4-Wire: MOSI, MISO, SCK, NSS)", "CAN Bus"],
    correct: 1,
    explanation: "The SX1278 transceiver uses high-speed SPI bus (up to 10 MHz) plus DIO0 interrupt line.",
  },
  {
    question: "Can a LoRa device stream live high-definition security camera video?",
    options: ["Yes, on 915 MHz", "Only with high-gain antennas", "No, max throughput is ~0.3 to 50 kbps"],
    correct: 2,
    explanation: "LoRa is engineered exclusively for small periodic telemetry packets (sensors, alarms, GPS).",
  },
];

export default function Slide7Conclusion() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [packetCount, setPacketCount] = useState(1);

  // Live packet pulse in background
  useEffect(() => {
    const timer = setInterval(() => setPacketCount((c) => c + 1), 2400);
    return () => clearInterval(timer);
  }, []);

  const selectOption = (qIdx: number, optIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = Object.entries(selectedAnswers).filter(
    ([qIdx, optIdx]) => quizData[Number(qIdx)]?.correct === optIdx
  ).length;

  return (
    <SlideLayout number={7} label="Recap & Quiz">
      <div className="grid h-full grid-cols-[1fr_1fr] gap-16 items-center">
        {/* Left Column: Core Takeaways & Live Node Recap */}
        <div className="flex flex-col justify-center gap-7">
          <div className="flex items-center gap-3 reveal" style={d(0)}>
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            <p className="slide-kicker text-primary">07 // Final Keynote Recap</p>
          </div>

          <h1 className="slide-title reveal" style={d(1)}>
            Long range. <br />
            <span className="text-gradient-cyan">Low power.</span>
          </h1>

          <div className="flex flex-col gap-4 reveal" style={d(2)}>
            {[
              {
                title: "10+ Kilometers Coverage",
                desc: "Chirp Spread Spectrum pierces through terrain, foliage, and concrete.",
              },
              {
                title: "Decade-Long Battery Autonomy",
                desc: "Microampere deep sleep currents enable 5 to 10 years on small batteries.",
              },
              {
                title: "Zero Carrier Fees",
                desc: "Operates in license-free sub-gigahertz ISM frequency spectrum worldwide.",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-4 rounded-2xl bg-secondary/40 border border-border/60"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary font-mono text-xs font-bold">
                  0{i + 1}
                </div>
                <div>
                  <span className="slide-body font-bold text-base text-foreground block">
                    {item.title}
                  </span>
                  <p className="slide-caption text-xs text-muted-foreground mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Live Link Heartbeat Box */}
          <div className="card-soft p-5 px-6 rounded-2xl border border-border/80 flex items-center justify-between gap-6 reveal" style={d(4)}>
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <Radio size={20} />
                <span className="wave-ring absolute inset-0 rounded-xl border border-primary" />
              </div>
              <div>
                <span className="slide-chrome font-mono font-bold text-xs text-foreground block">
                  Sensor Node #01
                </span>
                <span className="slide-chrome font-mono text-[11px] text-cyan-400">
                  Transmitting packet #{packetCount}
                </span>
              </div>
            </div>

            <div className="relative h-2 w-28 rounded-full bg-border/60 overflow-hidden">
              <div className="h-full bg-primary rounded-full animate-pulse" />
            </div>

            <div className="text-right">
              <span className="slide-chrome font-mono font-bold text-xs text-emerald-400 block">
                Gateway ACK ✓
              </span>
              <span className="slide-chrome font-mono text-[11px] text-subtle">
                RSSI: -114 dBm · SNR: +9dB
              </span>
            </div>
          </div>

          <div className="reveal flex items-center gap-4 text-subtle font-mono text-xs" style={d(5)}>
            <span className="flex items-center gap-1.5 text-foreground">
              <Sparkles size={16} className="text-cyan-400" />
              <span>Ready to build long-range IoT projects!</span>
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Quiz Showcase */}
        <div className="card-soft p-8 rounded-3xl border border-border/80 flex flex-col justify-between gap-5 reveal" style={d(2)}>
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div className="flex items-center gap-2.5">
              <HelpCircle size={20} className="text-primary" />
              <div>
                <span className="slide-subtitle text-lg font-bold text-foreground block">
                  Interactive Knowledge Check
                </span>
                <span className="slide-chrome font-mono text-xs text-subtle">
                  Click the correct answer for instant feedback
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="slide-chrome font-mono text-xs px-3 py-1 rounded-full bg-secondary border border-border/60 font-semibold text-foreground">
                Score: {correctCount} / {quizData.length}
              </span>
              {answeredCount > 0 && (
                <button
                  onClick={resetQuiz}
                  className="p-1.5 rounded-lg text-subtle hover:text-foreground hover:bg-secondary transition-colors"
                  title="Reset quiz"
                >
                  <RotateCcw size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Questions List */}
          <div className="flex flex-col gap-4">
            {quizData.map((item, qIdx) => {
              const selectedOpt = selectedAnswers[qIdx];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === item.correct;

              return (
                <div
                  key={item.question}
                  className="rounded-2xl bg-secondary/30 p-4 border border-border/50 flex flex-col gap-2.5"
                >
                  <span className="slide-caption font-semibold text-xs text-foreground block">
                    {qIdx + 1}. {item.question}
                  </span>

                  <div className="grid grid-cols-1 gap-1.5">
                    {item.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedOpt === optIdx;
                      const isOptionCorrect = optIdx === item.correct;

                      let btnStyle = "bg-secondary/60 hover:bg-secondary border-border/50 text-muted-foreground";
                      if (isAnswered) {
                        if (isOptionCorrect) {
                          btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold shadow-sm";
                        } else if (isOptionSelected) {
                          btnStyle = "bg-red-500/20 border-red-500 text-red-300 font-semibold";
                        } else {
                          btnStyle = "opacity-40 bg-secondary/30 border-transparent";
                        }
                      }

                      return (
                        <button
                          key={opt}
                          onClick={() => selectOption(qIdx, optIdx)}
                          className={`flex items-center justify-between p-2 px-3 rounded-xl border text-left text-xs transition-all ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && isOptionCorrect && <CheckCircle2 size={14} className="text-emerald-400" />}
                          {isAnswered && isOptionSelected && !isOptionCorrect && <XCircle size={14} className="text-red-400" />}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <p className={`text-[11px] font-mono mt-1 ${isCorrect ? "text-emerald-400" : "text-amber-400"}`}>
                      {item.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Keynote Closing Toast */}
          <div className="rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-4 border border-primary/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award size={22} className="text-cyan-400" />
              <div>
                <span className="slide-chrome font-bold text-sm text-foreground block">
                  Thank You!
                </span>
                <span className="slide-chrome text-xs text-subtle">
                  Questions & Open Discussion · Long Range IoT
                </span>
              </div>
            </div>
            <span className="slide-chrome font-mono text-xs px-3 py-1 rounded-full bg-primary text-primary-foreground font-semibold">
              LoRa Mastered
            </span>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
