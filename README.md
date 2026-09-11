# Kalvi ThunAI — concept site

A one-page Next.js site that showcases the Kalvi ThunAI study app, with a working phone demo
embedded in the hero. The app covers Tamil Nadu state board classes 6 to 12.

The demo flow:

Sign in (name, class, roll number) → group (11 and 12 only) → subject → chapter → concept →
concept page → audio-visual example.

The class is collected on the sign-in form, so the class picker is skipped on the way in. It is
still there — pressing back from the group or subject screen opens it, which is how a student
switches year.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000

The first `npm run dev` or `npm run build` downloads the Plus Jakarta Sans, Inter and Catamaran
webfonts from Google Fonts, so the machine needs internet access on that first run.

## Using the demo

- Enter any name, tap a class, and enter any roll number. Nothing is sent or stored.
- Classes 6 to 10 go straight to subjects. Classes 11 and 12 ask for the group first.
- On a concept page, the amber button plays the worked example step by step.
- The numbered list in "How it works", and the indigo panel beside it, follow whichever screen
  the phone is on.

## The device frame

The mockup is an iPhone 17 Pro Max at true point size: a 440 × 956pt screen (1320 × 2868 physical
pixels at 460 ppi), 62pt corner radius, a 125 × 37pt Dynamic Island, and the 140 × 5pt home
indicator. Side buttons are drawn on the frame edges.

All of that lives in the `DEVICE` object at the top of `components/phone/Chrome.jsx`. Change those
numbers and the whole frame follows, so swapping to another model is a one-object edit.

The screen designs are authored on a 320pt grid and scaled by 1.375 to fill the 440pt canvas. A
320 × 695.27 box is the same 19.5:9 ratio as the real display, so nothing distorts.

The finished device is then scaled to fit the viewport by `PhoneShell`, which measures
`window.innerHeight` and `window.innerWidth` on mount and on every resize, takes whichever
constraint is tighter, and clamps the result between 0.3 and 0.78. Two props control the margin
it leaves for everything else:

- `reserveY` (default 230) — the header, panel padding, and the control under the phone
- `reserveX` (default 64) — page and panel side padding

Pass different values if you place the phone in a layout with more or less chrome around it.

## The AI feature

The magenta camera button, bottom right of every screen after sign-in, opens the "check my work"
flow in `components/phone/AiCheck.jsx`. It has three phases:

1. **Capture** — a viewfinder pointed at a ruled notebook page. The photo is of the student's own
   attempt, not of the question. That is the difference from every photo-based doubt app.
2. **Reading** — a short pause standing in for the model call.
3. **Diagnosis** — the working is shown with the broken line marked, the misconception is named in
   plain language, and a three-step ladder walks back through earlier years to the concept that
   actually caused it. "Open this concept" jumps straight there, across classes.

The scripted case is a class 8 algebra error, `(x + 3)² = x² + 9`, traced back to class 6. Swap the
`CASE` object at the top of the file to demo a different subject. The ladder is addressed as
`[class, subjectId, chapterIndex, conceptIndex]` and resolves against the real curriculum, so the
concept names and the destination screen are not mocked.

Two deliberate choices worth keeping in a real build: the final answer is never shown, only the
next step, and the diagnosis names the misconception rather than the mistake.

## The audio-visual player

**Video** plays inside the app. When the player opens it lands on the Video tab, and the video
starts on its own.

There are three ways a concept gets its video, checked in that order:

1. **A curated id in the data.** Add a sixth value to the concept tuple in `data/curriculum.js` or
   `data/senior.js` — the YouTube id, the part after `v=` in the watch URL:

   ```js
   ["Closure and commutativity", "Rational numbers stay rational…", "a/b + c/d = (ad + bc) / bd",
    "Take 2/3 and 1/4 | Make the denominators alike | Add to get 11/12", "bar", "abcdefghijk"]
   ```

2. **An automatic lookup.** With no curated id, the player asks `/api/youtube` for one. That route
   queries the YouTube Data API server side using the class, subject and concept name, filtered to
   videos that actually allow embedding, with safe search on. The channel name is shown under the
   player so the source is always visible. Results are cached in memory for six hours to stay inside
   the API quota.

3. **A pasted link**, for evaluating videos before curating them.

### Setting up the lookup

Copy `.env.example` to `.env.local` and add a YouTube Data API v3 key. Create one in the Google
Cloud console under APIs and Services, enable the YouTube Data API v3, and restrict the key to that
API. Set `YOUTUBE_CHANNEL_ID` as well to confine every lookup to a single channel.

Without a key nothing breaks — the Video tab shows a search link and the paste field, and the Steps
tab still works.

### Which source to use

The automatic lookup is right for a demo and for filling gaps. For anything that ships, curate the
ids: an automatic search will occasionally return the wrong lesson or a coaching advert, and neither
belongs on a government school concept page. Scoping the lookup to KalviTV Official, the Government
of Tamil Nadu's own channel at `youtube.com/c/kalvitvofficial`, gets most of the way there, since it
covers classes 1 to 12 on the same syllabus.

**Steps** is the drawn animation — SVG rendered on the device, no streaming, which is why it still
works on a weak connection. It stays available on every concept, video or not.

## Colour

The palette is built for the conditions this app actually runs in: budget Android phones, low
screen brightness, scratched glass, and reading outdoors.

| Token | Value | Used for |
| --- | --- | --- |
| `.grad-brand` | `#3452D6 → #1C8BE6 → #17C3D4` | the hero panel, app headers, the flow panel |
| `brand` | `#2246C7` | solid blue where white text needs contrast |
| `brandSoft` | `#1668C4` | links, active input borders |
| `brandTint` | `#E9F2FD` | selected rows, chips, keypad hover |
| `.grad-accent` | `#8B2FD6 → #E14FC0` | the AV button, the play control, active step |
| `accent` | `#F2A413` | the rule card on a concept page |
| `accentPale` | `#FBEFA8` | yellow used as text on the gradient |
| `ink` | `#0E1424` | body text, the black pill, device bezel |
| `inkSoft` | `#4A5168` | secondary copy |
| `mist` | `#F4F7FB` | alternating section backgrounds |
| `line` | `#DCE3EE` | hairline borders |
| `night` | `#0C1424` | the audio-visual overlay |

Rules worth keeping:

- The gradient lives on surfaces, never on text. The cyan end is far too light to carry type.
- Text on the gradient is white or `accentPale`. Nothing else passes.
- The magenta pill is reserved for the one action that must be found on a screen. If it starts
  appearing three times on a page it has stopped working.
- Subject colour lives only on chips and rules, never as a screen background.
- Avoided deliberately: saffron with green, and red with black, both of which read as political
  statements in Tamil Nadu rather than as design choices.

Dark mode values are noted in the colour table of the design conversation and are not wired up
yet — see "Not built yet" below.

## Content structure

Junior content (classes 6 to 9) lives in `data/curriculum.js`. Classes 11 and 12 live in
`data/senior.js`. Class 10 lives in `data/class10/`, one file per subject, and is merged in
last. All three use the same shape:

```js
["Chapter title", [
  ["Concept name", "One line on what it means", "The rule to remember",
   "step one | step two | step three", "bar"],
]]
```

The last value picks the animation in the audio-visual player: `bar`, `grid`, `cycle`, `stack`
or `map`.

### How much is shown

`LIMITS` in `curriculum.js` caps how much of each subject the app displays:

```js
export const LIMITS = { chapters: Infinity, concepts: Infinity };
```

It is currently off, so everything in the data is browsable. Set both to 5 for a
trimmed demo — because the data is stored in SCERT's printed order, that shows chapters 1 to 5
of the real syllabus rather than a hand-picked set. Nothing else has to change.

`syllabusCounts(classId, subjectId)` returns the untruncated chapter and concept totals, so a
screen can say "showing 5 of 23 chapters" if you want the slice to be visible to the student.

### Class 10

Class 10 is the only year whose chapter list is taken from the real SSLC textbook index rather
than written as a sample. Chapter titles, their order and their counts match the 2018 revision:

| Subject | Chapters | Concepts | Notes |
| --- | --- | --- | --- |
| Maths | 8 | 64 | sub-topics as the textbook lists them |
| Science | 23 | 129 | Physics 1–6, Chemistry 7–11, Biology 12–22, Computer Science 23 |
| Tamil | 9 இயல் | 49 | lessons numbered as the book numbers them, so 1.1, 1.2 line up |
| English | 7 units | 21 | each unit carries its Prose, Poem and Supplementary reader |
| Social Science | 27 | 54 | History 10, Geography 7, Civics 5, Economics 5, branch named in the title |

Maths and Science carry the full sub-topic list. Tamil, English and Social Science carry every
real chapter but a teaching selection of concepts inside each, not the complete sub-topic list.

The **concepts inside each chapter are a teaching selection, not the full sub-topic list**, and
have not been checked by a subject teacher. The Tamil literature entries deliberately describe
the text and how to approach it rather than paraphrasing the poems. Get all of this reviewed
before it goes in front of students.

### Known gaps against the real syllabus

The model in `data/curriculum.js` does not yet match the state board in five places:

- **Biology is two subjects in 11 and 12.** Botany and Zoology have separate books and separate
  board papers. `GROUPS` still carries a single `biology` entry.
- **Classes 6 to 8 Science and Social Science come in three term volumes**, each with its own
  chapter numbering, so "Chapter 1" occurs three times in a year. The model assumes one
  continuous list per subject.
- **Part I is not always Tamil.** French, Hindi, Sanskrit, Urdu, Telugu, Kannada and Malayalam
  are all options.
- **The commerce group's fourth subject varies** between Business Maths and Statistics and
  Computer Applications.
- **Arts and vocational groups are missing**, and are common in government schools.

Computer Science and Computer Applications are also two different subjects in 11 and 12, not one
renamed.

`curriculum.js` also holds the structural exports:

- `CLASSES` — classes 6 to 12
- `SUBJECTS` — the full subject catalogue, each with its chip colour
- `CORE_SUBJECTS` — what classes 6 to 10 study
- `GROUPS` — biology, computer science and commerce, each listing its six subjects
- `subjectsFor(classId, groupId)` — the subject list for any class
- `hasGroups(classId)` — true from class 11 up

To add an arts group, append one entry to `GROUPS` and add chapters for history, political
science and geography in `senior.js`. No screen changes are needed.

## Where things live

```
app/
  layout.js            fonts + metadata
  page.js              the page, holds the demo's current screen for the flow highlight
  globals.css          tokens, ghost headings, pills, round buttons, screen transitions
components/
  SiteHeader.jsx       utility bar + sticky nav
  SocialRail.jsx       fixed contact rail on the right edge
  PhoneDemo.jsx        the state machine, including the group detour for 11 and 12
  FlowPath.jsx         numbered 01–06 list, active step raised on a white card
  SubjectCarousel.jsx  horizontally scrolling subject cards, one per subject
  CoverageGrid.jsx     class by class table of subjects, chapters and concepts
  Insights.jsx         colour-tile and colour-band article mosaic
  Bands.jsx            aligned-to tile grid + the four promise columns
  SiteFooter.jsx       link columns, contact, newsletter
  Logo.jsx             dotted mark + wordmark
  phone/
    Chrome.jsx         device shell, status bar, app bar, list row
    Select.jsx         in-frame dropdown, used by the sign-in form
    SignInScreen.jsx   name, class and roll number
    ClassScreen.jsx    classes 6 to 12, also used to switch year
    GroupScreen.jsx    biology, computer science, commerce
    SubjectScreen.jsx  the subjects that class actually studies
    ChapterScreen.jsx  chapter list with a subject dropdown
    ConceptScreen.jsx  concept list with a chapter dropdown
    ConceptDetail.jsx  meaning, rule, worked example, AV button
    AvPlayer.jsx       the step-through audio-visual overlay
data/
  curriculum.js        classes 6 to 9, plus all structural exports
  senior.js            classes 11 and 12
  class10/             class 10, one file per subject, real SSLC chapter list
```

## Not built yet

Dark mode, real authentication, a content CMS, recorded narration, progress tracking, the arts
group, the teacher dashboard, and the newsletter and contact forms. The screens are ready for
all of them.
