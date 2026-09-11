"use client";

import { useEffect, useState } from "react";
import { useLang } from "./lang";

// iPhone 17 Pro Max, in points. 440 x 956 @3x, which is 1320 x 2868 physical pixels at 460 ppi.
// The screen designs are authored on a 320pt grid and scaled up to fill the 440pt canvas.
// The 320 x 695.27 content box is the same 19.5:9 ratio as the real display.
export const DEVICE = {
  screenW: 440,
  screenH: 956,
  bezel: 13,
  radius: 62,
  island: { w: 125, h: 37, top: 11 },
  contentW: 320,
};

const CONTENT_SCALE = DEVICE.screenW / DEVICE.contentW; // 1.375
const CONTENT_H = DEVICE.screenH / CONTENT_SCALE; // 695.27
const FRAME_W = DEVICE.screenW + DEVICE.bezel * 2; // 466
const FRAME_H = DEVICE.screenH + DEVICE.bezel * 2; // 982

const MAX_SCALE = 0.78;
const MIN_SCALE = 0.3;

// reserveY covers the header, panel padding and whatever sits under the phone.
// reserveX covers the page and panel side padding.
function fitScale(reserveY, reserveX) {
  if (typeof window === "undefined") return 0.62;
  const byHeight = (window.innerHeight - reserveY) / FRAME_H;
  const byWidth = (window.innerWidth - reserveX) / FRAME_W;
  return Math.max(MIN_SCALE, Math.min(MAX_SCALE, byHeight, byWidth));
}

export function PhoneShell({ children, onGrad = false, reserveY = 200, reserveX = 64 }) {
  const [scale, setScale] = useState(0.62);

  useEffect(() => {
    const fit = () => setScale(fitScale(reserveY, reserveX));
    fit();
    window.addEventListener("resize", fit);
    window.addEventListener("orientationchange", fit);
    return () => {
      window.removeEventListener("resize", fit);
      window.removeEventListener("orientationchange", fit);
    };
  }, [reserveY, reserveX]);

  return (
    <div className="relative">
      <div
        aria-hidden
        className={`absolute -inset-6 -z-10 rounded-[3rem] ${
          onGrad ? "bg-white/10" : "bg-gradient-to-br from-brandTint via-white to-mistDeep"
        }`}
      />

      <div
        className="device-scale"
        style={{ width: FRAME_W * scale, height: FRAME_H * scale }}
      >
        <div
          className="relative bg-ink shadow-device"
          style={{
            width: FRAME_W,
            height: FRAME_H,
            padding: DEVICE.bezel,
            borderRadius: DEVICE.radius + DEVICE.bezel,
            transform: `scale(${scale})`,
          }}
        >
          <span
            aria-hidden
            className="absolute -left-[3px] top-[180px] h-[32px] w-[3px] rounded-l-sm bg-ink"
          />
          <span
            aria-hidden
            className="absolute -left-[3px] top-[250px] h-[62px] w-[3px] rounded-l-sm bg-ink"
          />
          <span
            aria-hidden
            className="absolute -left-[3px] top-[330px] h-[62px] w-[3px] rounded-l-sm bg-ink"
          />
          <span
            aria-hidden
            className="absolute -right-[3px] top-[268px] h-[96px] w-[3px] rounded-r-sm bg-ink"
          />

          <div
            className="relative overflow-hidden bg-ink"
            style={{
              width: DEVICE.screenW,
              height: DEVICE.screenH,
              borderRadius: DEVICE.radius,
            }}
          >
            <div
              style={{
                width: DEVICE.contentW + 1,
                height: CONTENT_H + 1,
                transform: `scale(${CONTENT_SCALE})`,
                transformOrigin: "top left",
              }}
            >
              {children}
            </div>

            <div
              aria-hidden
              className="absolute left-1/2 z-30 -translate-x-1/2 rounded-full bg-ink"
              style={{
                top: DEVICE.island.top,
                width: DEVICE.island.w,
                height: DEVICE.island.h,
              }}
            />
            <div
              aria-hidden
              className="absolute bottom-[9px] left-1/2 z-30 h-[5px] w-[140px] -translate-x-1/2 rounded-full bg-ink/30"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// The Dynamic Island occupies the top 48pt, so the status bar row is taller than
// it was on the old frame and the glyphs sit either side of the cutout.
export function StatusBar({ dark = false }) {
  const tone = dark ? "text-white/85" : "text-ink/65";
  return (
    <div className={`flex h-[42px] items-center justify-between px-4 text-[11px] font-semibold ${tone}`}>
      <span>9:41</span>
      <span className="flex items-center gap-[3px]" aria-hidden>
        <span className="inline-block h-[7px] w-[3px] rounded-sm bg-current opacity-50" />
        <span className="inline-block h-[9px] w-[3px] rounded-sm bg-current opacity-70" />
        <span className="inline-block h-[11px] w-[3px] rounded-sm bg-current" />
        <span className="ml-1 inline-block h-[9px] w-[17px] rounded-[3px] border border-current">
          <span className="block h-full w-2/3 rounded-[1px] bg-current" />
        </span>
      </span>
    </div>
  );
}

// E / த language switch. Sits in the app bar and in the coloured headers.
export function LangToggle({ dark = false }) {
  const { lang, setLang } = useLang();
  const base =
    "grid h-7 w-7 place-items-center rounded-full text-[12px] font-bold leading-none transition";
  const on = dark ? "bg-white text-brand" : "bg-brand text-white";
  const off = dark ? "text-white/70 hover:text-white" : "text-inkFaint hover:text-ink";

  return (
    <div
      className={`flex shrink-0 items-center gap-0.5 rounded-full p-0.5 ${
        dark ? "bg-white/15" : "bg-mist"
      }`}
      role="group"
      aria-label="Language"
    >
      <button
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        aria-label="English"
        className={`${base} ${lang === "en" ? on : off}`}
      >
        E
      </button>
      <button
        onClick={() => setLang("ta")}
        aria-pressed={lang === "ta"}
        aria-label="தமிழ்"
        className={`${base} font-tamil ${lang === "ta" ? on : off}`}
      >
        த
      </button>
    </div>
  );
}

export function AppBar({ onBack, title, crumb }) {
  const { lang } = useLang();
  return (
    <div className="flex items-center gap-3 border-b border-line bg-white px-4 pb-3 pt-1">
      {onBack ? (
        <button
          onClick={onBack}
          aria-label={lang === "ta" ? "பின் செல்" : "Go back"}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-ink transition hover:border-brand hover:text-brand active:scale-95"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ) : null}
      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-[15px] font-bold text-ink">{title}</p>
        {crumb ? <p className="truncate text-[11px] text-inkFaint">{crumb}</p> : null}
      </div>
      <LangToggle />
    </div>
  );
}

export function Screen({ dir = "forward", children, className = "" }) {
  return (
    <div
      className={`flex h-full flex-col bg-white pb-[10px] ${
        dir === "back" ? "screen-enter-back" : "screen-enter-forward"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function ListRow({ lead, title, sub, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center gap-3 rounded-xl border border-line bg-white px-3 py-3 text-left transition hover:border-brand/40 hover:bg-brandTint/50 active:scale-[0.99]"
    >
      {lead ? (
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg font-display text-[13px] font-bold"
          style={{
            backgroundColor: color ? `${color}1A` : "#EAEFFA",
            color: color || "#16306B",
          }}
        >
          {lead}
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block truncate font-display text-[14px] font-bold leading-snug text-ink">
          {title}
        </span>
        {sub ? <span className="block truncate text-[11.5px] text-inkSoft">{sub}</span> : null}
      </span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className="shrink-0 text-inkFaint transition group-hover:text-brand"
      >
        <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
