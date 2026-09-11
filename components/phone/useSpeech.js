"use client";

import { useEffect, useRef, useState } from "react";

// Speech-to-text using the browser's own recognition engine. Nothing is uploaded
// by us and no key is needed, which matters for a school app: the audio never
// touches our servers.
//
// Support is uneven. Chrome and Edge have it, Android Chrome has it, Firefox does
// not, and iOS Safari only from 14.5. `supported` is false everywhere else, and
// the caller is expected to hide the button rather than show a dead one.

export function useSpeech({ lang = "en", onText } = {}) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const recRef = useRef(null);

  // Held in a ref so changing the callback never has to rebuild the recogniser.
  const onTextRef = useRef(onText);
  onTextRef.current = onText;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = true;
    rec.maxAlternatives = 1;

    rec.onresult = (e) => {
      let text = "";
      for (let i = e.resultIndex; i < e.results.length; i += 1) {
        text += e.results[i][0].transcript;
      }
      const final = e.results[e.results.length - 1]?.isFinal ?? false;
      onTextRef.current?.(text, final);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);

    recRef.current = rec;
    setSupported(true);

    return () => {
      try {
        rec.abort();
      } catch {
        // already stopped
      }
    };
  }, []);

  // Tamil and English are both spoken in these classrooms, so the recogniser
  // follows whichever the student has the app set to.
  useEffect(() => {
    if (recRef.current) recRef.current.lang = lang === "ta" ? "ta-IN" : "en-IN";
  }, [lang]);

  function start() {
    const rec = recRef.current;
    if (!rec || listening) return;
    try {
      rec.start();
      setListening(true);
    } catch {
      // start() throws if it is already running; nothing useful to do here
    }
  }

  function stop() {
    const rec = recRef.current;
    if (!rec) return;
    try {
      rec.stop();
    } catch {
      // already stopped
    }
    setListening(false);
  }

  function toggle() {
    if (listening) stop();
    else start();
  }

  return { supported, listening, start, stop, toggle };
}
