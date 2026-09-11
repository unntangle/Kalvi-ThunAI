const POSTS = [
  {
    title: "Why one concept at a time beats one chapter at a time",
    body: "A student who opens a book at nine in the evening rarely wants the whole chapter. They want the one idea that stopped them. The app is built around that unit.",
    tone: "light",
    band: "linear-gradient(112deg,#3452D6,#17C3D4)",
  },
  {
    title: "The AV button, and what it changes",
    body: "Reading a solved sum shows the answer. Watching it build, one step at a time, shows the method. That is the difference between copying and sitting an exam.",
    tone: "brand",
  },
  {
    title: "Same visuals, two languages of narration",
    body: "Tamil medium and English medium students see identical steps on screen. Only the voice changes, so a class can be taught from one set of examples.",
    tone: "light",
    band: "linear-gradient(112deg,#1C8BE6,#17C3D4)",
  },
  {
    title: "Built for a two bar signal",
    body: "Examples are drawn on the device rather than streamed as video, so a worked example still loads on a weak connection in a smaller town.",
    tone: "ink",
  },
  {
    title: "Designed to be read at low brightness",
    body: "Dark text on white, colour confined to surfaces rather than type, and nothing important carried by colour alone. It stays legible on a scratched screen at 30 percent brightness.",
    tone: "light",
    band: "linear-gradient(112deg,#2246C7,#1C8BE6)",
  },
  {
    title: "Eleven and twelve without the clutter",
    body: "Higher secondary students pick a group once, and after that only see their own six subjects. A commerce student never scrolls past physics to reach accountancy.",
    tone: "accent",
  },
];

const TONES = {
  brand: "grad-brand text-white",
  ink: "bg-ink text-white",
  accent: "grad-accent text-white",
};

export default function Insights() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {POSTS.map((p) => {
        const solid = p.tone !== "light";
        const onAccent = false;
        return (
          <article
            key={p.title}
            className={`flex flex-col overflow-hidden rounded-2xl transition hover:-translate-y-1 ${
              solid ? TONES[p.tone] : "border border-line bg-white shadow-raised"
            }`}
          >
            {p.band ? <div className="h-24 w-full" style={{ backgroundImage: p.band }} /> : null}
            <div className="flex flex-1 flex-col p-6">
              <h3
                className={`font-display text-[17px] font-bold leading-snug ${
                  solid && !onAccent ? "text-white" : "text-ink"
                }`}
              >
                {p.title}
              </h3>
              <p
                className={`mt-2.5 text-[14px] leading-relaxed ${
                  onAccent ? "text-ink/75" : solid ? "text-white/80" : "text-inkSoft"
                }`}
              >
                {p.body}
              </p>
              <span
                className={`mt-5 inline-block font-display text-[11px] font-bold uppercase tracking-[0.12em] ${
                  onAccent ? "text-ink/70" : solid ? "text-white/70" : "text-brand"
                }`}
              >
                Read more
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
