"use client";

import { useRef } from "react";
import { SUBJECTS, CLASSES, getChapters } from "@/data/curriculum";

const GLYPH = {
  tamil: "த",
  english: "A",
  maths: "π",
  science: "⚗",
  social: "⌘",
  physics: "Ω",
  chemistry: "⚛",
  biology: "✿",
  compsci: "{ }",
  accountancy: "₹",
  commerce: "⌂",
  economics: "%",
  busmaths: "Σ",
};

const BLURB = {
  tamil: "இலக்கணம் and செய்யுள் broken into the rules a student is actually asked in the exam.",
  english: "Grammar, comprehension and writing, each concept with a pattern you can copy.",
  maths: "Every worked sum plays back step by step, so the method is visible and not just the answer.",
  science: "Processes and laws shown as a sequence, because a cycle read as a paragraph rarely sticks.",
  social: "History, geography and civics tied to the map or the timeline they belong on.",
  physics: "Derivations shown as steps, with the substitution made on screen rather than skipped.",
  chemistry: "Structure, bonding and kinetics, each with the reasoning that leads to the answer.",
  biology: "Processes drawn as stages, so a cycle can be replayed the night before the exam.",
  compsci: "Algorithms before syntax, then the code, then what the code costs to run.",
  accountancy: "Every entry worked twice, so the debit and the credit are both visible.",
  commerce: "Principles taken back to the decision a real business would be making.",
  economics: "Definitions plus the one worked example that makes the definition usable.",
  busmaths: "Applied maths for commerce, worked in the order an exam expects to see it.",
};

export default function SubjectCarousel() {
  const track = useRef(null);

  function scrollBy(dir) {
    track.current?.scrollBy({ left: dir * 330, behavior: "smooth" });
  }

  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-6">
        <p className="max-w-[52ch] text-[15px] leading-relaxed text-inkSoft">
          Five core subjects from class 6 to 10, then the higher secondary groups add their own.
          Colour is used only on the chip, never on the screen behind it.
        </p>
        <div className="flex shrink-0 gap-2">
          <button onClick={() => scrollBy(-1)} className="round-btn" aria-label="Previous subjects">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button onClick={() => scrollBy(1)} className="round-btn" aria-label="Next subjects">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div ref={track} className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2">
        {SUBJECTS.map((s) => {
          const chapters = CLASSES.reduce((n, c) => n + getChapters(c.id, s.id).length, 0);
          const classList = CLASSES.filter((c) => getChapters(c.id, s.id).length > 0).map((c) => c.id);
          return (
            <article
              key={s.id}
              className="relative w-[300px] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-white"
            >
              <div className="relative h-[190px]" style={{ backgroundColor: s.color }}>
                <span
                  className="absolute right-5 top-3 font-tamil text-[110px] font-bold leading-none text-white/15"
                  aria-hidden
                >
                  {GLYPH[s.id]}
                </span>
                <span className="absolute left-5 top-5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold text-white">
                  {chapters} chapters
                </span>
                <span className="absolute bottom-5 left-5 text-[11.5px] font-medium text-white/80">
                  Classes {classList.join(", ")}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-display text-[17px] font-bold leading-tight text-ink">{s.name}</h3>
                <p className="font-tamil text-[13px] text-inkSoft">{s.tamil}</p>
                <p className="mt-2.5 text-[13px] leading-relaxed text-inkSoft">{BLURB[s.id]}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
