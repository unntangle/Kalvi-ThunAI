"use client";

import { useState } from "react";
import { CLASSES } from "@/data/curriculum";
import Logo from "../Logo";
import Select from "./Select";
import { LangToggle, StatusBar } from "./Chrome";
import { className as classLabel, t, useLang } from "./lang";

const INPUT_BASE =
  "mt-1.5 w-full rounded-xl border bg-mist px-3.5 py-2.5 font-display text-[15px] font-semibold text-ink outline-none transition placeholder:font-normal placeholder:text-inkFaint focus:bg-white";

// The border colour is the only thing that changes, so it is kept out of the base
// string. Two Tailwind border-colour classes on one element fight each other.
function inputCls(bad, extra = "") {
  return `${INPUT_BASE} ${
    bad ? "border-alert focus:border-alert" : "border-line focus:border-brand"
  } ${extra}`;
}

function Label({ children }) {
  return (
    <span className="block font-display text-[11px] font-bold uppercase tracking-[0.08em] text-inkFaint">
      {children}
    </span>
  );
}

function BackButton({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/40 text-white transition hover:bg-white/15"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export default function SignInScreen({ onDone }) {
  const { lang } = useLang();
  const [stage, setStage] = useState("welcome");
  const [mode, setMode] = useState("in");
  const [name, setName] = useState("");
  const [classId, setClassId] = useState(null);
  const [roll, setRoll] = useState("");
  const [error, setError] = useState({ field: "", msg: "" });

  function clearError() {
    setError({ field: "", msg: "" });
  }

  function start(which) {
    setMode(which);
    clearError();
    setStage("details");
  }

  function submit() {
    if (name.trim().length < 2) {
      setError({ field: "name", msg: t("errName", lang) });
      return;
    }
    if (!classId) {
      setError({ field: "class", msg: t("errClass", lang) });
      return;
    }
    if (!roll.trim()) {
      setError({ field: "roll", msg: t("errRoll", lang) });
      return;
    }
    onDone({ name: name.trim(), classId, roll: roll.trim() });
  }

  /* ------------------------------------------------------------- welcome */
  if (stage === "welcome") {
    return (
      <div className="flex h-full flex-col bg-white">
        <StatusBar />

        <div className="flex justify-end px-6 pt-1">
          <LangToggle />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <Logo size={80} tone="grad" stacked />
          <p className="mt-5 font-display text-[15px] font-semibold text-inkSoft">
            {t("tagline", lang)}
          </p>
        </div>

        <div className="px-8 pb-10">
          <button
            onClick={() => start("in")}
            className="grad-brand w-full rounded-full py-3 font-display text-[13px] font-bold uppercase tracking-[0.1em] text-white transition hover:brightness-105 active:scale-[0.99]"
          >
            {t("signIn", lang)}
          </button>
          <button
            onClick={() => start("up")}
            className="mt-3 w-full rounded-full border border-line py-3 font-display text-[13px] font-bold uppercase tracking-[0.1em] text-ink transition hover:border-brand hover:text-brand active:scale-[0.99]"
          >
            {t("signUp", lang)}
          </button>
          <p className="mt-4 text-center text-[10.5px] leading-relaxed text-inkFaint">
            {t("demoNote", lang)}
          </p>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------- details */
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="grad-brand px-7 pb-6 text-white">
        <StatusBar dark />
        <div className="mt-3 flex items-center gap-3">
          <BackButton
            label={t("goBack", lang)}
            onClick={() => {
              setStage("welcome");
              clearError();
            }}
          />
          <Logo size={38} tone="mono" />
          <span className="ml-auto">
            <LangToggle dark />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-7 pt-6">
        <h1 className="font-display text-[19px] font-bold leading-snug text-ink">
          {mode === "up" ? t("titleUp", lang) : t("titleIn", lang)}
        </h1>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-inkSoft">
          {mode === "up" ? t("subUp", lang) : t("subIn", lang)}
        </p>

        {/* name */}
        <div className="mt-5">
          <Label>{t("labelName", lang)}</Label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearError();
            }}
            placeholder={t("phName", lang)}
            aria-invalid={error.field === "name"}
            autoComplete="off"
            className={inputCls(error.field === "name")}
          />
        </div>

        {/* class */}
        <div className="mt-4">
          <Label>{t("labelClass", lang)}</Label>
          <Select
            size="sm"
            label={t("labelClass", lang)}
            placeholder={t("classHint", lang)}
            value={classId}
            invalid={error.field === "class"}
            textClass={lang === "ta" ? "font-tamil" : ""}
            options={CLASSES.map((c) => ({ value: c.id, label: classLabel(c, lang) }))}
            onChange={(v) => {
              setClassId(v);
              clearError();
            }}
          />
        </div>

        {/* roll number */}
        <div className="mt-4">
          <Label>{t("labelRoll", lang)}</Label>
          <input
            value={roll}
            inputMode="numeric"
            onChange={(e) => {
              setRoll(e.target.value.replace(/\D/g, "").slice(0, 4));
              clearError();
            }}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder={t("phRoll", lang)}
            aria-invalid={error.field === "roll"}
            autoComplete="off"
            className={inputCls(error.field === "roll", "tracking-[0.12em]")}
          />
        </div>

        <p className="mt-2 min-h-[18px] text-[12px] text-alert">{error.msg}</p>

        <div className="mt-auto pb-9">
          <button
            onClick={submit}
            className="w-full rounded-full bg-brand py-3 font-display text-[13px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-brandSoft active:scale-[0.99]"
          >
            {mode === "up" ? t("createAccount", lang) : t("continueWord", lang)}
          </button>
          <p className="mt-3 text-center text-[10.5px] leading-relaxed text-inkFaint">
            {t("demoNote", lang)}
          </p>
        </div>
      </div>
    </div>
  );
}
