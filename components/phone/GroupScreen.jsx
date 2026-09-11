"use client";

import { GROUPS, SUBJECTS } from "@/data/curriculum";
import { AppBar, Screen, StatusBar } from "./Chrome";
import { className, groupName, subjectName, t, useLang } from "./lang";

export default function GroupScreen({ dir, classItem, onBack, onPick }) {
  const { lang } = useLang();

  return (
    <Screen dir={dir}>
      <StatusBar />
      <AppBar onBack={onBack} title={className(classItem, lang)} />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <h2 className="mb-1 px-1 font-display text-[17px] font-bold text-ink">
          {t("whichGroup", lang)}
        </h2>
        <p className="mb-4 px-1 text-[12px] leading-relaxed text-inkSoft">{t("groupSub", lang)}</p>

        <div className="space-y-3">
          {GROUPS.map((g) => (
            <button
              key={g.id}
              onClick={() => onPick(g)}
              className="w-full rounded-2xl border border-line bg-white p-4 text-left transition hover:border-brand/50 hover:bg-brandTint/40 active:scale-[0.99]"
            >
              <span className="block font-display text-[16px] font-bold leading-tight text-ink">
                {groupName(g, lang)}
              </span>
              <span className="mt-3 flex flex-wrap gap-1.5">
                {g.subjects.map((id) => {
                  const s = SUBJECTS.find((x) => x.id === id);
                  if (!s) return null;
                  return (
                    <span
                      key={id}
                      className="rounded-full px-2 py-[3px] text-[10.5px] font-semibold"
                      style={{ backgroundColor: `${s.color}18`, color: s.color }}
                    >
                      {subjectName(s, lang)}
                    </span>
                  );
                })}
              </span>
            </button>
          ))}
        </div>

        <p className="mt-4 px-1 text-[11px] leading-relaxed text-inkFaint">{t("artsNote", lang)}</p>
      </div>
    </Screen>
  );
}
