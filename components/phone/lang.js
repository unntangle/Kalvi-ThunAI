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
    en: "A demo sign-in. Nothing is sent and no number is stored.",
    ta: "இது ஒரு மாதிரி உள்நுழைவு. எந்த எண்ணும் சேமிக்கப்படவில்லை.",
  },

  // mobile number
  titleIn: { en: "Sign in with your mobile number", ta: "கைபேசி எண்ணால் உள்நுழையுங்கள்" },
  titleUp: { en: "Create your account", ta: "புதிய கணக்கை உருவாக்குங்கள்" },
  subIn: {
    en: "We send a four digit code. There is no password to remember.",
    ta: "நான்கு இலக்கக் குறியீடு அனுப்பப்படும். கடவுச்சொல் தேவையில்லை.",
  },
  subUp: {
    en: "Your mobile number is the account. We send a four digit code to confirm it.",
    ta: "உங்கள் கைபேசி எண்ணே கணக்கு. அதை உறுதிப்படுத்த ஒரு குறியீடு அனுப்பப்படும்.",
  },
  sendCode: { en: "Send code", ta: "குறியீடு அனுப்பு" },
  errNumber: {
    en: "Enter all ten digits of your mobile number.",
    ta: "பத்து இலக்கங்களையும் உள்ளிடுங்கள்.",
  },

  // code
  enterCode: { en: "Enter the code", ta: "குறியீட்டை உள்ளிடுங்கள்" },
  sentTo: { en: "Sent to", ta: "அனுப்பப்பட்டது" },
  changeNumber: { en: "Change number", ta: "எண்ணை மாற்று" },
  resendIn: { en: "Resend in", ta: "மீண்டும் அனுப்ப" },
  typeAny: {
    en: "Type any four digits to continue.",
    ta: "தொடர ஏதேனும் நான்கு இலக்கங்களை உள்ளிடுங்கள்.",
  },
  verifyOpen: { en: "Verify and open", ta: "சரிபார்த்துத் திற" },
  createAccount: { en: "Create account", ta: "கணக்கை உருவாக்கு" },
  errCode: { en: "The code is four digits long.", ta: "குறியீடு நான்கு இலக்கங்கள்." },

  // class
  signedInAs: { en: "Signed in as", ta: "உள்நுழைந்தவர்" },
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
  rememberThis: { en: "Remember this", ta: "இதை நினைவில் கொள்ளுங்கள்" },
  workedExample: { en: "Worked example", ta: "செய்முறை எடுத்துக்காட்டு" },
  watchExample: { en: "Watch video", ta: "விடியோவைப் பார்" },
  audioVisual: { en: "Audio visual", ta: "ஒளி ஒலி" },
  steps: { en: "steps", ta: "படிகள்" },
  nextConcept: { en: "Next concept", ta: "அடுத்த கருத்து" },
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
  goBack: { en: "Go back", ta: "பின் செல்" },

  // check my work
  checkWork: { en: "Check my work", ta: "என் வேலையைப் பார்" },
  aimAtNotebook: {
    en: "Point the camera at the sum in your notebook.",
    ta: "உங்கள் நோட்டில் உள்ள கணக்கை கேமராவில் காட்டுங்கள்.",
  },
  takePhoto: { en: "Take photo", ta: "படம் எடு" },
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
