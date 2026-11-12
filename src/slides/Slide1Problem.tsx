import farm from "@/assets/farm.jpg";
import { SlideLayout, Question, d } from "@/components/deck/SlideLayout";

export default function Slide1Problem() {
  const points = ["Imagine monitoring a farm, forest, or remote area.", "Wi‑Fi has limited range.", "Mobile networks can be expensive or unavailable."];
  return (
    <SlideLayout number={1} label="The Problem">
      <div className="grid h-full grid-cols-[1fr_820px] gap-20">
        <div className="flex flex-col justify-center gap-10">
          <p className="slide-kicker reveal text-primary" style={d(0)}>The Problem</p>
          <h1 className="slide-title reveal" style={d(1)}>Connecting things,<br />wirelessly.</h1>
          <ul className="flex flex-col gap-4">
            {points.map((p, i) => (
              <li key={p} className="slide-body reveal text-muted-foreground" style={d(2 + i)}>{p}</li>
            ))}
          </ul>
          <p className="slide-body-lg reveal font-medium" style={d(5)}>What if devices could talk over several kilometers — using very little power?</p>
          <Question delay={7}>How would you send data from a sensor 2 km away without Wi‑Fi?</Question>
        </div>
        <div className="reveal-fade relative overflow-hidden rounded-[36px]" style={d(1)}>
          <img src={farm} alt="Farm field with wireless soil sensors" width={1600} height={1200} className="h-full w-full object-cover" />
          <div className="absolute bottom-8 left-8 rounded-full bg-card/90 px-6 py-3 backdrop-blur">
            <span className="slide-chrome font-medium">Sensors · 2 km apart</span>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
