import { Sprout, Droplets, ParkingSquare, Leaf, Factory } from "lucide-react";
import { SlideLayout, Question, d } from "@/components/deck/SlideLayout";

const apps = [
  { icon: Sprout, label: "Smart agriculture & soil monitoring" },
  { icon: Droplets, label: "Water‑level monitoring" },
  { icon: ParkingSquare, label: "Smart parking" },
  { icon: Leaf, label: "Environmental monitoring" },
  { icon: Factory, label: "Industrial IoT" },
];
const limits = ["Low data rate", "Not for real‑time video or audio", "Regional frequency rules", "Environment affects signal"];

export default function Slide6Applications() {
  return (
    <SlideLayout number={6} label="Applications">
      <div className="flex h-full flex-col justify-between">
        <div>
          <p className="slide-kicker reveal text-primary" style={d(0)}>Real World</p>
          <h1 className="slide-title reveal mt-6" style={d(1)}>Applications and limitations.</h1>
        </div>
        <div className="grid grid-cols-5 gap-6">
          {apps.map(({ icon: Icon, label }, i) => (
            <div key={label} className="card-soft reveal flex h-[280px] flex-col justify-between p-8" style={d(2 + i)}>
              <span className="flex h-20 w-20 items-center justify-center rounded-[20px] bg-accent text-accent-foreground"><Icon size={40} strokeWidth={1.75} /></span>
              <p className="slide-caption font-semibold">{label}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-[1fr_1fr] gap-10">
          <div className="reveal rounded-[28px] bg-secondary p-8" style={d(7)}>
            <p className="slide-kicker text-muted-foreground">Limitations</p>
            <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3">
              {limits.map((l) => (<p key={l} className="slide-caption">— {l}</p>))}
            </div>
          </div>
          <Question delay={8}>Which technology would you choose to monitor soil moisture across a large farm?</Question>
        </div>
      </div>
    </SlideLayout>
  );
}
