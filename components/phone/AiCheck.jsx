"use client";

import { useEffect, useState } from "react";
import { CLASSES, SUBJECTS, getChapters } from "@/data/curriculum";
import { StatusBar } from "./Chrome";
import { className, subjectName, t, useLang } from "./lang";

// A scripted diagnosis, standing in for the model. The point of the flow is that the
// photo is of the student's own attempt, not of the question, so the app can say where
// the working broke and which older concept caused it.
const CASE = {
  question: "Expand (x + 3)²",
  lines: [
    { text: "(x + 3)²", ok: true },
    { text: "= x² + 9", ok: false },
    { text: "= x² + 9", ok: null, faded: true },
  ],
  misconception: {
    en: "You squared each term on its own. Squaring a sum is not the same as squaring its parts, so the middle term 2ab is missing.",
    ta: "ஒவ்வொரு உறுப்பையும் தனித்தனியாக வர்க்கம் செய்துவிட்டீர்கள். கூட்டலின் வர்க்கம் வேறு, எனவே நடு உறுப்பு 2ab விடுபட்டுள்ளது.",
  },
  // Class, subject, chapter index, concept index. The ladder walks back three years.
  ladder: [
    [6, "maths", 1, 1],
    [7, "maths", 2, 0],
    [8, "maths", 1, 0],
  ],
};

function resolve([classId, subjectId, chIndex, cIndex]) {
  const chapter = getChapters(classId, subjectId)[chIndex];
  if (!chapter) return null;
  return {
    classItem: CLASSES.find((c) => c.id === classId),
    subject: SUBJECTS.find((s) => s.id === subjectId),
    chapter,
    concept: chapter.concepts[cIndex],
  };
}

export default function AiCheck({ onClose, onOpenConcept, web = false }) {
  const { lang } = useLang();
  const [phase, setPhase] = useState("capture");

  useEffect(() => {
    if (phase !== "reading") return;
    const timer = setTimeout(() => setPhase("result"), 1800);
    return () => clearTimeout(timer);
  }, [phase]);

  const ladder = CASE.ladder.map(resolve).filter(Boolean);
  const target = ladder[0];

  return (
    <div className="sheet-enter absolute inset-0 z-40 flex flex-col bg-white">
      {web ? null : <StatusBar />}
      <div className="flex items-center gap-3 border-b border-line px-4 pb-3 pt-1">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-[11px] font-bold text-white">
          AI
        </span>
        <p className="flex-1 font-display text-[15px] font-bold text-ink">{t("checkWork", lang)}</p>
        <button
          onClick={onClose}
          aria-label={t("closeExample", lang)}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-ink transition hover:border-brand hover:text-brand"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* ------------------------------------------------------- capture */}
      {phase === "capture" ? (
        <div className="flex min-h-0 flex-1 flex-col px-5 pt-4">
          <p className="text-[12.5px] leading-relaxed text-inkSoft">
            {web ? t("chooseFile", lang) : t("aimAtNotebook", lang)}
          </p>

          <div className="flex min-h-0 flex-1 items-center justify-center py-4">
            <div
              className={`relative aspect-[3/4] h-full max-h-[340px] overflow-hidden rounded-2xl ${
                web ? "border-2 border-dashed border-line bg-mist" : "bg-ink"
              }`}
            >
              <Notebook />
              {web ? null : (
                <>
                  <span className="absolute left-3 top-3 h-5 w-5 rounded-tl-lg border-l-2 border-t-2 border-white/70" />
                  <span className="absolute right-3 top-3 h-5 w-5 rounded-tr-lg border-r-2 border-t-2 border-white/70" />
                  <span className="absolute bottom-3 left-3 h-5 w-5 rounded-bl-lg border-b-2 border-l-2 border-white/70" />
                  <span className="absolute bottom-3 right-3 h-5 w-5 rounded-br-lg border-b-2 border-r-2 border-white/70" />
                </>
              )}
            </div>
          </div>

          <div className="pb-8 pt-5">
            <button
              onClick={() => setPhase("reading")}
              className={`flex w-full items-center justify-center gap-2 rounded-full py-3 font-display text-[13px] font-bold uppercase tracking-[0.1em] transition active:scale-[0.99] ${
                web
                  ? "border border-brand text-brand hover:bg-brandTint"
                  : "grad-brand text-white hover:brightness-105"
              }`}
            >
              {web ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : null}
              {web ? t("uploadPhoto", lang) : t("takePhoto", lang)}
            </button>
          </div>
        </div>
      ) : null}

      {/* ------------------------------------------------------- reading */}
      {phase === "reading" ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
          <span className="flex h-5 items-end gap-1" aria-hidden>
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="wave-bar w-[4px] rounded-full bg-cyan"
                style={{ height: "18px", animationDelay: `${i * 90}ms` }}
              />
            ))}
          </span>
          <p className="font-display text-[15px] font-bold text-ink">{t("readingSteps", lang)}</p>
        </div>
      ) : null}

      {/* -------------------------------------------------------- result */}
      {phase === "result" ? (
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <section>
            <h2 className="font-display text-[12px] font-bold text-inkFaint">
              {t("yourWorking", lang)}
            </h2>
            <div className="mt-2 rounded-lg border border-line bg-mist px-4 py-3">
              <p className="text-[11.5px] text-inkFaint">{CASE.question}</p>
              {CASE.lines.slice(0, 2).map((l, i) => (
                <p
                  key={i}
                  className={`mt-1.5 font-display text-[16px] font-bold ${
                    l.ok === false ? "text-alert" : "text-ink"
                  }`}
                >
                  {l.text}
                  {l.ok === false ? (
                    <span className="ml-2 align-middle text-[11px] font-semibold text-alert">
                      ← {t("whereItBroke", lang)}
                    </span>
                  ) : null}
                </p>
              ))}
            </div>
          </section>

          <section className="relative mt-6 rounded-lg border border-ink/20 px-4 pb-4 pt-5">
            <h2 className="absolute -top-[9px] left-3 bg-white px-2 font-display text-[12px] font-bold text-brand">
              {t("whyItHappened", lang)}
            </h2>
            <p className="text-[13.5px] leading-relaxed text-ink">{CASE.misconception[lang]}</p>
          </section>

          <section className="mt-6">
            <h2 className="font-display text-[12px] font-bold text-inkFaint">
              {t("rootGap", lang)}
            </h2>
            <ol className="mt-3 space-y-0">
              {ladder.map((step, i) => (
                <li key={step.concept.id} className="relative flex gap-3 pb-4 last:pb-0">
                  {i < ladder.length - 1 ? (
                    <span
                      aria-hidden
                      className="absolute left-[15px] top-8 h-[calc(100%-1.5rem)] w-px bg-line"
                    />
                  ) : null}
                  <span
                    className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full font-display text-[12px] font-bold ${
                      i === 0 ? "grad-brand text-white" : "border border-line bg-white text-inkFaint"
                    }`}
                  >
                    {step.classItem.id}
                  </span>
                  <span className="pt-0.5">
                    <span className="block font-display text-[13.5px] font-bold leading-snug text-ink">
                      {step.concept.name}
                    </span>
                    <span className="block text-[11.5px] text-inkFaint">
                      {className(step.classItem, lang)} · {subjectName(step.subject, lang)}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </section>

          {target ? (
            <button
              onClick={() => onOpenConcept(target)}
              className="grad-brand mt-6 w-full rounded-full py-3 font-display text-[13px] font-bold uppercase tracking-[0.1em] text-white transition hover:brightness-105 active:scale-[0.99]"
            >
              {t("openConcept", lang)}
            </button>
          ) : null}

          <p className="mt-3 pb-3 text-center text-[11px] leading-relaxed text-inkFaint">
            {t("noAnswerNote", lang)}
          </p>
        </div>
      ) : null}
    </div>
  );
}

// A stand-in for the camera feed: a ruled page with a handwritten sum on it.
function Notebook() {
  return (
    <svg viewBox="0 0 240 300" className="h-full w-full" role="img" aria-label="Notebook page">
      <rect x="30" y="24" width="180" height="252" rx="4" fill="#FBFAF5" />
      {Array.from({ length: 9 }).map((_, i) => (
        <line
          key={i}
          x1="42"
          y1={60 + i * 26}
          x2="198"
          y2={60 + i * 26}
          stroke="#C9D4E4"
          strokeWidth="1"
        />
      ))}
      <line x1="56" y1="24" x2="56" y2="276" stroke="#E9B3B3" strokeWidth="1" />
      <text x="68" y="82" fontSize="15" fontWeight="600" fill="#2B3A66">
        (x + 3)²
      </text>
      <text x="68" y="108" fontSize="15" fontWeight="600" fill="#2B3A66">
        = x² + 9
      </text>
      <text x="68" y="134" fontSize="15" fontWeight="600" fill="#2B3A66">
        = x² + 9
      </text>
    </svg>
  );
}
