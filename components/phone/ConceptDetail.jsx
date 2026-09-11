"use client";

import { useState } from "react";
import { AppBar, Screen, StatusBar } from "./Chrome";
import AskSheet from "./AskSheet";
import { className, subjectName, t, useLang } from "./lang";

export default function ConceptDetail({
  dir,
  classItem,
  subject,
  chapter,
  concept,
  onBack,
  onPlay,
  onNext,
  onPrev,
  onCheckWork,
}) {
  const { lang } = useLang();
  const [asking, setAsking] = useState(false);

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
          className="grad-brand mt-5 flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-white transition hover:brightness-110 active:scale-[0.99]"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/25">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
          <span className="min-w-0">
            <span className="block font-display text-[13.5px] font-bold leading-tight">
              {t("watchExample", lang)}
            </span>
            <span className="block text-[10.5px] text-white/80">
              {concept.steps.length} {t("steps", lang)}
            </span>
          </span>
        </button>

        <div className="mt-2.5 flex items-stretch gap-2">
          {/* On the first concept of a chapter there is nothing before it, so Back
              goes up to the concept list instead of disappearing. */}
          <button
            onClick={onPrev || onBack}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-line py-2.5 font-display text-[12px] font-bold uppercase tracking-[0.06em] text-ink transition hover:border-brand hover:text-brand"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t("backWord", lang)}
          </button>

          {onNext ? (
            <button
              onClick={onNext}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-line py-2.5 font-display text-[12px] font-bold uppercase tracking-[0.06em] text-ink transition hover:border-brand hover:text-brand"
            >
              {t("next", lang)}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : (
            // Keeps Back at half width on the last concept of a chapter.
            <span className="flex-1" aria-hidden />
          )}
        </div>
      </div>

      {/* Ask bar, pinned under the concept so a doubt can be raised without leaving it.
          The camera sits beside it rather than floating over it. */}
      <div className="flex items-center gap-2 border-t border-line bg-white px-4 pb-4 pt-3">
        <button
          onClick={() => setAsking(true)}
          className="flex min-w-0 flex-1 items-center gap-2.5 rounded-full border border-line bg-mist py-2.5 pl-3 pr-4 text-left transition hover:border-brand/50"
        >
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand text-[10px] font-bold text-white">
            AI
          </span>
          <span className="flex-1 truncate text-[12.5px] text-inkFaint">{t("askBar", lang)}</span>
        </button>

        {onCheckWork ? (
          <button
            onClick={onCheckWork}
            aria-label={t("checkWork", lang)}
            title={t("checkWork", lang)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-white transition hover:bg-brandSoft active:scale-95"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M4 8h3l1.5-2h7L17 8h3v11H4z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="13" r="3.4" stroke="currentColor" strokeWidth="1.7" />
            </svg>
          </button>
        ) : null}
      </div>

      {asking ? (
        <AskSheet
          concept={concept}
          classItem={classItem}
          subject={subject}
          onClose={() => setAsking(false)}
        />
      ) : null}
    </Screen>
  );
}
