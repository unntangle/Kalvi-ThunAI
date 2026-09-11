"use client";

import { useEffect, useRef, useState } from "react";
import { StatusBar } from "./Chrome";
import Figure, { figureCaption } from "./Figure";
import { t, useLang } from "./lang";

// Put a YouTube id here and every concept without its own video plays it. Useful for
// demoing the player before any videos are curated. Leave empty in production.
const DEMO_VIDEO_ID = "smRJoM6T0EQ";

// Set by pasting a link in the player. Lives for the page session and applies to every
// concept, so one paste is enough to demo the whole flow.
let sessionVideoId = "";

export default function AvPlayer({ concept, classItem, subject, onClose, web = false }) {
  const { lang } = useLang();
  const steps = concept.steps;

  // A concept with a full worked sum drives the Steps tab from that instead of the
  // three-line summary. The sum is what a student would actually write down.
  const work = concept.work?.lines?.length ? concept.work : null;
  const total = work ? work.lines.length : steps.length;

  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState("video");
  const [pasted, setPasted] = useState("");
  const [linkField, setLinkField] = useState("");
  const [auto, setAuto] = useState({ status: "idle" });
  const requested = useRef("");

  // The generic step animation was built for worked sums, so it stays on the maths
  // subjects. Any concept that carries a full worked sum of its own gets the tab
  // too, which is how the physics numericals show up here.
  const STEP_SUBJECTS = ["maths", "busmaths"];
  const hasSteps = Boolean(work) || (subject ? STEP_SUBJECTS.includes(subject.id) : false);

  // Demo affordance: paste any YouTube link to preview it in place. In a real build the
  // id comes from the concept data instead.
  function parseYouTube(value) {
    const v = value.trim();
    if (!v) return "";
    const patterns = [
      /youtu\.be\/([A-Za-z0-9_-]{11})/,
      /[?&]v=([A-Za-z0-9_-]{11})/,
      /\/embed\/([A-Za-z0-9_-]{11})/,
      /\/shorts\/([A-Za-z0-9_-]{11})/,
      /^([A-Za-z0-9_-]{11})$/,
    ];
    for (const p of patterns) {
      const m = v.match(p);
      if (m) return m[1];
    }
    return "";
  }

  const videoId =
    concept.video || pasted || sessionVideoId || auto.videoId || DEMO_VIDEO_ID || "";

  // No curated id yet? Send the student to a real YouTube search scoped to their
  // class, subject and concept rather than to a dead embed.
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    [
      "Samacheer Kalvi",
      classItem ? `class ${classItem.id}` : "",
      subject ? subject.name : "",
      concept.name,
      lang === "ta" ? "Tamil" : "",
    ]
      .filter(Boolean)
      .join(" ")
  )}`;

  // If the concept has no curated id, ask the server to find an embeddable one.
  // The query itself is the guard, so this fires once per concept and is not
  // restarted by its own state updates.
  useEffect(() => {
    if (concept.video || pasted || sessionVideoId || DEMO_VIDEO_ID) return;

    const query = [
      "Samacheer Kalvi",
      classItem ? `class ${classItem.id}` : "",
      subject ? subject.name : "",
      concept.name,
      lang === "ta" ? "Tamil" : "",
    ]
      .filter(Boolean)
      .join(" ");

    if (requested.current === query) return;
    requested.current = query;

    setAuto({ status: "loading" });

    // No cancellation flag here on purpose. React StrictMode runs effects twice in
    // development: the first pass would set the flag in its cleanup and the response
    // from that pass would be thrown away, leaving the player loading forever.
    fetch(`/api/youtube?q=${encodeURIComponent(query)}`)
      .then((r) => (r.ok ? r.json() : { configured: true, error: `HTTP ${r.status}` }))
      .then((d) => {
        if (!d.configured) setAuto({ status: "unconfigured" });
        else if (d.videoId) setAuto({ status: "ready", ...d });
        else setAuto({ status: "empty", note: d.error });
      })
      .catch(() => setAuto({ status: "error" }));
  }, [concept.video, concept.name, classItem, subject, lang, pasted]);

  // One shape for both cases: a worked sum gives [line, note] rows, and a concept
  // without one falls back to its three step sentences with no note.
  const timeline = work ? work.lines : steps.map((s) => [s, null]);

  // Timing for the reveal, staged so each step reads as three separate beats:
  // the node appears, its text follows, then the rail travels to the next node.
  const badgeMs = 340; // the numbered node popping in
  const textMs = 500; // its line and reason fading up
  const lineMs = 800; // the rail travelling to the next node
  const holdMs = work ? 1400 : 1150; // reading time before the rail sets off again

  // The list mounts with everything hidden and only flips on the next frame.
  // Without this, item 1 renders in its final state on the very first paint, so
  // the browser has nothing to transition from and it simply appears.
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (mode !== "steps") {
      setStarted(false);
      return;
    }
    const id = setTimeout(() => setStarted(true), 40);
    return () => clearTimeout(id);
  }, [mode]);

  // The reveal runs on its own. There is no play control: the student opens the
  // tab and the working writes itself out, the way a teacher fills a board.
  useEffect(() => {
    if (!hasSteps || mode !== "steps" || !started) return;
    if (index >= total - 1) return;
    // The first node has no rail to wait for, so it skips that beat.
    const delay = (index === 0 ? 0 : lineMs) + badgeMs + textMs + holdMs;
    const timer = setTimeout(() => setIndex((i) => i + 1), delay);
    return () => clearTimeout(timer);
  }, [mode, started, index, total, badgeMs, textMs, lineMs, holdMs, hasSteps]);

  // Start again from the top whenever the tab is opened. This is done in the tab
  // handler rather than an effect on purpose: an effect resets one render too
  // late, so the rail renders once at its old height and then animates backwards
  // down to zero before starting again.

  const showVideo = !hasSteps || mode === "video";

  // Photos = the drawn diagrams for this concept, plus any curated photographs.
  // Every subject can have these, not just the maths ones.
  const gallery = [
    ...(concept.figures ?? []).map((n) => ({ kind: "figure", name: n })),
    ...(concept.images ?? []).map((im) => ({ kind: "image", ...im })),
  ];
  const hasPhotos = gallery.length > 0;

  const TABS = [
    { id: "video", label: t("tabVideo", lang), show: true },
    { id: "photos", label: t("tabPhotos", lang), show: hasPhotos },
    { id: "steps", label: t("tabSteps", lang), show: hasSteps },
  ].filter((tab) => tab.show);

  const active = mode === "steps" && !hasSteps ? "video" : mode;

  return (
    <div className="sheet-enter absolute inset-0 z-40 flex flex-col bg-night text-white">
      {web ? null : <StatusBar dark />}
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

      {TABS.length > 1 ? (
        <div className="mx-5 flex gap-1 rounded-full bg-white/10 p-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setMode(tab.id);
                setIndex(0);
              }}
              aria-pressed={active === tab.id}
              className={`flex-1 rounded-full py-1.5 font-display text-[12px] font-bold transition ${
                active === tab.id ? "bg-white text-ink" : "text-white/65 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="flex flex-1 items-start px-3 pt-1">
      {active === "photos" ? (
        /* Every diagram for this concept, scrollable, each with its caption.
           Drawn on the device, so the gallery costs no bandwidth. */
        <div className="h-full w-full overflow-y-auto py-1">
          <div className="space-y-3">
            {gallery.map((item, i) =>
              item.kind === "figure" ? (
                <figure key={`f${i}`} className="rounded-2xl border border-nightLine bg-nightSoft p-3">
                  <Figure name={item.name} tone="dark" bare />
                  <figcaption className="mt-2 border-t border-nightLine pt-2 text-[11.5px] leading-relaxed text-white/55">
                    {figureCaption(item.name, lang)}
                  </figcaption>
                </figure>
              ) : (
                <figure key={`i${i}`} className="overflow-hidden rounded-2xl border border-nightLine bg-nightSoft">
                  {/* Curated photographs. Plain img on purpose: these are remote
                      URLs, not files in the project. */}
                  <img src={item.src} alt={item.caption ?? concept.name} className="w-full" />
                  <figcaption className="px-3 py-2 text-[11.5px] leading-relaxed text-white/55">
                    {item.caption}
                    {item.credit ? <span className="text-white/30"> · {item.credit}</span> : null}
                  </figcaption>
                </figure>
              )
            )}
          </div>
        </div>
      ) : showVideo ? (
        <div className="w-full overflow-hidden rounded-2xl border border-nightLine bg-black">
          {videoId ? (
            <>
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&autoplay=1&hl=${lang}`}
                  title={concept.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
              {auto.status === "ready" && !concept.video && !pasted ? (
                <p className="truncate px-3 py-2 text-[10.5px] text-white/45">{auto.channel}</p>
              ) : null}
            </>
          ) : auto.status === "loading" ? (
            <div className="flex flex-col items-center gap-3 px-5 py-10">
              <span className="flex h-4 items-end gap-1" aria-hidden>
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="wave-bar w-[3px] rounded-full bg-cyan"
                    style={{ height: "16px", animationDelay: `${i * 90}ms` }}
                  />
                ))}
              </span>
              <p className="text-[12px] text-white/50">{t("findingVideo", lang)}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 px-5 py-7 text-center">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden className="text-white/35">
                <rect x="3" y="5" width="18" height="14" rx="4" stroke="currentColor" strokeWidth="1.6" />
                <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" />
              </svg>
              <p className="text-[12px] leading-relaxed text-white/50">{t("noVideoYet", lang)}</p>
              <a
                href={searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-full bg-white py-2 text-center font-display text-[12px] font-bold text-ink transition hover:bg-white/90"
              >
                {t("searchYouTube", lang)}
              </a>
              <div className="flex w-full items-center gap-2">
                <input
                  value={linkField}
                  onChange={(e) => setLinkField(e.target.value)}
                  placeholder="Paste a YouTube link"
                  className="min-w-0 flex-1 rounded-full border border-white/25 bg-white/5 px-3 py-2 text-[11.5px] text-white outline-none placeholder:text-white/35"
                />
                <button
                  onClick={() => {
                    const id = parseYouTube(linkField);
                    if (!id) return;
                    sessionVideoId = id;
                    setPasted(id);
                  }}
                  className="shrink-0 rounded-full bg-white px-3 py-2 font-display text-[11.5px] font-bold text-ink transition hover:bg-white/90"
                >
                  {t("play", lang)}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="h-full w-full overflow-y-auto py-1">
          <div className="rounded-2xl border border-nightLine bg-nightSoft p-4">
            {work ? (
              <>
                <p className="font-display text-[10.5px] font-bold uppercase tracking-[0.14em] text-white/40">
                  {t("theSum", lang)}
                </p>
                <p className="mt-1 font-display text-[13.5px] font-semibold leading-snug text-white">
                  {work.question}
                </p>
              </>
            ) : (
              <p className="font-display text-[10.5px] font-bold uppercase tracking-[0.14em] text-white/40">
                {t("workedExample", lang)}
              </p>
            )}

            {/* Each step is staged: node, then text, then the rail down to the next
                node. The rail is drawn per gap so a segment runs exactly from one
                node to the next and can be scaled from its top edge. */}
            <ol className="relative mt-4 border-t border-nightLine pt-4">
              {timeline.map(([line, note], i) => {
                const shown = started && i <= index;
                const last = i === timeline.length - 1;

                // The first node arrives straight away. Every later one waits for
                // the rail to reach it, and its text waits for the node.
                const nodeAt = i === 0 ? 0 : lineMs;
                const textAt = nodeAt + badgeMs;

                return (
                  <li key={i} className={`relative pl-8 ${last ? "pb-0" : "pb-5"}`}>
                    {!last ? (
                      <>
                        <span
                          aria-hidden
                          className="absolute bottom-0 left-[10px] top-[22px] w-[2px] rounded-full bg-nightLine"
                          style={{
                            opacity: shown ? 1 : 0,
                            transition: `opacity 300ms ease ${nodeAt}ms`,
                          }}
                        />
                        <span
                          aria-hidden
                          className="absolute bottom-0 left-[10px] top-[22px] w-[2px] origin-top rounded-full bg-cyan"
                          style={{
                            transform: `scaleY(${i < index ? 1 : 0})`,
                            transition: `transform ${lineMs}ms linear`,
                          }}
                        />
                      </>
                    ) : null}

                    {/* ring-nightSoft matches the card behind, so the ring punches a
                       clean gap in the rail rather than letting it run through the
                       node. */}
                    <span
                      className="absolute left-0 top-0 z-10 grid h-[22px] w-[22px] place-items-center rounded-full bg-cyan font-display text-[10px] font-bold text-night ring-4 ring-nightSoft"
                      style={{
                        opacity: shown ? 1 : 0,
                        transform: shown ? "scale(1)" : "scale(0.5)",
                        transition: `opacity ${badgeMs}ms ease ${nodeAt}ms, transform ${badgeMs}ms cubic-bezier(.34,1.56,.64,1) ${nodeAt}ms`,
                      }}
                    >
                      {i + 1}
                    </span>

                    <div
                      style={{
                        opacity: shown ? 1 : 0,
                        transform: shown ? "translateY(0)" : "translateY(6px)",
                        transition: `opacity ${textMs}ms ease ${textAt}ms, transform ${textMs}ms ease ${textAt}ms`,
                      }}
                    >
                      <p className="font-display text-[14px] font-semibold leading-snug text-white">
                        {line}
                      </p>
                      {note ? (
                        <p className="mt-1 text-[11.5px] leading-relaxed text-cyan/85">{note}</p>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      )}
      </div>

      {/* No footer on any tab. The Steps reveal runs itself, and the X in the
          header is how the player closes. */}
      <div className="pb-3" aria-hidden />
    </div>
  );
}
