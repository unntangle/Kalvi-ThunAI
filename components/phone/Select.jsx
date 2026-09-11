"use client";

import { useEffect, useRef, useState } from "react";

// A dropdown drawn in the page rather than by the browser. A native <select>
// paints its list above everything, so on the phone mockup it spills outside the
// device frame. This one lives inside the screen and follows the app palette.

const SIZES = {
  sm: {
    trigger: "px-3.5 py-2.5 text-[15px]",
    item: "px-3 py-2 text-[14px]",
    panel: "max-h-[190px]",
    chevron: 14,
  },
  md: {
    trigger: "px-4 py-3 text-[16px]",
    item: "px-3.5 py-2.5 text-[15px]",
    panel: "max-h-[250px]",
    chevron: 16,
  },
};

export default function Select({
  value,
  onChange,
  options,
  placeholder,
  label,
  size = "sm",
  invalid = false,
  textClass = "",
}) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  const s = SIZES[size] ?? SIZES.sm;
  const selected = options.find((o) => o.value === value) ?? null;

  // An invalid field keeps its red hairline even while the list is open, so the
  // reason the form stopped stays visible.
  const tone = invalid
    ? "border-alert bg-white"
    : open
    ? "border-brand bg-white"
    : "border-line bg-mist hover:border-brand/50";

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    }
    function onKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={boxRef} className="relative mt-1.5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        aria-invalid={invalid}
        className={`flex w-full items-center justify-between gap-2 rounded-xl border font-display font-semibold outline-none transition ${
          s.trigger
        } ${tone} ${selected ? "text-ink" : "text-inkFaint"} ${textClass}`}
      >
        <span className="truncate">{selected ? selected.label : placeholder}</span>
        <svg
          width={s.chevron}
          height={s.chevron}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className={`shrink-0 text-inkFaint transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label={label}
          className={`absolute left-0 right-0 top-[calc(100%+6px)] z-40 overflow-y-auto rounded-xl border border-line bg-white p-1 shadow-card ${s.panel}`}
        >
          {options.map((o) => {
            const on = o.value === value;
            return (
              <li key={o.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={on}
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`w-full rounded-lg text-left font-display font-semibold transition ${s.item} ${
                    on ? "bg-brand text-white" : "text-ink hover:bg-brandTint"
                  } ${textClass}`}
                >
                  {o.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
