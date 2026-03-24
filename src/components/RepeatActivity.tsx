import { useState, useEffect } from "react";
import { speakSyllable, speakWord, speakCelebration } from "@/lib/speech";
import { getLevel, recordResult, getLevelLabel, type DifficultyLevel } from "@/lib/adaptive";

interface RepeatActivityProps {
  onBack: () => void;
  onPoints: (pts: number) => void;
}

type Phrase = { text: string; syllables: string[]; emoji: string };

const phrasesByLevel: Record<DifficultyLevel, Phrase[]> = {
  1: [
    { text: "Ma-má", syllables: ["Ma", "má"], emoji: "👩" },
    { text: "Pa-pá", syllables: ["Pa", "pá"], emoji: "👨" },
    { text: "A-gua", syllables: ["A", "gua"], emoji: "💧" },
  ],
  2: [
    { text: "Ma-má", syllables: ["Ma", "má"], emoji: "👩" },
    { text: "Pa-pá", syllables: ["Pa", "pá"], emoji: "👨" },
    { text: "A-gua", syllables: ["A", "gua"], emoji: "💧" },
    { text: "Pe-rro", syllables: ["Pe", "rro"], emoji: "🐶" },
    { text: "Ga-to", syllables: ["Ga", "to"], emoji: "🐱" },
  ],
  3: [
    { text: "Ma-ri-po-sa", syllables: ["Ma", "ri", "po", "sa"], emoji: "🦋" },
    { text: "Za-na-ho-ria", syllables: ["Za", "na", "ho", "ria"], emoji: "🥕" },
    { text: "Es-tre-lla", syllables: ["Es", "tre", "lla"], emoji: "⭐" },
    { text: "Mon-ta-ña", syllables: ["Mon", "ta", "ña"], emoji: "🏔️" },
    { text: "Tor-tu-ga", syllables: ["Tor", "tu", "ga"], emoji: "🐢" },
  ],
};

const RepeatActivity = ({ onBack, onPoints }: RepeatActivityProps) => {
  const [level, setLevel] = useState<DifficultyLevel>(() => getLevel("repeat"));
  const [phrases] = useState(() => phrasesByLevel[getLevel("repeat")]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeSyllable, setActiveSyllable] = useState(-1);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const current = phrases[currentIndex];

  useEffect(() => {
    speakWord(current.text.replace(/-/g, ""));
  }, [currentIndex]);

  const handleSyllableTap = (idx: number) => {
    speakSyllable(current.syllables[idx]);
    setActiveSyllable(idx);
    setTimeout(() => {
      if (idx === current.syllables.length - 1) {
        setScore((s) => s + 5);
        const newLevel = recordResult("repeat", true);
        setLevel(newLevel);
        setTimeout(() => {
          if (currentIndex < phrases.length - 1) {
            setCurrentIndex((i) => i + 1);
            setActiveSyllable(-1);
          } else {
            onPoints(score + 5);
            setCompleted(true);
          }
        }, 800);
      }
    }, 400);
  };

  if (completed) {
    return (
      <div className="app-shell flex flex-col items-center justify-center min-h-dvh bg-background px-6 gap-6">
        <div className="animate-bounce-in text-center">
          <span className="text-8xl block mb-4">🗣️</span>
          <h2 className="text-3xl font-black text-foreground">¡Excelente!</h2>
          <p className="text-xl text-muted-foreground font-bold mt-2">
            Repetiste {phrases.length} palabras
          </p>
          <p className="text-sm text-muted-foreground font-semibold mt-1">
            Próximo nivel: {getLevelLabel(getLevel("repeat"))}
          </p>
          <p className="text-lg text-primary font-bold mt-1">+{score} puntos</p>
        </div>
        <button onClick={onBack} className="btn-child bg-primary text-primary-foreground">
          Volver al menú
        </button>
      </div>
    );
  }

  return (
    <div className="app-shell flex flex-col min-h-dvh bg-background px-5 py-6">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="text-2xl p-2">←</button>
        <h2 className="text-xl font-black text-foreground">Repetir</h2>
        <div className="bg-accent/30 rounded-2xl px-3 py-1.5">
          <span className="text-sm font-bold">⭐ {score}</span>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <span className="bg-sky/15 text-sky rounded-full px-4 py-1 text-sm font-bold">
          {getLevelLabel(level)}
        </span>
      </div>

      <div className="w-full bg-muted rounded-full h-3 mb-8">
        <div
          className="bg-sky h-3 rounded-full transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / phrases.length) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8" key={currentIndex}>
        <span className="text-9xl animate-bounce-in">{current.emoji}</span>

        <div className="text-center">
          <p className="text-muted-foreground font-semibold mb-2">Toca cada sílaba:</p>
          <div className="flex gap-3 justify-center flex-wrap">
            {current.syllables.map((syl, idx) => (
              <button
                key={idx}
                onClick={() => handleSyllableTap(idx)}
                className={`rounded-2xl px-6 py-4 text-3xl font-black transition-all duration-200 ${
                  activeSyllable >= idx
                    ? "bg-secondary text-secondary-foreground scale-110"
                    : "bg-card border-2 border-border text-foreground"
                }`}
              >
                {syl}
              </button>
            ))}
          </div>
        </div>

        <p className="text-4xl font-black text-foreground">{current.text}</p>
      </div>
    </div>
  );
};

export default RepeatActivity;
