// Class 10 — Samacheer Kalvi, chapter titles and counts taken from the SSLC
// textbook index rather than written from memory:
//
//   Tamil    9 இயல், lessons numbered as the book numbers them
//   English  7 units, each with its Prose, Poem and Supplementary reader
//   Maths    8 chapters
//   Science  23 chapters (Physics 1–6, Chemistry 7–11, Biology 12–22, CS 23)
//   Social   27 chapters (History 10, Geography 7, Civics 5, Economics 5)
//
// The chapter titles and their order are the real syllabus. The concepts inside
// each chapter are a teaching selection, not the full sub-topic list, and should
// be reviewed by a subject teacher before this ships to students.

import { tamil } from "./tamil";
import { english } from "./english";
import { maths } from "./maths";
import { science } from "./science";
import { social } from "./social";

export const class10Raw = { tamil, english, maths, science, social };
