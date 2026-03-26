import { useState, useCallback, useRef } from "react";

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  transcript: string;
  isMatch: boolean | null;
  startListening: (targetWord: string) => void;
  reset: () => void;
  supported: boolean;
}

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, "").trim();

export const useSpeechRecognition = (): UseSpeechRecognitionReturn => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isMatch, setIsMatch] = useState<boolean | null>(null);
  const recognitionRef = useRef<any>(null);

  const SpeechRecognition =
    typeof window !== "undefined"
      ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      : null;

  const supported = !!SpeechRecognition;

  const startListening = useCallback(
    (targetWord: string) => {
      if (!SpeechRecognition) return;

      // Stop any existing
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch {}
      }

      setIsMatch(null);
      setTranscript("");
      setIsListening(true);

      const recognition = new SpeechRecognition();
      recognition.lang = "es-ES";
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 3;
      recognitionRef.current = recognition;

      recognition.onresult = (event: any) => {
        const results = event.results[0];
        let matched = false;
        const normalizedTarget = normalize(targetWord);

        for (let i = 0; i < results.length; i++) {
          const heard = normalize(results[i].transcript);
          setTranscript(results[i].transcript);
          if (heard.includes(normalizedTarget) || normalizedTarget.includes(heard)) {
            matched = true;
            break;
          }
        }

        setIsMatch(matched);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        setIsMatch(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    },
    [SpeechRecognition]
  );

  const reset = useCallback(() => {
    setTranscript("");
    setIsMatch(null);
    setIsListening(false);
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    }
  }, []);

  return { isListening, transcript, isMatch, startListening, reset, supported };
};
