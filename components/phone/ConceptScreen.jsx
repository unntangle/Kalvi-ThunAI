"use client";

import { useState } from "react";
import { getChapters } from "@/data/curriculum";
import { AppBar, ListRow, Screen, StatusBar } from "./Chrome";
import { chapterTitle, className, localize, subjectName, t, useLang } from "./lang";

export default function ConceptScreen({
  dir,
  classItem,
  subject,
  chapter,
  onBack,
  onPick,
  onSwitchChapter,
}) {
  const [open, setOpen] = useState(false);
  const { lang } = useLang();
  const chapters = getChapters(classItem.id, subject.id);

  return (
    <Screen dir={dir}>
      <StatusBar />
      <AppBar
        onBack={onBack}
        title={`${t("chapterWord", lang)} ${chapter.number}`}
        crumb={`${className(classItem, lang)} · ${subjectName(subject, lang)}`}
      />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-start justify-between gap-3 rounded-xl border border-line bg-mist px-3.5 py-2.5 text-left transition hover:border-brand/40"
        >
          <span className="font-display text-[14px] font-bold leading-snug text-ink">
            {chapterTitle(chapter, lang)}
          </span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            className={`mt-1 shrink-0 text-brand transition-transform ${open ? "rotate-180" : ""}`}
          >
            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {open ? (
          <div className="mt-1.5 overflow-hidden rounded-xl border border-line bg-white shadow-card">
            {chapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => {
                  setOpen(false);
                  if (ch.id !== chapter.id) onSwitchChapter(ch);
                }}
                className={`flex w-full gap-2 px-3.5 py-2.5 text-left text-[13px] transition hover:bg-brandTint/60 ${
                  ch.id === chapter.id ? "font-bold text-brand" : "text-inkSoft"
                }`}
              >
                <span className="font-display text-inkFaint">{ch.number}</span>
                <span className="font-display leading-snug">{chapterTitle(ch, lang)}</span>
              </button>
            ))}
          </div>
        ) : null}

        <h2 className="mb-2.5 mt-5 px-1 font-display text-[16px] font-bold text-ink">
          {t("conceptsIn", lang)}
        </h2>
        <div className="space-y-2.5">
          {chapter.concepts.map((c) => {
            // Localise for display only. onPick still hands the original
            // concept upward, so the screens above keep their `ta` payload.
            const shown = localize(c, lang);
            return (
              <ListRow
                key={c.id}
                lead={c.number}
                color={subject.color}
                title={shown.name}
                sub={shown.summary}
                onClick={() => onPick(c)}
              />
            );
          })}
        </div>
      </div>
    </Screen>
  );
}
