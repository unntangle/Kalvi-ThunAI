"use client";

import { useEffect, useState } from "react";
import { StatusBar } from "./Chrome";
import { t, useLang } from "./lang";

const ACCENT = "#17C3D4";
const SOFT = "#9AA6C4";
const DIM = "rgba(255,255,255,0.22)";

function Stage({ type, index, total }) {
  const on = (i) => i <= index;

  if (type === "grid") {
    return (
      <svg viewBox="0 0 240 110" className="w-full" role="img" aria-label="Step visual">
        {Array.from({ length: 15 }).map((_, i) => {
          const col = i % 5;
          const row = Math.floor(i / 5);
          const lit = col <= index + 1;
          return (
            <rect
              key={i}
              x={22 + col * 40}
              y={12 + row * 30}
              width="34"
              height="24"
              rx="5"
              fill={lit ? ACCENT : "transparent"}
              fillOpacity={lit ? 0.2 + row * 0.1 : 0}
              stroke={lit ? ACCENT : DIM}
              strokeWidth="1.3"
            />
          );
        })}
      </svg>
    );
  }

  if (type === "cycle") {
    const pts = [
      [58, 34],
      [182, 34],
      [120, 92],
    ];
    return (
      <svg viewBox="0 0 240 110" className="w-full" role="img" aria-label="Step visual">
        <path d="M58 34 L182 34 L120 92 Z" fill="none" stroke={DIM} strokeWidth="1.4" strokeDasharray="5 6" />
        {pts.map(([x, y], i) => (
          <g key={i}>
            <circle
              cx={x}
              cy={y}
              r={on(i) ? 17 : 13}
              fill={on(i) ? ACCENT : "transparent"}
              fillOpacity={on(i) ? 0.25 : 0}
              stroke={on(i) ? ACCENT : DIM}
              strokeWidth="1.6"
            />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={on(i) ? "#fff" : DIM}>
              {i + 1}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  if (type === "stack") {
    return (
      <svg viewBox="0 0 240 110" className="w-full" role="img" aria-label="Step visual">
        {Array.from({ length: total }).map((_, i) => (
          <rect
            key={i}
            x={30}
            y={16 + i * 30}
            width={on(i) ? 180 : 60}
            height="22"
            rx="6"
            fill={on(i) ? ACCENT : "transparent"}
            fillOpacity={on(i) ? 0.26 : 0}
            stroke={on(i) ? ACCENT : DIM}
            strokeWidth="1.4"
            style={{ transition: "width 420ms cubic-bezier(.22,.61,.36,1)" }}
          />
        ))}
      </svg>
    );
  }

  if (type === "map") {
    return (
      <svg viewBox="0 0 240 110" className="w-full" role="img" aria-label="Step visual">
        <path
          d="M40 86 C52 52 72 26 108 22 C146 18 178 38 196 62 C206 75 200 90 182 92 L58 94 C44 94 36 92 40 86 Z"
          fill="#fff"
          fillOpacity="0.06"
          stroke={DIM}
          strokeWidth="1.4"
        />
        {[
          [86, 58],
          [130, 44],
          [168, 70],
        ].map(([x, y], i) => (
          <g key={i} opacity={on(i) ? 1 : 0.3} style={{ transition: "opacity 380ms" }}>
            <circle cx={x} cy={y} r="5" fill={on(i) ? ACCENT : DIM} />
            <circle cx={x} cy={y} r="12" fill="none" stroke={on(i) ? ACCENT : DIM} strokeWidth="1.2" />
          </g>
        ))}
      </svg>
    );
  }

  const pct = ((index + 1) / total) * 100;
  return (
    <svg viewBox="0 0 240 110" className="w-full" role="img" aria-label="Step visual">
      <line x1="24" y1="62" x2="216" y2="62" stroke={DIM} strokeWidth="1.6" />
      {Array.from({ length: total + 1 }).map((_, i) => {
        const x = 24 + (192 / total) * i;
        return <line key={i} x1={x} y1="54" x2={x} y2="70" stroke={DIM} strokeWidth="1.4" />;
      })}
      <rect
        x="24"
        y="55"
        width={(192 * pct) / 100}
        height="14"
        rx="7"
        fill={ACCENT}
        fillOpacity="0.38"
        style={{ transition: "width 460ms cubic-bezier(.22,.61,.36,1)" }}
      />
      <circle
        cx={24 + (192 * pct) / 100}
        cy="62"
        r="7"
        fill={ACCENT}
        style={{ transition: "cx 460ms cubic-bezier(.22,.61,.36,1)" }}
      />
      <text x="24" y="40" fontSize="11" fill={SOFT}>
        step {index + 1} of {total}
      </text>
    </svg>
  );
}

export default function AvPlayer({ concept, onClose }) {
  const { lang } = useLang();
  const steps = concept.steps;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    if (index >= steps.length - 1) {
      const end = setTimeout(() => setPlaying(false), 2200);
      return () => clearTimeout(end);
    }
    const t = setTimeout(() => setIndex((i) => i + 1), 2600);
    return () => clearTimeout(t);
  }, [playing, index, steps.length]);

  const finished = !playing && index >= steps.length - 1;

  return (
    <div className="sheet-enter absolute inset-0 z-40 flex flex-col bg-night text-white">
      <StatusBar dark />
      <div className="flex items-start justify-between gap-3 px-5 pb-3 pt-2">
        <div className="min-w-0">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/45">
            {t("workedExample", lang)}
          </p>
          <p className="truncate font-display text-[15px] font-bold">{concept.name}</p>
        </div>
        <button
          onClick={onClose}
          aria-label={t("closeExample", lang)}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/25 text-white/80 transition hover:bg-white/10"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="mx-5 rounded-2xl border border-nightLine bg-nightSoft px-3 py-3">
        <Stage type={concept.av} index={index} total={steps.length} />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-4">
        <ol className="space-y-2.5">
          {steps.map((s, i) => (
            <li
              key={i}
              className={`flex gap-2.5 text-[13px] leading-relaxed transition-opacity duration-300 ${
                i <= index ? "text-white opacity-100" : "text-white/60 opacity-40"
              }`}
            >
              <span
                className={`mt-[3px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full text-[10px] font-bold ${
                  i <= index ? "bg-cyan text-ink" : "border border-white/30 text-white/60"
                }`}
              >
                {i + 1}
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ol>

        <div className="mt-4 flex items-center gap-2 text-[11px] text-white/45">
          <span className="flex h-4 items-end gap-[2px]" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`w-[3px] rounded-full bg-cyan ${playing ? "wave-bar" : ""}`}
                style={{ height: "14px", animationDelay: `${i * 110}ms`, opacity: playing ? 1 : 0.35 }}
              />
            ))}
          </span>
          <span>{t("narration", lang)}</span>
        </div>
      </div>

      <div className="border-t border-nightLine px-5 py-3">
        <div className="mb-3 h-[3px] w-full rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-cyan"
            style={{
              width: `${((index + 1) / steps.length) * 100}%`,
              transition: "width 460ms cubic-bezier(.22,.61,.36,1)",
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (finished) {
                setIndex(0);
                setPlaying(true);
              } else {
                setPlaying((p) => !p);
              }
            }}
            className="grad-brand flex flex-1 items-center justify-center rounded-full py-2.5 font-display text-[12.5px] font-bold uppercase tracking-[0.1em] text-white transition hover:brightness-110 active:scale-[0.99]"
          >
            {finished ? t("playAgain", lang) : playing ? t("pause", lang) : t("play", lang)}
          </button>
          <button
            onClick={() => setIndex((i) => Math.min(i + 1, steps.length - 1))}
            className="rounded-full border border-white/25 px-4 py-2.5 font-display text-[12.5px] font-bold uppercase tracking-[0.08em] text-white/85 transition hover:bg-white/10"
          >
            {t("next", lang)}
          </button>
        </div>
      </div>
    </div>
  );
}
