"use client";

import { AppBar, Screen, StatusBar } from "./Chrome";
import { className, subjectName, t, useLang } from "./lang";

export default function ConceptDetail({ dir, classItem, subject, chapter, concept, onBack, onPlay, onNext }) {
  const { lang } = useLang();

  return (
    <Screen dir={dir}>
      <StatusBar />
      <AppBar
        onBack={onBack}
        title={`${concept.number} ${concept.name}`}
        crumb={`${className(classItem, lang)} · ${subjectName(subject, lang)}`}
      />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <section>
          <h2 className="font-display text-[12px] font-bold text-inkFaint">
            {t("whatItMeans", lang)}
          </h2>
          <p className="mt-1.5 text-[14px] leading-relaxed text-ink">{concept.summary}</p>
        </section>

        <section className="relative mt-6 rounded-lg border border-ink/20 px-4 pb-4 pt-5">
          <h2 className="absolute -top-[9px] left-3 bg-white px-2 font-display text-[12px] font-bold text-brand">
            {t("rememberThis", lang)}
          </h2>
          <p className="font-display text-[16px] font-bold leading-snug text-ink">
            {concept.formula}
          </p>
        </section>

        <section className="mt-6">
          <h2 className="font-display text-[12px] font-bold text-inkFaint">
            {t("workedExample", lang)}
          </h2>
          <ol className="mt-2 space-y-2">
            {concept.steps.map((s, i) => (
              <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink">
                <span className="mt-[3px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-brandTint font-display text-[10px] font-bold text-brand">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </section>

        <button
          onClick={onPlay}
          className="grad-brand mt-5 flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-white transition hover:brightness-110 active:scale-[0.99]"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/25">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
          <span>
            <span className="block font-display text-[15px] font-bold leading-tight">
              {t("watchExample", lang)}
            </span>
            <span className="block text-[11.5px] text-white/80">
              {t("audioVisual", lang)} · {concept.steps.length} {t("steps", lang)}
            </span>
          </span>
        </button>

        {onNext ? (
          <button
            onClick={onNext}
            className="mt-3 w-full rounded-full border border-line px-4 py-3 font-display text-[13px] font-bold uppercase tracking-[0.08em] text-ink transition hover:border-brand hover:text-brand"
          >
            {t("nextConcept", lang)}
          </button>
        ) : null}

        <p className="mt-4 pb-3 text-[11px] leading-relaxed text-inkFaint">{t("doubtNote", lang)}</p>
      </div>
    </Screen>
  );
}
