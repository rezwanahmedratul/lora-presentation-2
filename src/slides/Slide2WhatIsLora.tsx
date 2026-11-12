import lora from "@/assets/lora-module.jpg";
import { SlideLayout, Question, d } from "@/components/deck/SlideLayout";

const facts = [
  ["Long Range", "LoRa stands for Long Range."],
  ["Wireless", "Radio communication technology."],
  ["Low Power", "Kilometers on tiny batteries."],
  ["IoT", "Built for the Internet of Things."],
];

export default function Slide2WhatIsLora() {
  return (
    <SlideLayout number={2} label="What is LoRa?">
      <div className="grid h-full grid-cols-[1fr_700px] gap-20">
        <div className="flex flex-col justify-center gap-8">
          <p className="slide-kicker reveal text-primary" style={d(0)}>Introduction</p>
          <h1 className="slide-title reveal" style={d(1)}>What is LoRa?</h1>
          <div className="grid grid-cols-2 gap-6">
            {facts.map(([t, s], i) => (
              <div key={t} className="card-soft reveal px-8 py-6" style={d(2 + i)}>
                <p className="slide-subtitle text-primary">{t}</p>
                <p className="slide-caption mt-1 text-muted-foreground">{s}</p>
              </div>
            ))}
          </div>
          <p className="slide-body reveal text-muted-foreground" style={d(6)}>A <span className="font-semibold text-foreground">LoRa module</span> is the hardware that enables it.</p>
          <Question delay={7}>For a remote sensor, what matters more: high speed or long battery life?</Question>
        </div>
        <div className="reveal-fade flex items-center" style={d(2)}>
          <div className="overflow-hidden rounded-[36px] bg-secondary">
            <img src={lora} alt="LoRa SX1278 module with spring antenna" width={1200} height={1200} className="h-[680px] w-[680px] object-cover" />
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
