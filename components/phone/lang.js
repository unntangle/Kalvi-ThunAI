"use client";

import { createContext, useContext } from "react";

export const LangContext = createContext({ lang: "en", setLang: () => {} });

export function useLang() {
  return useContext(LangContext);
}

// Interface chrome only. Curriculum content in data/ stays as authored, since a real
// build would carry a Tamil and an English version of each concept.
const STR = {
  // welcome
  tagline: { en: "Your AI study companion", ta: "உங்கள் AI கற்றல் துணை" },
  signIn: { en: "Sign in", ta: "உள்நுழை" },
  signUp: { en: "Sign up", ta: "பதிவு செய்" },
  demoNote: {
    en: "A demo sign-in. Nothing is sent and no detail is stored.",
    ta: "இது ஒரு மாதிரி உள்நுழைவு. எந்த விவரமும் சேமிக்கப்படவில்லை.",
  },

  // student details
  titleIn: { en: "Sign in with your details", ta: "உங்கள் விவரங்களால் உள்நுழையுங்கள்" },
  titleUp: { en: "Create your account", ta: "புதிய கணக்கை உருவாக்குங்கள்" },
  subIn: {
    en: "Your name, class and roll number. There is no password to remember.",
    ta: "பெயர், வகுப்பு, வரிசை எண் மட்டும். கடவுச்சொல் தேவையில்லை.",
  },
  subUp: {
    en: "Your name, class and roll number set up the account. Nothing else is needed.",
    ta: "பெயர், வகுப்பு, வரிசை எண் மூலம் கணக்கு உருவாகும். வேறு எதுவும் தேவையில்லை.",
  },
  labelName: { en: "Name", ta: "பெயர்" },
  labelClass: { en: "Class", ta: "வகுப்பு" },
  labelRoll: { en: "Roll number", ta: "வரிசை எண்" },
  phName: { en: "Your full name", ta: "உங்கள் முழுப் பெயர்" },
  phRoll: { en: "e.g. 23", ta: "எ.கா. 23" },
  classHint: { en: "Choose your class", ta: "வகுப்பைத் தேர்ந்தெடுங்கள்" },
  continueWord: { en: "Continue", ta: "தொடரவும்" },
  createAccount: { en: "Create account", ta: "கணக்கை உருவாக்கு" },
  errName: { en: "Enter your name.", ta: "உங்கள் பெயரை உள்ளிடுங்கள்." },
  errClass: { en: "Choose your class.", ta: "உங்கள் வகுப்பைத் தேர்ந்தெடுங்கள்." },
  errRoll: { en: "Enter your roll number.", ta: "வரிசை எண்ணை உள்ளிடுங்கள்." },

  // class
  signedInAs: { en: "Signed in as", ta: "உள்நுழைந்தவர்" },
  rollWord: { en: "Roll", ta: "வரிசை" },
  changeClass: { en: "Change your class", ta: "வகுப்பை மாற்றுங்கள்" },
  whichClass: { en: "Which class are you in?", ta: "நீங்கள் எந்த வகுப்பு?" },
  signOut: { en: "Sign out", ta: "வெளியேறு" },
  groupsBadge: { en: "Groups", ta: "குழுக்கள்" },
  classNote: {
    en: "Content follows the Tamil Nadu state board. Classes 11 and 12 ask for your group next.",
    ta: "தமிழ்நாடு அரசுப் பாடத்திட்டம். 11, 12 வகுப்புகளுக்கு அடுத்து குழுவைத் தேர்ந்தெடுக்கவும்.",
  },

  // group
  whichGroup: { en: "Which group do you study?", ta: "எந்தக் குழுவில் படிக்கிறீர்கள்?" },
  groupSub: {
    en: "Higher secondary subjects depend on the group your school placed you in.",
    ta: "மேல்நிலைப் பாடங்கள் உங்கள் பள்ளி அளித்த குழுவைப் பொறுத்தவை.",
  },
  artsNote: {
    en: "Studying an arts group? That list is a data addition, not a new screen.",
    ta: "கலைக் குழுவா? அந்தப் பட்டியலையும் இதே திரையில் சேர்க்கலாம்.",
  },

  // subject, chapter, concept
  chooseSubject: { en: "Choose a subject", ta: "ஒரு பாடத்தைத் தேர்ந்தெடுங்கள்" },
  chapters: { en: "chapters", ta: "அத்தியாயங்கள்" },
  concepts: { en: "concepts", ta: "கருத்துகள்" },
  conceptsReady: { en: "concepts are ready for this list.", ta: "கருத்துகள் தயாராக உள்ளன." },
  conceptsIn: { en: "Concepts in this chapter", ta: "இந்த அத்தியாயத்தின் கருத்துகள்" },
  chapterWord: { en: "Chapter", ta: "அத்தியாயம்" },
  classWord: { en: "Class", ta: "வகுப்பு" },

  // concept page
  whatItMeans: { en: "What it means", ta: "இதன் பொருள்" },
  goingDeeper: { en: "Going deeper", ta: "கூடுதல் அறிய" },
  commonMistake: { en: "Where students slip", ta: "மாணவர்கள் தவறும் இடம்" },
  tryIt: { en: "Try it yourself", ta: "நீங்களே செய்துப் பாருங்கள்" },
  noAnswerGiven: {
    en: "Work it out before you open the next concept. The answer is not on this page.",
    ta: "அடுத்த கருத்துக்குச் செல்லும் முன் செய்து பாருங்கள். விடை இங்கு தரப்படவில்லை.",
  },
  rememberThis: { en: "Remember this", ta: "இதை நினைவில் கொள்ளுங்கள்" },
  workedExample: { en: "Worked example", ta: "செய்முறை எடுத்துக்காட்டு" },
  watchExample: { en: "Watch video", ta: "விடியோவைப் பார்" },
  audioVisual: { en: "Audio visual", ta: "ஒளி ஒலி" },
  steps: { en: "steps", ta: "படிகள்" },
  stepWord: { en: "Step", ta: "படி" },
  theSum: { en: "The sum", ta: "கணக்கு" },
  nextConcept: { en: "Next concept", ta: "அடுத்த கருத்து" },
  prevConcept: { en: "Previous concept", ta: "முந்தைய கருத்து" },
  backWord: { en: "Back", ta: "பின்" },
  doubtNote: {
    en: "Stuck here? Ask a doubt and a teacher replies within a day.",
    ta: "சந்தேகமா? கேளுங்கள், ஒரு நாளுக்குள் ஆசிரியர் பதிலளிப்பார்.",
  },

  // audio visual player
  narration: {
    en: "Narration plays in Tamil or English inside the app.",
    ta: "செயலிக்குள் தமிழ் அல்லது ஆங்கிலத்தில் விளக்கம் ஒலிக்கும்.",
  },
  play: { en: "Play", ta: "இயக்கு" },
  pause: { en: "Pause", ta: "நிறுத்து" },
  playAgain: { en: "Play again", ta: "மீண்டும் இயக்கு" },
  next: { en: "Next", ta: "அடுத்து" },
  closeExample: { en: "Close the example", ta: "எடுத்துக்காட்டை மூடு" },
  tabVideo: { en: "Video", ta: "விடியோ" },
  tabPhotos: { en: "Photos", ta: "படங்கள்" },
  tabSteps: { en: "Steps", ta: "படிகள்" },
  noVideoYet: {
    en: "No video linked to this concept yet.",
    ta: "இந்தக் கருத்துக்கு விடியோ இன்னும் இணைக்கப்படவில்லை.",
  },
  searchYouTube: { en: "Find one on YouTube", ta: "YouTube இல் தேடு" },
  findingVideo: { en: "Finding a video", ta: "விடியோ தேடப்படுகிறது" },
  goBack: { en: "Go back", ta: "பின் செல்" },

  // check my work
  checkWork: { en: "Check my work", ta: "என் வேலையைப் பார்" },
  aimAtNotebook: {
    en: "Point the camera at the sum in your notebook.",
    ta: "உங்கள் நோட்டில் உள்ள கணக்கை கேமராவில் காட்டுங்கள்.",
  },
  takePhoto: { en: "Take photo", ta: "படம் எடு" },
  uploadPhoto: { en: "Upload photo", ta: "படத்தை பதிவேற்று" },
  chooseFile: {
    en: "Choose a photo of your worked answer.",
    ta: "நீங்கள் எழுதிய வினாவின் படத்தைத் தேர்ந்தெடுங்கள்.",
  },
  readingSteps: { en: "Reading your steps", ta: "உங்கள் படிகளைப் படிக்கிறது" },
  yourWorking: { en: "What you wrote", ta: "நீங்கள் எழுதியது" },
  whereItBroke: { en: "Where it went wrong", ta: "எங்கே தவறியது" },
  whyItHappened: { en: "Why this keeps happening", ta: "ஏன் திரும்பத் திரும்ப நடக்கிறது" },
  rootGap: {
    en: "The gap is older than this chapter. Start here and work forward.",
    ta: "இந்த அத்தியாயத்தில் அல்ல, முந்தைய வகுப்பில் இடைவெளி. இங்கிருந்து தொடங்குங்கள்.",
  },
  openConcept: { en: "Open this concept", ta: "இந்தக் கருத்தைத் திற" },
  noAnswerNote: {
    en: "The final answer is not shown. Work the next step yourself.",
    ta: "விடை காட்டப்படவில்லை. அடுத்த படியை நீங்களே செய்யுங்கள்.",
  },
  fromClass: { en: "Class", ta: "வகுப்பு" },

  // ask a doubt
  askTitle: { en: "Ask a doubt", ta: "சந்தேகம் கேளுங்கள்" },
  askBar: { en: "Ask AI about your doubts", ta: "உங்கள் சந்தேகங்களை AI இடம் கேளுங்கள்" },
  askPlaceholder: { en: "Ask AI about your doubts", ta: "உங்கள் சந்தேகங்களை AI இடம் கேளுங்கள்" },
  askSend: { en: "Send", ta: "அனுப்பு" },
  askIntro: {
    en: "Ask anything about this concept. Answers come from your textbook material, so they match what your teacher taught.",
    ta: "இந்தக் கருத்து பற்றி எதையும் கேட்கலாம். பதில்கள் உங்கள் பாடப்புத்தகத்திலிருந்தே வரும்.",
  },
  askGuard: {
    en: "Answers give the next step, never the final answer.",
    ta: "பதில் அடுத்த படியை மட்டுமே காட்டும், விடையை அல்ல.",
  },

  // voice input
  micStart: { en: "Speak your doubt", ta: "உங்கள் சந்தேகத்தைச் சொல்லுங்கள்" },
  micStop: { en: "Stop recording", ta: "பதிவை நிறுத்து" },
  micListening: { en: "Listening…", ta: "கேட்கிறது…" },
  micHint: {
    en: "Speak clearly, then tap send. Tap the mic again to stop.",
    ta: "தெளிவாகப் பேசுங்கள். நிறுத்த மீண்டும் தட்டுங்கள்.",
  },
};

export function t(key, lang) {
  return STR[key]?.[lang] ?? STR[key]?.en ?? key;
}

// Content labels. Subjects, classes and groups carry both languages in data/,
// so they follow the switch too. Chapter and concept titles stay as authored.
export function pick(en, ta, lang) {
  return lang === "ta" ? ta || en : en;
}

export function subjectName(subject, lang) {
  return pick(subject.name, subject.tamil, lang);
}

export function className(classItem, lang) {
  return lang === "ta" ? classItem.tamil : `Class ${classItem.id}`;
}

export function groupName(group, lang) {
  return pick(group.name, group.tamil, lang);
}
