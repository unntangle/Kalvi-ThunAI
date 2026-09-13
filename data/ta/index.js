// Tamil curriculum content.
//
// The English data in data/curriculum.js, data/senior.js and data/class10/ is the
// source of truth for structure: which chapters exist, in what order, and which
// concepts sit inside them. This directory only supplies Tamil wording for what
// is already there.
//
// Everything is keyed by the ids that curriculum.js generates:
//
//   chapter   `<class>-<subject>-<chapterNumber>`          e.g. 10-maths-2
//   concept   `<class>-<subject>-<chapter>-<concept>`      e.g. 10-maths-2-1
//
// Keeping the two languages in separate files means the English files are never
// edited to add Tamil, a translator can work on one subject without touching the
// rest, and an untranslated concept falls back to English on its own rather than
// showing a blank page. Ids depend on chapter and concept ORDER, so reordering a
// chapter in the English data silently re-points its translation. Add new
// chapters at the end, or update the ids here in the same commit.
//
// A concept entry may supply any subset of:
//   name, summary, formula, steps[], deeper, mistake, tryIt, work{question, lines[]}
// Anything left out falls back to the English value for that one field.
//
// Two subjects are deliberately not translated:
//   tamil    already written in Tamil
//   english  the grammar examples stop teaching anything if translated

import * as class10Maths from "./class10-maths";
import * as class10Science from "./class10-science";
import * as class10Social from "./class10-social";
import * as classes6to9 from "./classes-6-9";
import * as senior from "./senior";

const PACKS = [classes6to9, class10Maths, class10Science, class10Social, senior];

function merge(key) {
  const out = {};
  PACKS.forEach((pack) => Object.assign(out, pack[key] ?? {}));
  return out;
}

export const taChapters = merge("chapters");
export const taConcepts = merge("concepts");

// How much Tamil exists. Read by the dev check below, and available to any admin
// view that wants to report coverage.
export const taCoverage = {
  chapters: Object.keys(taChapters).length,
  concepts: Object.keys(taConcepts).length,
  packs: PACKS.length,
};

// Fail loudly in development rather than quietly serving English.
//
// Every field falls back to English when a translation is missing, which is the
// right behaviour for a half-finished pack but makes total failure invisible: a
// bad import, a stale .next bundle and a renamed id all look identical to "not
// translated yet". These checks turn that silence into a console message.
//
// The spot check uses Class 10 Science 1.1 because it is the concept furthest
// from the id generator's simplest case. If that one resolves, the wiring holds.
if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
  if (taCoverage.concepts === 0) {
    console.error(
      "[ta] No Tamil concepts merged. A pack failed to import, or the bundle is stale. " +
        "Stop the dev server, delete .next, and start it again."
    );
  } else if (!taConcepts["10-science-1-1"]) {
    console.error(
      "[ta] Packs loaded but 10-science-1-1 is missing. An id no longer matches the " +
        "chapter or concept order in data/class10/science.js."
    );
  } else {
    console.info(
      `[ta] Tamil loaded: ${taCoverage.chapters} chapters, ${taCoverage.concepts} concepts, ` +
        `${taCoverage.packs} packs.`
    );
  }
}
