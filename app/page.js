"use client";

// The page is just the app demo on the gradient panel, with the mark sitting on the panel itself.
// The marketing sections (SiteHeader, FlowPath, SubjectCarousel, CoverageGrid, Insights, Bands,
// SiteFooter, SocialRail) are still in /components and can be dropped back in.

import Logo from "@/components/Logo";
import PhoneDemo from "@/components/PhoneDemo";

export default function Home() {
  return (
    <main id="top" className="h-[100dvh] overflow-hidden bg-white p-3 sm:p-4">
      <div className="grad-brand relative flex h-full items-center justify-center overflow-hidden rounded-[24px] px-4 py-5 sm:rounded-[32px]">
        <div className="absolute left-5 top-5 z-10 sm:left-7 sm:top-6">
          <Logo size={34} tone="mono" />
        </div>

        <span
          aria-hidden
          className="ghost-word ghost-on-grad absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-[clamp(3rem,10vw,7rem)] sm:block"
        >
          <span className="font-tamil">கல்வி</span> ThunAI
        </span>

        <div className="relative flex flex-col items-center">
          <PhoneDemo onGrad reserveY={90} />
        </div>
      </div>
    </main>
  );
}
