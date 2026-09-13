"use client";

import { subjectsFor, getChapters, countConcepts } from "@/data/curriculum";
import { AppBar, Screen, StatusBar } from "./Chrome";
import { className, groupName, subjectName, t, useLang } from "./lang";

export default function SubjectScreen({ dir, classItem, group, onBack, onPick }) {
  const { lang } = useLang();
  const subjects = subjectsFor(classItem.id, group?.id);

  return (
    <Screen dir={dir}>
      <StatusBar />
      <AppBar
        onBack={onBack}
        title={className(classItem, lang)}
        crumb={group ? groupName(group, lang) : null}
      />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <h2 className="mb-3 px-1 font-display text-[17px] font-bold text-ink">
          {t("chooseSubject", lang)}
        </h2>
        <div className="space-y-2.5">
          {subjects.map((s) => (
            <button
              key={s.id}
              onClick={() => onPick(s)}
              className="flex w-full items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3.5 text-left transition hover:border-brand/40 hover:bg-brandTint/40 active:scale-[0.99]"
            >
              <span
                className="h-9 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: s.color }}
                aria-hidden
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-display text-[16px] font-bold leading-tight text-ink">
                  {subjectName(s, lang)}
                </span>
                {/* Chapters and concepts on one line rather than as a stacked
                    figure on the right. A chapter count alone says nothing about
                    how much is actually inside it. */}
                <span className="mt-0.5 block truncate text-[11.5px] text-inkSoft">
                  {getChapters(classItem.id, s.id).length} {t("chapters", lang)}
                  <span className="px-1.5 text-line" aria-hidden>
                    |
                  </span>
                  {countConcepts(classItem.id, s.id)} {t("concepts", lang)}
                </span>
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                className="shrink-0 text-inkFaint"
              >
                <path
                  d="m9 5 7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>

        <p className="mt-4 px-1 text-[11.5px] text-inkSoft">
          {subjects.reduce((n, s) => n + countConcepts(classItem.id, s.id), 0)}{" "}
          {t("conceptsReady", lang)}
        </p>
      </div>
    </Screen>
  );
}
