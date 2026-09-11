"use client";

const STEPS = [
  {
    stages: ["auth"],
    label: "Sign in with a number",
    body: "A mobile number and a four digit code. Nothing else to remember, which matters when the phone belongs to a parent.",
  },
  {
    stages: ["class", "group"],
    label: "Pick the class, and the group",
    body: "Six through twelve. Classes 11 and 12 ask for the group next, so a commerce student never scrolls past physics.",
  },
  {
    stages: ["subject"],
    label: "Pick the subject",
    body: "Only the subjects that class actually studies, named the way the school timetable names them.",
  },
  {
    stages: ["chapter"],
    label: "Open the chapter",
    body: "The chapter list drops down for that subject, numbered exactly as the textbook numbers it.",
  },
  {
    stages: ["concept"],
    label: "Choose the concept",
    body: "Each chapter splits into 1.1, 1.2 and so on, so a student lands on one idea instead of forty pages.",
  },
  {
    stages: ["detail"],
    label: "Study and watch",
    body: "What it means, the rule worth remembering, the worked example, and a button that plays the whole thing back.",
  },
];

export default function FlowPath({ active }) {
  return (
    <ol className="space-y-2">
      {STEPS.map((s, i) => {
        const isActive = s.stages.includes(active);
        return (
          <li
            key={s.label}
            className={`flex gap-5 rounded-2xl px-5 py-4 transition-all duration-300 ${
              isActive ? "bg-white shadow-card" : "bg-transparent"
            }`}
          >
            <span
              className={`font-display text-[26px] font-extrabold leading-none transition-colors ${
                isActive ? "text-magentaSoft" : "text-mistDeep"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3
                className={`font-display text-[16px] font-bold leading-tight transition-colors ${
                  isActive ? "text-brand" : "text-ink"
                }`}
              >
                {s.label}
              </h3>
              <p className="mt-1 max-w-[46ch] text-[14px] leading-relaxed text-inkSoft">{s.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
