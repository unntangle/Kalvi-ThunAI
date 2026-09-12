"use client";

import { useEffect, useId, useRef, useState } from "react";

// A dropdown drawn in the page rather than by the browser. A native <select>
// paints its list above everything, so on the phone mockup it spills outside the
// device frame. This one lives inside the screen and follows the app palette.
//
// Because it is a button rather than a <select>, the keyboard behaviour a native
// control gets for free has to be written out: a visible focus ring, arrow keys
// to move through the options, Enter to choose, Escape to close.

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
  // Which option the keyboard is sitting on. Separate from `value`: moving down
  // the list must not commit a choice until Enter.
  const [active, setActive] = useState(-1);

  const boxRef = useRef(null);
  const listRef = useRef(null);
  const triggerRef = useRef(null);
  const uid = useId();

  const s = SIZES[size] ?? SIZES.sm;
  const selectedIndex = options.findIndex((o) => o.value === value);
  const selected = selectedIndex >= 0 ? options[selectedIndex] : null;

  const optionId = (i) => `${uid}-opt-${i}`;

  // An invalid field keeps its red hairline even while the list is open, so the
  // reason the form stopped stays visible. The focus-visible colours repeat the
  // tone rather than overriding it, or tabbing to a rejected field would turn
  // the error border blue.
  //
  // focus-visible rather than focus on purpose: this is a button, so a plain
  // focus style would leave the ring stuck on after a mouse click.
  const tone = invalid
    ? "border-alert bg-white focus-visible:border-alert"
    : open
    ? "border-brand bg-white"
    : "border-line bg-mist hover:border-brand/50 focus-visible:border-brand focus-visible:bg-white";

  function openList() {
    setActive(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  }

  function choose(index) {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
    setOpen(false);
    // Focus never left the trigger, so there is nothing to restore.
  }

  // Keep the highlighted option inside the scroll panel when the arrow keys walk
  // past its edge.
  useEffect(() => {
    if (!open || active < 0) return;
    listRef.current?.children?.[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    }
    // On the document rather than the trigger: Safari does not focus a button on
    // click, so after a mouse-open the keydown may never reach the trigger.
    function onEscape(e) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  // Focus stays on the trigger the whole time and the active option is announced
  // through aria-activedescendant, so every key is handled in one place.
  function onKeyDown(e) {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openList();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(active);
        break;
      case "Tab":
        // Let focus move on, but do not leave an orphaned list open behind it.
        setOpen(false);
        break;
      default:
        break;
    }
  }

  return (
    <div ref={boxRef} className="relative mt-1.5">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          // Safari leaves a clicked button unfocused, which would strand the
          // arrow keys after opening the list with the mouse.
          triggerRef.current?.focus();
          if (open) setOpen(false);
          else openList();
        }}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? `${uid}-list` : undefined}
        aria-activedescendant={open && active >= 0 ? optionId(active) : undefined}
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
          ref={listRef}
          id={`${uid}-list`}
          role="listbox"
          aria-label={label}
          className={`absolute left-0 right-0 top-[calc(100%+6px)] z-40 overflow-y-auto rounded-xl border border-line bg-white p-1 shadow-card ${s.panel}`}
        >
          {options.map((o, i) => {
            const on = o.value === value;
            const hot = i === active;
            return (
              <li key={o.value}>
                <button
                  type="button"
                  id={optionId(i)}
                  role="option"
                  aria-selected={on}
                  // Out of the tab order: the trigger owns the keyboard, and
                  // tabbing should leave the field rather than walk the options.
                  tabIndex={-1}
                  onClick={() => choose(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`w-full rounded-lg text-left font-display font-semibold transition ${s.item} ${
                    on
                      ? "bg-brand text-white"
                      : hot
                      ? "bg-brandTint text-ink"
                      : "text-ink hover:bg-brandTint"
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
