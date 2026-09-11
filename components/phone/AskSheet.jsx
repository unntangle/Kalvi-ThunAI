"use client";

import { useEffect, useRef, useState } from "react";
import { StatusBar } from "./Chrome";
import { t, useLang } from "./lang";

// Composed from the concept's own material. Used when no model key is configured,
// so the flow still demos and the answer still comes from the textbook content.
function localAnswer(concept, lang) {
  if (lang === "ta") {
    return [
      `இந்தக் கருத்தின் விதி: ${concept.formula}`,
      `முதல் படி: ${concept.steps[0]}`,
      `அடுத்த படியை நீங்களே முயற்சி செய்யுங்கள்.`,
    ].join("\n");
  }
  return [
    `The rule here is: ${concept.formula}`,
    `Start with: ${concept.steps[0]}`,
    `Try the next step yourself and tell me what you get.`,
  ].join("\n");
}

export default function AskSheet({ concept, classItem, subject, onClose, web = false }) {
  const { lang } = useLang();
  const [messages, setMessages] = useState([]);
  const [field, setField] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  // Put the cursor in the field as soon as the sheet opens, so a student can start
  // typing without a second tap.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const suggestions =
    lang === "ta"
      ? ["எளிமையாகச் சொல்லுங்கள்", "ஏன் இந்த விதி?", "இன்னொரு எடுத்துக்காட்டு"]
      : ["Explain it simply", "Why is this the rule?", "Give me another example"];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, busy]);

  async function send(text) {
    const question = text.trim();
    if (!question || busy) return;

    const next = [...messages, { role: "user", text: question }];
    setMessages(next);
    setField("");
    setBusy(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          question,
          concept,
          classId: classItem?.id,
          subject: subject?.name,
          lang,
          history: messages,
        }),
      });
      const data = await res.json();
      const reply =
        data.configured && data.answer ? data.answer : localAnswer(concept, lang);
      setMessages([...next, { role: "assistant", text: reply }]);
    } catch {
      setMessages([...next, { role: "assistant", text: localAnswer(concept, lang) }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="sheet-enter absolute inset-0 z-40 flex flex-col bg-white">
      {web ? null : <StatusBar />}

      <div className="flex items-center gap-3 border-b border-line px-4 pb-3 pt-1">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-[11px] font-bold text-white">
          AI
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-[14px] font-bold text-ink">
            {t("askTitle", lang)}
          </p>
          <p className="truncate text-[11px] text-inkFaint">{concept.name}</p>
        </div>
        <button
          onClick={onClose}
          aria-label={t("closeExample", lang)}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-ink transition hover:border-brand hover:text-brand"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <div className="rounded-xl border border-line bg-mist px-4 py-3">
            <p className="text-[12.5px] leading-relaxed text-inkSoft">{t("askIntro", lang)}</p>
          </div>
        ) : null}

        <div className="space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <p
                className={`max-w-[80%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                  m.role === "user"
                    ? "rounded-br-sm bg-brand text-white"
                    : "rounded-bl-sm border border-line bg-mist text-ink"
                }`}
              >
                {m.text}
              </p>
            </div>
          ))}

          {busy ? (
            <div className="flex justify-start">
              <span className="flex h-8 items-end gap-1 rounded-2xl rounded-bl-sm border border-line bg-mist px-3.5 py-2.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="wave-bar w-[3px] rounded-full bg-brandSoft"
                    style={{ height: "12px", animationDelay: `${i * 120}ms` }}
                  />
                ))}
              </span>
            </div>
          ) : null}
        </div>

        <div ref={endRef} />
      </div>

      {messages.length === 0 ? (
        <div className="flex flex-wrap gap-2 px-4 pb-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-full border border-line px-3 py-1.5 text-[11.5px] font-medium text-inkSoft transition hover:border-brand hover:text-brand"
            >
              {s}
            </button>
          ))}
        </div>
      ) : null}

      <div className="border-t border-line px-4 pb-6 pt-3">
        <div className="flex items-center gap-2 rounded-full border border-line bg-mist p-1 pl-4 transition focus-within:border-brand focus-within:bg-white">
          <input
            ref={inputRef}
            value={field}
            onChange={(e) => setField(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send(field);
            }}
            placeholder={t("askPlaceholder", lang)}
            className="min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-inkFaint"
          />
          <button
            onClick={() => send(field)}
            disabled={busy || !field.trim()}
            aria-label={t("askSend", lang)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-white transition hover:bg-brandSoft disabled:opacity-35"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M4 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <p className="mt-2 text-center text-[10px] leading-relaxed text-inkFaint">
          {t("askGuard", lang)}
        </p>
      </div>
    </div>
  );
}
