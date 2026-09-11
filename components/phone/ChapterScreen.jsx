"use client";

import { useState } from "react";
import { subjectsFor, getChapters } from "@/data/curriculum";
import { AppBar, ListRow, Screen, StatusBar } from "./Chrome";
import { className, subjectName, t, useLang } from "./lang";

export default function ChapterScreen({
  dir,
  classItem,
  group,
  subject,
  onBack,
  onPick,
  onSwitchSubject,
}) {
  const [open, setOpen] = useState(false);
  const { lang } = useLang();
  const chapters = getChapters(classItem.id, subject.id);
  const subjects = subjectsFor(classItem.id, group?.id);

  return (
    <Screen dir={dir}>
      <StatusBar />
      <AppBar
        onBack={onBack}
        title={subjectName(subject, lang)}
        crumb={className(classItem, lang)}
      />

      <div className="relative flex-1 overflow-y-auto px-4 py-4">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between rounded-xl border border-line bg-mist px-3.5 py-2.5 text-left transition hover:border-brand/40"
        >
          <span className="flex items-center gap-2.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: subject.color }}
              aria-hidden
            />
            <span className="font-display text-[14px] font-bold text-ink">
              {subjectName(subject, lang)} · {chapters.length} {t("chapters", lang)}
            </span>
          </span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            className={`text-brand transition-transform ${open ? "rotate-180" : ""}`}
          >
            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {open ? (
          <div className="mt-1.5 overflow-hidden rounded-xl border border-line bg-white shadow-card">
            {subjects.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setOpen(false);
                  if (s.id !== subject.id) onSwitchSubject(s);
                }}
                className={`flex w-full items-center justify-between px-3.5 py-2.5 text-left text-[13.5px] transition hover:bg-brandTint/60 ${
                  s.id === subject.id ? "font-bold text-brand" : "text-inkSoft"
                }`}
              >
                <span className="font-display">{subjectName(s, lang)}</span>
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: s.color }}
                  aria-hidden
                />
              </button>
            ))}
          </div>
        ) : null}

        <div className="mt-4 space-y-2.5">
          {chapters.map((ch) => (
            <ListRow
              key={ch.id}
              lead={ch.number}
              color={subject.color}
              title={ch.title}
              sub={`${ch.concepts.length} ${t("concepts", lang)}`}
              onClick={() => onPick(ch)}
            />
          ))}
        </div>
      </div>
    </Screen>
  );
}
