import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useEffect } from "react";

interface VoiceButtonProps {
  targetWord: string;
  onMatch: () => void;
  disabled?: boolean;
}

const VoiceButton = ({ targetWord, onMatch, disabled }: VoiceButtonProps) => {
  const { isListening, transcript, isMatch, startListening, reset, supported } = useSpeechRecognition();

  useEffect(() => {
    reset();
  }, [targetWord, reset]);

  useEffect(() => {
    if (isMatch === true) {
      const t = setTimeout(() => onMatch(), 800);
      return () => clearTimeout(t);
    }
  }, [isMatch, onMatch]);

  if (!supported) {
    return (
      <button onClick={onMatch} className="btn-child bg-primary text-primary-foreground text-base">
        Continuar ➡️
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={() => startListening(targetWord)}
        disabled={disabled || isListening || isMatch === true}
        className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg transition-all duration-200 ${
          isListening
            ? "bg-destructive animate-pulse scale-110"
            : isMatch === true
            ? "bg-primary scale-105"
            : isMatch === false
            ? "bg-accent"
            : "bg-secondary"
        } text-secondary-foreground`}
      >
        {isListening ? "🔴" : isMatch === true ? "✅" : "🎤"}
      </button>

      {isMatch === null && !isListening && (
        <p className="text-xs text-muted-foreground font-bold">Toca y di: "{targetWord}"</p>
      )}
      {isListening && (
        <p className="text-xs text-secondary font-bold animate-pulse">Escuchando...</p>
      )}
      {isMatch === true && (
        <p className="text-sm text-primary font-black animate-bounce-in">✅ ¡Muy bien!</p>
      )}
      {isMatch === false && (
        <div className="text-center">
          <p className="text-sm text-destructive font-bold">Intenta de nuevo</p>
          {transcript && (
            <p className="text-xs text-muted-foreground">Escuché: "{transcript}"</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VoiceButton;
