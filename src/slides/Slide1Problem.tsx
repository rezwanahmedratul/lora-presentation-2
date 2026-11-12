import farm from "@/assets/farm.jpg";
import { SlideLayout, Question, d } from "@/components/deck/SlideLayout";

export default function Slide1Problem() {
  const points = [
    "Imagine monitoring a farm, forest, or remote area.",
    "Wi‑Fi has limited range — about 100 meters.",
    "Mobile networks can be expensive or unavailable.",
  ];

  return (
    <SlideLayout number={1} label="The Problem">
      <div className="grid h-full grid-cols-[1fr_780px] gap-20 items-center">
        <div className="flex flex-col justify-center gap-8">
          <p className="slide-label reveal" style={d(0)}>The Problem</p>

          <h1 className="slide-title reveal" style={d(1)}>
            Connecting things,<br />wirelessly.
          </h1>

          <ul className="flex flex-col gap-3">
            {points.map((p, i) => (
              <li key={p} className="slide-body reveal text-gray-500" style={d(2 + i)}>
                {p}
              </li>
            ))}
          </ul>

          <p className="slide-body-lg reveal font-medium text-gray-800" style={d(5)}>
            What if devices could talk over several kilometers — using very little power?
          </p>

          <Question delay={6}>
            How would you send data from a sensor 2 km away without Wi‑Fi?
          </Question>
        </div>

        <div className="reveal-fade relative h-full overflow-hidden rounded-3xl" style={d(1)}>
          <img
            src={farm}
            alt="Farm field with wireless soil sensors"
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-6 left-6 rounded-full bg-white/90 px-5 py-2.5 backdrop-blur-sm shadow-sm">
            <span className="text-[14px] font-medium text-gray-700">Sensors · 2 km apart</span>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
