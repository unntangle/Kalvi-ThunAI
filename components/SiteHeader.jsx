"use client";

import Logo from "./Logo";

// Trimmed to the logo only. The utility bar and the section nav were removed along with
// the marketing sections — the components are still in the repo if they come back.
export default function SiteHeader() {
  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-2">
        <a href="#top" aria-label="Kalvi ThunAI home">
          <Logo size={30} />
        </a>
        <span className="hidden font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-inkFaint sm:block">
          Classes 6 to 12 · Tamil Nadu state board
        </span>
      </div>
    </header>
  );
}
