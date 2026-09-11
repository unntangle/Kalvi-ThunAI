import Logo from "./Logo";

const COLUMNS = [
  {
    heading: "The app",
    links: ["Classes 6 to 10", "Class 11 and 12 groups", "Tamil", "Maths", "Science", "Accountancy"],
  },
  {
    heading: "For schools",
    links: ["Classroom use", "Teacher dashboard", "Bulk sign-up", "Training"],
  },
  {
    heading: "About",
    links: ["Our approach", "Content team", "Accessibility", "Privacy"],
  },
];

export default function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-line bg-mist">
      <div className="mx-auto max-w-[1180px] px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_repeat(3,0.8fr)_1.2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-[30ch] text-[13.5px] leading-relaxed text-inkSoft">
              A concept learning companion for Tamil Nadu government school students, classes 6 to
              12.
            </p>
          </div>

          {COLUMNS.map((c) => (
            <div key={c.heading}>
              <h3 className="font-display text-[11px] font-bold uppercase tracking-[0.14em] text-inkFaint">
                {c.heading}
              </h3>
              <ul className="mt-3 space-y-2">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#top" className="text-[13.5px] text-ink transition hover:text-brand">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-display text-[11px] font-bold uppercase tracking-[0.14em] text-inkFaint">
              Get in touch
            </h3>
            <p className="mt-3 font-display text-[19px] font-extrabold text-brand">Say hi</p>
            <p className="text-[13.5px] text-ink">hello@kalvithunai.in</p>
            <p className="mt-1 text-[13.5px] text-ink">+91 00000 00000</p>

            <label htmlFor="newsletter" className="mt-6 block text-[13px] font-semibold text-ink">
              Updates for teachers and parents
            </label>
            <div className="mt-2 flex items-center rounded-full border border-line bg-white p-1">
              <input
                id="newsletter"
                type="email"
                placeholder="Your email address"
                className="min-w-0 flex-1 bg-transparent px-4 py-2 text-[13px] text-ink outline-none placeholder:text-inkFaint"
              />
              <button type="button" className="pill pill-brand shrink-0 px-5 py-2 text-[10.5px]">
                Subscribe
              </button>
            </div>
            <p className="mt-2 text-[11px] text-inkFaint">
              The form is part of the concept build and does not send anything yet.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-2 px-6 py-5 text-[12px] text-inkFaint sm:flex-row sm:items-center sm:justify-between">
          <p>A concept build. Sample content shown for review, not published courseware.</p>
          <p>Built by Unntangle</p>
        </div>
      </div>
    </footer>
  );
}
