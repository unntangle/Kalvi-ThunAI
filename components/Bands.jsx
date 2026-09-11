const TILES = [
  "Samacheer Kalvi",
  "Classes 6 to 10",
  "Classes 11 and 12",
  "Biology group",
  "Computer science group",
  "Commerce group",
  "Tamil medium",
  "English medium",
  "Public exam years",
  "Low bandwidth",
  "Dark mode",
  "Android and web",
];

export function AlignedGrid() {
  return (
    <div className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-6">
      {TILES.map((t) => (
        <div
          key={t}
          className="grid h-[86px] place-items-center border-b border-r border-line px-3 text-center font-display text-[13px] font-semibold text-inkSoft transition hover:bg-mist hover:text-brand"
        >
          {t}
        </div>
      ))}
    </div>
  );
}

const PROMISES = [
  {
    title: "State board aligned",
    body: "Chapters numbered as the textbook numbers them.",
  },
  {
    title: "Two languages",
    body: "Tamil and English narration over identical visuals.",
  },
  {
    title: "Light on data",
    body: "Examples drawn on device, not streamed as video.",
  },
  {
    title: "One idea at a time",
    body: "Every example covers its concept and nothing else.",
  },
];

export function TrustStrip() {
  return (
    <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
      {PROMISES.map((p) => (
        <div key={p.title} className="bg-white px-6 py-8 text-center">
          <h3 className="font-display text-[15px] font-bold text-ink">{p.title}</h3>
          <p className="mx-auto mt-2 max-w-[26ch] text-[13px] leading-relaxed text-inkSoft">{p.body}</p>
        </div>
      ))}
    </div>
  );
}
