import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./Languagecontext";

// App language -> speech recognition locale
const SPEECH_LOCALE = { en: "en-IN", hi: "hi-IN", pa: "pa-IN" };

const SpeechRecognition =
  typeof window !== "undefined"
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null;

export default function VoiceInput({ onResult }) {
  const { language, t } = useLanguage();
  const [listening, setListening] = useState(false);
  const recRef = useRef(null);

  // stop mic if component unmounts
  useEffect(() => () => recRef.current?.abort(), []);

  // Browser doesn't support it (e.g. Firefox) -> hide the button
  if (!SpeechRecognition) return null;

  const toggle = () => {
    if (listening) {
      recRef.current?.stop();
      return;
    }
    const rec = new SpeechRecognition();
    rec.lang = SPEECH_LOCALE[language] || "en-IN"; // follows selected language
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onresult = (e) => onResult(e.results[0][0].transcript);
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);

    recRef.current = rec;
    setListening(true);
    rec.start();
  };

  return (
    <button
      type="button"
      className={`voice-btn ${listening ? "listening" : ""}`}
      onClick={toggle}
      title={listening ? t("voiceListening") : t("voiceStart")}
      aria-label={listening ? t("voiceListening") : t("voiceStart")}
    >
      {listening ? (
        <i className="bi bi-stop-fill"></i>
      ) : (
        <i className="bi bi-mic"></i>
      )}
    </button>
  );
}

/* ---------- helpers: clean up what the mic hears ---------- */

// "john at the rate gmail dot com" -> "john@gmail.com"
export function spokenToEmail(text) {
  return text
    .toLowerCase()
    .replace(/\s*\b(at the rate of|at the rate|at)\b\s*/g, "@")
    .replace(/\s*\b(dot|period)\b\s*/g, ".")
    .replace(/\s+/g, "");
}

// "98765 43210" -> "9876543210"
export function spokenToPhone(text) {
  return text.replace(/\D/g, "");
}
