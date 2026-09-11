"use client";

import { useEffect, useState } from "react";
import { hasGroups } from "@/data/curriculum";
import { LangContext } from "./phone/lang";
import { PhoneShell } from "./phone/Chrome";
import OtpScreen from "./phone/OtpScreen";
import ClassScreen from "./phone/ClassScreen";
import GroupScreen from "./phone/GroupScreen";
import SubjectScreen from "./phone/SubjectScreen";
import ChapterScreen from "./phone/ChapterScreen";
import ConceptScreen from "./phone/ConceptScreen";
import ConceptDetail from "./phone/ConceptDetail";
import AvPlayer from "./phone/AvPlayer";
import AiCheck from "./phone/AiCheck";

export default function PhoneDemo({ onStageChange, onGrad = false, reserveY }) {
  const [lang, setLang] = useState("en");
  const [stage, setStage] = useState("auth");
  const [dir, setDir] = useState("forward");
  const [phone, setPhone] = useState("");
  const [classItem, setClassItem] = useState(null);
  const [group, setGroup] = useState(null);
  const [subject, setSubject] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [concept, setConcept] = useState(null);
  const [avOpen, setAvOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  useEffect(() => {
    onStageChange?.(stage);
  }, [stage, onStageChange]);

  // The group screen only exists for classes 11 and 12, so the stack is built per class.
  function order() {
    const withGroup = classItem && hasGroups(classItem.id);
    return withGroup
      ? ["auth", "class", "group", "subject", "chapter", "concept", "detail"]
      : ["auth", "class", "subject", "chapter", "concept", "detail"];
  }

  function forward(next) {
    setDir("forward");
    setStage(next);
  }

  function back() {
    const list = order();
    const i = list.indexOf(stage);
    setDir("back");
    setStage(list[Math.max(0, i - 1)]);
  }

  function reset() {
    setDir("back");
    setStage("auth");
    setPhone("");
    setClassItem(null);
    setGroup(null);
    setSubject(null);
    setChapter(null);
    setConcept(null);
    setAvOpen(false);
    setAiOpen(false);
  }

  // The AI check can land the student on any concept in any year, so it sets the
  // whole path at once rather than walking the stack.
  function openConcept(target) {
    setAiOpen(false);
    setClassItem(target.classItem);
    setGroup(null);
    setSubject(target.subject);
    setChapter(target.chapter);
    setConcept(target.concept);
    setDir("forward");
    setStage("detail");
  }

  const nextConcept =
    chapter && concept
      ? chapter.concepts[chapter.concepts.findIndex((c) => c.id === concept.id) + 1]
      : null;

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <div className="flex flex-col items-center">
        <PhoneShell onGrad={onGrad} reserveY={reserveY}>
        {stage === "auth" && (
          <OtpScreen
            onDone={(numValue) => {
              setPhone(numValue);
              forward("class");
            }}
          />
        )}

        {stage === "class" && (
          <ClassScreen
            dir={dir}
            phone={phone}
            onSignOut={reset}
            onPick={(c) => {
              setClassItem(c);
              setGroup(null);
              forward(hasGroups(c.id) ? "group" : "subject");
            }}
          />
        )}

        {stage === "group" && classItem && (
          <GroupScreen
            dir={dir}
            classItem={classItem}
            onBack={back}
            onPick={(g) => {
              setGroup(g);
              forward("subject");
            }}
          />
        )}

        {stage === "subject" && classItem && (
          <SubjectScreen
            dir={dir}
            classItem={classItem}
            group={group}
            onBack={back}
            onPick={(s) => {
              setSubject(s);
              forward("chapter");
            }}
          />
        )}

        {stage === "chapter" && classItem && subject && (
          <ChapterScreen
            dir={dir}
            classItem={classItem}
            group={group}
            subject={subject}
            onBack={back}
            onSwitchSubject={(s) => setSubject(s)}
            onPick={(ch) => {
              setChapter(ch);
              forward("concept");
            }}
          />
        )}

        {stage === "concept" && classItem && subject && chapter && (
          <ConceptScreen
            dir={dir}
            classItem={classItem}
            subject={subject}
            chapter={chapter}
            onBack={back}
            onSwitchChapter={(ch) => setChapter(ch)}
            onPick={(c) => {
              setConcept(c);
              forward("detail");
            }}
          />
        )}

        {stage === "detail" && concept && (
          <ConceptDetail
            dir={dir}
            classItem={classItem}
            subject={subject}
            chapter={chapter}
            concept={concept}
            onBack={back}
            onPlay={() => setAvOpen(true)}
            onNext={nextConcept ? () => setConcept(nextConcept) : null}
          />
        )}

        {avOpen && concept ? <AvPlayer concept={concept} onClose={() => setAvOpen(false)} /> : null}

        {aiOpen ? (
          <AiCheck onClose={() => setAiOpen(false)} onOpenConcept={openConcept} />
        ) : null}

        {stage !== "auth" && !avOpen && !aiOpen ? (
          <button
            onClick={() => setAiOpen(true)}
            aria-label="Check my work"
            className="absolute bottom-6 right-4 z-30 grid h-14 w-14 place-items-center rounded-full bg-brand text-white shadow-card transition hover:bg-brandSoft active:scale-95"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M4 8h3l1.5-2h7L17 8h3v11H4z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="13" r="3.4" stroke="currentColor" strokeWidth="1.7" />
            </svg>
          </button>
        ) : null}
        </PhoneShell>
      </div>
    </LangContext.Provider>
  );
}
