"use client";

// Two views of the same app: the phone build and the desktop build.
// The marketing sections (FlowPath, SubjectCarousel, CoverageGrid, Insights, Bands,
// SiteFooter, SocialRail, SiteHeader) are still in /components and can be dropped back in.

import { useState } from "react";
import Logo from "@/components/Logo";
import PhoneDemo from "@/components/PhoneDemo";
import WebDemo from "@/components/WebDemo";

const VIEWS = [
  { id: "app", label: "App" },
  { id: "web", label: "Web" },
];

function ViewToggle({ view, setView, onGrad = false }) {
  return (
    <div
      className={`flex items-center gap-1 rounded-full p-1 ${onGrad ? "bg-white/15" : "bg-mist"}`}
    >
      {VIEWS.map((v) => {
        const active = view === v.id;
        return (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            aria-pressed={active}
            className={`rounded-full px-4 py-1 font-display text-[11.5px] font-bold uppercase tracking-[0.08em] transition ${
              active
                ? onGrad
                  ? "bg-white text-brand"
                  : "bg-brand text-white"
                : onGrad
                ? "text-white/75 hover:text-white"
                : "text-inkFaint hover:text-ink"
            }`}
          >
            {v.label}
          </button>
        );
      })}
    </div>
  );
}

export default function Home() {
  const [view, setView] = useState("app");

  // The web build is a website, so it fills the page with no frame around it.
  if (view === "web") {
    return (
      <main id="top" className="h-[100dvh] overflow-hidden bg-white">
        <WebDemo toolbar={<ViewToggle view={view} setView={setView} />} />
      </main>
    );
  }

  return (
    <main id="top" className="h-[100dvh] overflow-hidden bg-white p-3 sm:p-4">
      <div className="grad-brand relative flex h-full flex-col overflow-hidden rounded-[24px] px-4 py-4 sm:rounded-[32px]">
        <div className="flex shrink-0 items-center justify-between gap-4">
          <Logo size={34} tone="mono" />
          <ViewToggle view={view} setView={setView} onGrad />
        </div>

        <span
          aria-hidden
          className="ghost-word ghost-on-grad absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-[clamp(3rem,10vw,7rem)] sm:block"
        >
          <span className="font-tamil">கல்வி</span> ThunAI
        </span>

        <div className="relative flex min-h-0 flex-1 items-center justify-center">
          <PhoneDemo onGrad reserveY={150} />
        </div>
      </div>
    </main>
  );
}
