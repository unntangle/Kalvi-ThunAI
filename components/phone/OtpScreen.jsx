"use client";

import { useEffect, useState } from "react";
import Logo from "../Logo";
import { LangToggle, StatusBar } from "./Chrome";
import { t, useLang } from "./lang";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "back"];

function Keypad({ onKey }) {
  return (
    <div className="grid grid-cols-3 gap-x-6 gap-y-1">
      {KEYS.map((k, i) => {
        if (k === "") return <span key={i} />;
        const isBack = k === "back";
        return (
          <button
            key={i}
            onClick={() => onKey(isBack ? "back" : k)}
            aria-label={isBack ? "Delete last digit" : `Number ${k}`}
            className="mx-auto grid h-11 w-14 place-items-center rounded-xl font-display text-[20px] font-semibold text-ink transition hover:bg-brandTint active:scale-95"
          >
            {isBack ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M20 6H9l-5 6 5 6h11zM17 9.5l-5 5M12 9.5l5 5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              k
            )}
          </button>
        );
      })}
    </div>
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

export default function OtpScreen({ onDone }) {
  const { lang } = useLang();
  const [stage, setStage] = useState("welcome");
  const [mode, setMode] = useState("in");
  const [number, setNumber] = useState("");
  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState("");

  const max = stage === "number" ? 10 : 4;

  useEffect(() => {
    if (stage !== "code" || seconds <= 0) return;
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [stage, seconds]);

  useEffect(() => {
    function onKeyDown(e) {
      if (stage === "welcome") return;
      if (/^[0-9]$/.test(e.key)) press(e.key);
      else if (e.key === "Backspace") press("back");
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  function press(k) {
    setError("");
    const set = stage === "number" ? setNumber : setCode;
    set((v) => (k === "back" ? v.slice(0, -1) : v.length >= max ? v : v + k));
  }

  function start(which) {
    setMode(which);
    setError("");
    setStage("number");
  }

  function sendCode() {
    if (number.length !== 10) {
      setError(t("errNumber", lang));
      return;
    }
    setStage("code");
    setSeconds(20);
  }

  function verify() {
    if (code.length !== 4) {
      setError(t("errCode", lang));
      return;
    }
    onDone(number);
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

  /* ------------------------------------------------------ number and code */
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="grad-brand px-7 pb-6 text-white">
        <StatusBar dark />
        <div className="mt-3 flex items-center gap-3">
          <BackButton
            label={t("goBack", lang)}
            onClick={() => {
              if (stage === "code") {
                setStage("number");
                setCode("");
              } else {
                setStage("welcome");
                setNumber("");
              }
              setError("");
            }}
          />
          <Logo size={38} tone="mono" />
          <span className="ml-auto">
            <LangToggle dark />
          </span>
        </div>
      </div>

      {stage === "number" ? (
        <div className="flex flex-1 flex-col px-7 pt-6">
          <h1 className="font-display text-[19px] font-bold leading-snug text-ink">
            {mode === "up" ? t("titleUp", lang) : t("titleIn", lang)}
          </h1>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-inkSoft">
            {mode === "up" ? t("subUp", lang) : t("subIn", lang)}
          </p>

          <div className="mt-5 flex items-end gap-3 border-b-2 border-line pb-2">
            <span className="font-display text-[19px] font-semibold text-inkFaint">+91</span>
            <span className="flex items-end font-display text-[22px] font-bold tracking-[0.12em] text-ink">
              <span>{number}</span>
              <span className="caret mx-[3px] mb-[3px] inline-block h-5 w-[2px] bg-brandSoft" aria-hidden />
              <span className="text-line">{"·".repeat(10 - number.length)}</span>
            </span>
          </div>

          <p className="mt-2 min-h-[18px] text-[12px] text-alert">{error}</p>

          <div className="mt-auto pb-9">
            <Keypad onKey={press} />
            <button
              onClick={sendCode}
              className="mt-3 w-full rounded-full bg-brand py-3 font-display text-[13px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-brandSoft active:scale-[0.99]"
            >
              {t("sendCode", lang)}
            </button>
            <p className="mt-3 min-h-[30px] text-center text-[10.5px] leading-relaxed text-inkFaint">
              {t("demoNote", lang)}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col px-7 pt-6">
          <h1 className="font-display text-[19px] font-bold leading-snug text-ink">
            {t("enterCode", lang)}
          </h1>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-inkSoft">
            {t("sentTo", lang)} +91 {number.slice(0, 5)} {number.slice(5)}.{" "}
            <button
              onClick={() => {
                setStage("number");
                setCode("");
              }}
              className="font-semibold text-brand underline underline-offset-2"
            >
              {t("changeNumber", lang)}
            </button>
          </p>

          <div className="mt-5 flex gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`grid h-14 flex-1 place-items-center rounded-xl border-2 font-display text-[24px] font-bold text-ink ${
                  code.length === i ? "border-brandSoft bg-brandTint" : "border-line bg-mist"
                }`}
              >
                {code[i] ?? ""}
              </div>
            ))}
          </div>

          <p className="mt-2 min-h-[18px] text-[12px] text-alert">{error}</p>

          <div className="mt-auto pb-9">
            <Keypad onKey={press} />
            <button
              onClick={verify}
              className="mt-3 w-full rounded-full bg-brand py-3 font-display text-[13px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-brandSoft active:scale-[0.99]"
            >
              {mode === "up" ? t("createAccount", lang) : t("verifyOpen", lang)}
            </button>
            <p className="mt-3 min-h-[30px] text-center text-[10.5px] leading-relaxed text-inkFaint">
              {seconds > 0 ? `${t("resendIn", lang)} ${seconds}s` : t("typeAny", lang)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
