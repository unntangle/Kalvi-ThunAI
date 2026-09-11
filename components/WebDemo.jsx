"use client";

import { useEffect, useRef, useState } from "react";
import {
  CLASSES,
  GROUPS,
  classTotals,
  getChapters,
  hasGroups,
  subjectsFor,
} from "@/data/curriculum";
import { LangContext, className as classLabel, subjectName, t } from "./phone/lang";
import AvPlayer from "./phone/AvPlayer";
import AskSheet from "./phone/AskSheet";
import AiCheck from "./phone/AiCheck";
import Logo from "./Logo";

/* --------------------------------------------------------------- sign in */

function AuthCard({ lang, onDone }) {
  const [step, setStep] = useState("number");
  const [number, setNumber] = useState("");
  const [code, setCode] = useState("");

  return (
    <div className="flex h-full items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <div className="flex justify-center">
          <Logo size={72} tone="grad" stacked />
        </div>
        <p className="mt-5 font-display text-[15px] font-semibold text-inkSoft">
          {t("tagline", lang)}
        </p>

        {step === "number" ? (
          <div className="mt-8 text-left">
            <label className="block text-[12px] font-semibold text-inkSoft">
              {t("titleIn", lang)}
            </label>
            <div className="mt-2 flex items-center gap-2 rounded-xl border border-line bg-mist px-4 py-3 focus-within:border-brand focus-within:bg-white">
              <span className="font-display text-[15px] font-semibold text-inkFaint">+91</span>
              <input
                autoFocus
                inputMode="numeric"
                value={number}
                onChange={(e) => setNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                onKeyDown={(e) => e.key === "Enter" && number.length === 10 && setStep("code")}
                placeholder="0000000000"
                className="w-full bg-transparent font-display text-[17px] font-bold tracking-[0.1em] text-ink outline-none placeholder:font-normal placeholder:tracking-normal placeholder:text-inkFaint"
              />
            </div>
            <button
              onClick={() => number.length === 10 && setStep("code")}
              disabled={number.length !== 10}
              className="grad-brand mt-4 w-full rounded-xl py-3 font-display text-[13px] font-bold uppercase tracking-[0.1em] text-white transition hover:brightness-105 disabled:opacity-40"
            >
              {t("sendCode", lang)}
            </button>
          </div>
        ) : (
          <div className="mt-8 text-left">
            <label className="block text-[12px] font-semibold text-inkSoft">
              {t("enterCode", lang)}
            </label>
            <input
              autoFocus
              inputMode="numeric"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 4))}
              onKeyDown={(e) => e.key === "Enter" && code.length === 4 && onDone(number)}
              placeholder="- - - -"
              className="mt-2 w-full rounded-xl border border-line bg-mist px-4 py-3 text-center font-display text-[24px] font-bold tracking-[0.5em] text-ink outline-none focus:border-brand focus:bg-white"
            />
            <button
              onClick={() => code.length === 4 && onDone(number)}
              disabled={code.length !== 4}
              className="grad-brand mt-4 w-full rounded-xl py-3 font-display text-[13px] font-bold uppercase tracking-[0.1em] text-white transition hover:brightness-105 disabled:opacity-40"
            >
              {t("verifyOpen", lang)}
            </button>
          </div>
        )}

        <p className="mt-4 text-[11px] text-inkFaint">{t("demoNote", lang)}</p>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- breadcrumbs */

// Each crumb opens the matching browse page rather than a dropdown.
function Crumb({ label, onClick, current = false }) {
  if (current) {
    return (
      <span className="max-w-[320px] truncate rounded-lg bg-brandTint px-2.5 py-1.5 font-display text-[12.5px] font-semibold text-brand">
        {label}
      </span>
    );
  }
  return (
    <button
      onClick={onClick}
      className="max-w-[280px] truncate rounded-lg px-2.5 py-1.5 font-display text-[12.5px] font-semibold text-inkSoft transition hover:bg-mist hover:text-brand"
    >
      {label}
    </button>
  );
}

function Sep() {
  return (
    <span aria-hidden className="select-none px-0.5 text-[13px] text-line">
      ›
    </span>
  );
}

/* ------------------------------------------------------------------ shell */

// Picking anything higher up cascades down to the first item below it, so the
// reading pane always has something in it.
function firstPath(classItem, groupId) {
  const subject = subjectsFor(classItem.id, groupId)[0] ?? null;
  const chapter = subject ? getChapters(classItem.id, subject.id)[0] ?? null : null;
  const concept = chapter ? chapter.concepts[0] ?? null : null;
  return { subject, chapter, concept };
}

export default function WebDemo({ toolbar = null }) {
  const [lang, setLang] = useState("en");
  const [phone, setPhone] = useState("");
  const [overlay, setOverlay] = useState(null);
  // null means the reading pane. "class" and "subject" are the browse pages.
  const [home, setHome] = useState("class");

  const [state, setState] = useState(() => {
    const classItem = CLASSES[2];
    const group = GROUPS[0];
    return { classItem, group, ...firstPath(classItem, group.id) };
  });

  const { classItem, group, subject, chapter, concept } = state;
  const subjects = subjectsFor(classItem.id, group?.id);
  const chapters = subject ? getChapters(classItem.id, subject.id) : [];

  function pickClass(id) {
    const next = CLASSES.find((c) => c.id === Number(id));
    setState((s) => ({ ...s, classItem: next, ...firstPath(next, s.group?.id) }));
  }

  function pickGroup(id) {
    const next = GROUPS.find((g) => g.id === id);
    setState((s) => ({ ...s, group: next, ...firstPath(s.classItem, next.id) }));
  }

  function pickSubject(id) {
    const next = subjects.find((s) => s.id === id);
    const ch = getChapters(classItem.id, next.id)[0] ?? null;
    setState((s) => ({ ...s, subject: next, chapter: ch, concept: ch?.concepts[0] ?? null }));
  }

  function pickChapter(id) {
    const next = chapters.find((c) => c.id === id);
    setState((s) => ({ ...s, chapter: next, concept: next?.concepts[0] ?? null }));
  }

  function pickConcept(id) {
    setState((s) => ({ ...s, concept: chapter.concepts.find((c) => c.id === id) }));
  }

  function openConcept(target) {
    setOverlay(null);
    setHome(null);
    setState({
      classItem: target.classItem,
      group: GROUPS[0],
      subject: target.subject,
      chapter: target.chapter,
      concept: target.concept,
    });
  }

  const conceptIndex = concept ? chapter.concepts.findIndex((c) => c.id === concept.id) : -1;
  const nextConcept = conceptIndex >= 0 ? chapter.concepts[conceptIndex + 1] : null;
  const prevConcept = conceptIndex > 0 ? chapter.concepts[conceptIndex - 1] : null;

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <div className="flex h-full flex-col bg-white">
        <header className="flex shrink-0 items-center gap-3 border-b border-line px-4 py-2.5 sm:gap-4 sm:px-6">
          <button
            onClick={() => phone && setHome("class")}
            aria-label="Kalvi ThunAI home"
            className="rounded-lg transition hover:opacity-80"
          >
            <Logo size={34} />
          </button>
          <div className="ml-auto flex items-center gap-2">
            {toolbar}
            <div className="flex items-center gap-0.5 rounded-full bg-mist p-0.5">
              {["en", "ta"].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`grid h-7 w-7 place-items-center rounded-full text-[12px] font-bold ${
                    lang === l ? "bg-brand text-white" : "text-inkFaint hover:text-ink"
                  } ${l === "ta" ? "font-tamil" : ""}`}
                >
                  {l === "en" ? "E" : "த"}
                </button>
              ))}
            </div>
            {phone ? (
              <button
                onClick={() => setPhone("")}
                className="rounded-full border border-line px-3 py-1.5 text-[12px] font-semibold text-inkSoft transition hover:border-brand hover:text-brand"
              >
                {t("signOut", lang)}
              </button>
            ) : null}
          </div>
        </header>

        {!phone ? (
          <div className="min-h-0 flex-1">
            <AuthCard lang={lang} onDone={setPhone} />
          </div>
        ) : home ? (
          /* browse pages: classes, then the subjects in that class */
          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="mx-auto max-w-[900px] px-4 py-8 sm:px-10 sm:py-12">
              {home === "class" ? (
                <>
                  <h1 className="heading text-[clamp(1.4rem,5vw,1.75rem)] text-ink">{t("whichClass", lang)}</h1>
                  <p className="mt-2 text-[14px] text-inkSoft">{t("classNote", lang)}</p>
                  <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {CLASSES.map((c) => {
                      const totals = classTotals(c.id);
                      return (
                        <button
                          key={c.id}
                          onClick={() => {
                            pickClass(c.id);
                            setHome("subject");
                          }}
                          className="rounded-2xl border border-line bg-white p-5 text-left shadow-raised transition hover:-translate-y-0.5 hover:border-brand/50"
                        >
                          <span className="flex items-baseline gap-2">
                            <span className="font-display text-[32px] font-extrabold leading-none text-brand">
                              {c.id}
                            </span>
                            {hasGroups(c.id) ? (
                              <span className="rounded-full bg-brandTint px-2 py-[2px] text-[9.5px] font-bold uppercase tracking-[0.08em] text-brand">
                                {t("groupsBadge", lang)}
                              </span>
                            ) : null}
                          </span>
                          <span className="mt-1 block font-display text-[14px] font-medium text-ink">
                            {classLabel(c, lang)}
                          </span>
                          <span className="mt-3 block text-[12px] text-inkSoft">
                            {totals.concepts} {t("concepts", lang)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : home === "subject" ? (
                <>
                  <button
                    onClick={() => setHome("class")}
                    className="flex items-center gap-1.5 text-[12.5px] font-semibold text-inkSoft transition hover:text-brand"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {t("whichClass", lang)}
                  </button>

                  <h1 className="heading mt-3 text-[clamp(1.4rem,5vw,1.75rem)] text-ink">
                    {classLabel(classItem, lang)}
                  </h1>

                  {hasGroups(classItem.id) ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {GROUPS.map((g) => (
                        <button
                          key={g.id}
                          onClick={() => pickGroup(g.id)}
                          className={`rounded-full px-4 py-1.5 font-display text-[12.5px] font-semibold transition ${
                            g.id === group.id
                              ? "bg-brand text-white"
                              : "border border-line text-inkSoft hover:border-brand hover:text-brand"
                          }`}
                        >
                          {g.name}
                        </button>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {subjects.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          pickSubject(s.id);
                          setHome("chapter");
                        }}
                        className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4 text-left shadow-raised transition hover:-translate-y-0.5 hover:border-brand/50"
                      >
                        <span
                          className="h-10 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: s.color }}
                          aria-hidden
                        />
                        <span className="min-w-0">
                          <span className="block truncate font-display text-[15px] font-bold text-ink">
                            {subjectName(s, lang)}
                          </span>
                          <span className="block text-[12px] text-inkSoft">
                            {getChapters(classItem.id, s.id).length} {t("chapters", lang)}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setHome("subject")}
                    className="flex items-center gap-1.5 text-[12.5px] font-semibold text-inkSoft transition hover:text-brand"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {classLabel(classItem, lang)}
                  </button>

                  <h1 className="heading mt-3 flex items-center gap-3 text-[clamp(1.4rem,5vw,1.75rem)] text-ink">
                    <span
                      className="h-7 w-1.5 rounded-full"
                      style={{ backgroundColor: subject?.color }}
                      aria-hidden
                    />
                    {subjectName(subject, lang)}
                  </h1>

                  <div className="mt-8 space-y-3">
                    {chapters.map((ch) => (
                      <div
                        key={ch.id}
                        className="rounded-2xl border border-line bg-white p-4 shadow-raised sm:p-5"
                      >
                        <div className="flex items-baseline gap-3">
                          <span
                            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg font-display text-[13px] font-bold"
                            style={{
                              backgroundColor: `${subject?.color}1A`,
                              color: subject?.color,
                            }}
                          >
                            {ch.number}
                          </span>
                          <h2 className="font-display text-[16px] font-bold text-ink">{ch.title}</h2>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2 sm:pl-11">
                          {ch.concepts.map((c) => (
                            <button
                              key={c.id}
                              onClick={() => {
                                setState((s) => ({ ...s, chapter: ch, concept: c }));
                                setHome(null);
                              }}
                              className="rounded-full border border-line px-3.5 py-1.5 text-[12.5px] text-ink transition hover:border-brand hover:text-brand"
                            >
                              {c.number} {c.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="relative flex min-h-0 flex-1 flex-col">
            {/* breadcrumbs: every level is a dropdown, so the whole syllabus is
                reachable without leaving the page */}
            <nav className="no-scrollbar flex shrink-0 flex-nowrap items-center gap-0.5 overflow-x-auto border-b border-line px-4 py-2 sm:flex-wrap sm:px-6">
              <Crumb label={classLabel(classItem, lang)} onClick={() => setHome("class")} />
              {hasGroups(classItem.id) ? (
                <>
                  <Sep />
                  <Crumb label={group.name} onClick={() => setHome("subject")} />
                </>
              ) : null}
              <Sep />
              <Crumb label={subjectName(subject, lang)} onClick={() => setHome("subject")} />
              <Sep />
              <Crumb
                label={`${chapter.number}. ${chapter.title}`}
                onClick={() => setHome("chapter")}
              />
              <Sep />
              <Crumb current label={`${concept.number} ${concept.name}`} />
            </nav>

            {/* full width reading pane */}
            <div className="min-h-0 flex-1 overflow-y-auto">
              {concept ? (
                <article className="mx-auto max-w-[820px] px-4 py-5 sm:px-10 sm:py-6">
                  <h1 className="heading text-[clamp(1.15rem,4vw,1.5rem)] text-ink">
                    {concept.number} {concept.name}
                  </h1>

                  <h2 className="mt-5 font-display text-[12px] font-bold text-inkFaint">
                    {t("whatItMeans", lang)}
                  </h2>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink">{concept.summary}</p>

                  <div className="relative mt-5 rounded-lg border border-ink/20 px-5 pb-3.5 pt-4">
                    <h2 className="absolute -top-[9px] left-4 bg-white px-2 font-display text-[12px] font-bold text-brand">
                      {t("rememberThis", lang)}
                    </h2>
                    <p className="font-display text-[17px] font-bold leading-snug text-ink">
                      {concept.formula}
                    </p>
                  </div>

                  <h2 className="mt-5 font-display text-[12px] font-bold text-inkFaint">
                    {t("workedExample", lang)}
                  </h2>
                  <ol className="mt-2 space-y-1.5">
                    {concept.steps.map((s, i) => (
                      <li key={i} className="flex gap-3 text-[14.5px] leading-relaxed text-ink">
                        <span className="mt-[4px] grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brandTint font-display text-[11px] font-bold text-brand">
                          {i + 1}
                        </span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-5">
                    <button
                      onClick={() => setOverlay("video")}
                      className="grad-brand flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-white transition hover:brightness-110"
                    >
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-white/25">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M8 5.5v13l11-6.5z" />
                        </svg>
                      </span>
                      <span className="font-display text-[14px] font-bold">
                        {t("watchExample", lang)}
                      </span>
                    </button>
                  </div>

                  {/* Back sits at the left edge and Next at the right, the way page
                      turns usually read. */}
                  <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                    <button
                      onClick={() => prevConcept && pickConcept(prevConcept.id)}
                      disabled={!prevConcept}
                      className="flex items-center gap-2 rounded-xl border border-line px-5 py-3 font-display text-[12px] font-bold uppercase tracking-[0.06em] text-ink transition hover:border-brand hover:text-brand disabled:opacity-35 disabled:hover:border-line disabled:hover:text-ink"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {t("backWord", lang)}
                    </button>

                    <button
                      onClick={() => nextConcept && pickConcept(nextConcept.id)}
                      disabled={!nextConcept}
                      className="flex items-center gap-2 rounded-xl border border-line px-5 py-3 font-display text-[12px] font-bold uppercase tracking-[0.06em] text-ink transition hover:border-brand hover:text-brand disabled:opacity-35 disabled:hover:border-line disabled:hover:text-ink"
                    >
                      {t("next", lang)}
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </article>
              ) : null}
            </div>

            {/* ask bar */}
            <div className="shrink-0 border-t border-line px-4 py-3 sm:px-6">
              <div className="mx-auto flex max-w-[820px] items-center gap-2">
                <button
                  onClick={() => setOverlay("ask")}
                  className="flex flex-1 items-center gap-2.5 rounded-full border border-line bg-mist py-2.5 pl-3 pr-4 text-left transition hover:border-brand/50"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand text-[10px] font-bold text-white">
                    AI
                  </span>
                  <span className="text-[13px] text-inkFaint">{t("askBar", lang)}</span>
                </button>
                <button
                  onClick={() => setOverlay("check")}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-white transition hover:bg-brandSoft"
                  aria-label={t("checkWork", lang)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M4 8h3l1.5-2h7L17 8h3v11H4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                    <circle cx="12" cy="13" r="3.4" stroke="currentColor" strokeWidth="1.7" />
                  </svg>
                </button>
              </div>
            </div>

            {overlay && concept ? (
              <div className="absolute inset-0 z-40 grid place-items-center bg-ink/45 p-3 backdrop-blur-sm sm:p-8">
                <div
                  className={`relative flex max-h-full w-full flex-col overflow-hidden rounded-2xl bg-white shadow-card ${
                    overlay === "video"
                      ? "h-[70vh] max-h-[440px] max-w-[680px]"
                      : "h-[85vh] max-h-[560px] max-w-[520px]"
                  }`}
                >
                  {overlay === "video" ? (
                    <AvPlayer
                      web
                      concept={concept}
                      classItem={classItem}
                      subject={subject}
                      onClose={() => setOverlay(null)}
                    />
                  ) : null}
                  {overlay === "ask" ? (
                    <AskSheet
                      web
                      concept={concept}
                      classItem={classItem}
                      subject={subject}
                      onClose={() => setOverlay(null)}
                    />
                  ) : null}
                  {overlay === "check" ? (
                    <AiCheck web onClose={() => setOverlay(null)} onOpenConcept={openConcept} />
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </LangContext.Provider>
  );
}
