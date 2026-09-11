"use client";

import { CLASSES, classTotals, hasGroups } from "@/data/curriculum";
import { LangToggle, Screen, StatusBar } from "./Chrome";
import { className, t, useLang } from "./lang";

export default function ClassScreen({ dir, student, current, onPick, onSignOut }) {
  const { lang } = useLang();

  return (
    <Screen dir={dir}>
      <div className="grad-brand text-white">
        <StatusBar dark />
        <div className="flex items-start justify-between gap-3 px-5 pb-6 pt-2">
          <div className="min-w-0">
            <p className="truncate text-[12px] text-white/65">
              {t("signedInAs", lang)} {student?.name || "—"}
              {student?.roll ? ` · ${t("rollWord", lang)} ${student.roll}` : ""}
            </p>
            <h1 className="mt-1 font-display text-[21px] font-extrabold leading-tight">
              {current ? t("changeClass", lang) : t("whichClass", lang)}
            </h1>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <LangToggle dark />
            <button
              onClick={onSignOut}
              className="rounded-full border border-white/40 px-3 py-1 text-[11px] font-semibold text-white/85 transition hover:bg-white/15"
            >
              {t("signOut", lang)}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        <div className="grid grid-cols-2 gap-3">
          {CLASSES.map((c) => {
            const totals = classTotals(c.id);
            const on = c.id === current;
            return (
              <button
                key={c.id}
                onClick={() => onPick(c)}
                aria-current={on ? "true" : undefined}
                className={`rounded-2xl border bg-white p-4 text-left shadow-raised transition hover:-translate-y-0.5 hover:border-brand/50 active:scale-[0.98] ${
                  on ? "border-brand ring-1 ring-brand/30" : "border-line"
                }`}
              >
                <span className="flex items-baseline gap-2">
                  <span className="font-display text-[30px] font-extrabold leading-none text-brand">
                    {c.id}
                  </span>
                  {hasGroups(c.id) ? (
                    <span className="rounded-full bg-brandTint px-2 py-[2px] text-[9.5px] font-bold uppercase tracking-[0.08em] text-brand">
                      {t("groupsBadge", lang)}
                    </span>
                  ) : null}
                </span>
                <span className="mt-1 block font-display text-[13px] font-medium text-ink">
                  {className(c, lang)}
                </span>
                <span className="mt-3 block text-[11px] text-inkSoft">
                  {totals.concepts} {t("concepts", lang)} · {totals.subjects}{" "}
                  {lang === "ta" ? "பாடங்கள்" : "subjects"}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-5 text-[11.5px] leading-relaxed text-inkSoft">{t("classNote", lang)}</p>
      </div>
    </Screen>
  );
}
