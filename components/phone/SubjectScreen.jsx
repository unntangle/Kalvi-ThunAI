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
              </span>
              <span className="shrink-0 text-right">
                <span className="block font-display text-[15px] font-bold text-ink">
                  {getChapters(classItem.id, s.id).length}
                </span>
                <span className="block text-[10.5px] text-inkFaint">{t("chapters", lang)}</span>
              </span>
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
