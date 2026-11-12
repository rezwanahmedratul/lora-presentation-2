import lora from "@/assets/lora-module.jpg";
import { SlideLayout, Question, d } from "@/components/deck/SlideLayout";

const facts = [
  { title: "Long Range", desc: "LoRa stands for Long Range — covers up to 15 km." },
  { title: "Wireless", desc: "Uses radio frequency communication." },
  { title: "Low Power", desc: "Runs for years on small batteries." },
  { title: "IoT Native", desc: "Designed for the Internet of Things." },
];

export default function Slide2WhatIsLora() {
  return (
    <SlideLayout number={2} label="What is LoRa?">
      <div className="grid h-full grid-cols-[1fr_640px] gap-20 items-center">
        <div className="flex flex-col justify-center gap-7">
          <p className="slide-label reveal" style={d(0)}>Introduction</p>

          <h1 className="slide-title reveal" style={d(1)}>What is LoRa?</h1>

          <div className="grid grid-cols-2 gap-4">
            {facts.map(({ title, desc }, i) => (
              <div key={title} className="card-clean reveal p-6" style={d(2 + i)}>
                <p className="slide-subtitle text-[#2563eb]">{title}</p>
                <p className="slide-caption mt-1.5 text-gray-500">{desc}</p>
              </div>
            ))}
          </div>

          <p className="slide-body reveal text-gray-500" style={d(6)}>
            A <span className="font-semibold text-gray-800">LoRa module</span> is the small hardware chip that enables this communication.
          </p>

          <Question delay={7}>
            For a remote sensor, what matters more — high speed or long battery life?
          </Question>
        </div>

        <div className="reveal-fade flex items-center" style={d(2)}>
          <div className="overflow-hidden rounded-3xl bg-gray-50 border border-gray-100">
            <img src={lora} alt="LoRa SX1278 module" className="h-[620px] w-[620px] object-cover" />
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
