import { Sprout, Droplets, ParkingSquare, Leaf, Factory } from "lucide-react";
import { SlideLayout, Question, d } from "@/components/deck/SlideLayout";

const apps = [
  { icon: Sprout,        label: "Smart agriculture & soil monitoring" },
  { icon: Droplets,      label: "Water‑level monitoring" },
  { icon: ParkingSquare, label: "Smart parking" },
  { icon: Leaf,          label: "Environmental monitoring" },
  { icon: Factory,       label: "Industrial IoT" },
];

const limits = [
  "Low data rate",
  "Not for real‑time video or audio",
  "Regional frequency rules",
  "Environment affects signal",
];

export default function Slide6Applications() {
  return (
    <SlideLayout number={6} label="Applications">
      <div className="flex h-full flex-col justify-between">
        <div>
          <p className="slide-label reveal" style={d(0)}>Real World</p>
          <h1 className="slide-title reveal mt-4" style={d(1)}>Applications<br />and limitations.</h1>
        </div>

        {/* App cards */}
        <div className="grid grid-cols-5 gap-5">
          {apps.map(({ icon: Icon, label }, i) => (
            <div key={label} className="card-clean reveal flex h-[240px] flex-col justify-between p-7" style={d(2 + i)}>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#2563eb]">
                <Icon size={28} strokeWidth={1.75} />
              </span>
              <p className="slide-caption font-semibold text-gray-800">{label}</p>
            </div>
          ))}
        </div>

        {/* Limits + Question */}
        <div className="grid grid-cols-2 gap-8">
          <div className="reveal rounded-2xl bg-gray-50 p-7" style={d(7)}>
            <p className="text-[13px] font-semibold uppercase tracking-wider text-gray-400">Limitations</p>
            <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2.5">
              {limits.map((l) => (
                <p key={l} className="slide-caption text-gray-600">— {l}</p>
              ))}
            </div>
          </div>
          <Question delay={8}>
            Which technology would you choose to monitor soil moisture across a large farm?
          </Question>
        </div>
      </div>
    </SlideLayout>
  );
}
