import { useState } from "react";

interface WordGameProps {
  onBack: () => void;
  onPoints: (pts: number) => void;
}

const wordSets = [
  {
    word: "Gato",
    emoji: "🐱",
    options: ["🐱", "🐶", "🐔", "🐴"],
    correct: 0,
  },
  {
    word: "Sol",
    emoji: "☀️",
    options: ["🌙", "☀️", "⭐", "🌧️"],
    correct: 1,
  },
  {
    word: "Casa",
    emoji: "🏠",
    options: ["🏔️", "🌳", "🏠", "🚗"],
    correct: 2,
  },
  {
    word: "Flor",
    emoji: "🌸",
    options: ["🌸", "🍎", "🌽", "🥕"],
    correct: 0,
  },
  {
    word: "Agua",
    emoji: "💧",
    options: ["🔥", "🌈", "💧", "🍞"],
    correct: 2,
  },
];

const WordGame = ({ onBack, onPoints }: WordGameProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = wordSets[currentIndex];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === current.correct;
    setIsCorrect(correct);
    if (correct) setScore((s) => s + 10);

    setTimeout(() => {
      if (currentIndex < wordSets.length - 1) {
        setCurrentIndex((i) => i + 1);
        setSelected(null);
        setIsCorrect(null);
      } else {
        const finalScore = correct ? score + 10 : score;
        onPoints(finalScore);
        setFinished(true);
      }
    }, 1200);
  };

  if (finished) {
    return (
      <div className="app-shell flex flex-col items-center justify-center min-h-dvh bg-background px-6 gap-6">
        <div className="animate-bounce-in text-center">
          <span className="text-8xl block mb-4">🎉</span>
          <h2 className="text-3xl font-black text-foreground">¡Muy bien!</h2>
          <p className="text-xl text-muted-foreground font-bold mt-2">
            Ganaste {score} puntos
          </p>
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: Math.min(Math.floor(score / 10), 5) }).map((_, i) => (
              <span key={i} className="text-3xl medal-shimmer">⭐</span>
            ))}
          </div>
        </div>
        <button
          onClick={onBack}
          className="btn-child bg-primary text-primary-foreground mt-4"
        >
          Volver al menú
        </button>
      </div>
    );
  }

  return (
    <div className="app-shell flex flex-col min-h-dvh bg-background px-5 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-2xl p-2">←</button>
        <h2 className="text-xl font-black text-foreground">Palabras</h2>
        <div className="bg-accent/30 rounded-2xl px-3 py-1.5">
          <span className="text-sm font-bold">⭐ {score}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-muted rounded-full h-3 mb-8">
        <div
          className="bg-primary h-3 rounded-full transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / wordSets.length) * 100}%` }}
        />
      </div>

      {/* Word display */}
      <div className="flex flex-col items-center gap-2 mb-8 animate-bounce-in" key={currentIndex}>
        <span className="text-8xl">{current.emoji}</span>
        <h1 className="text-4xl font-black text-foreground mt-2">{current.word}</h1>
        <p className="text-muted-foreground font-semibold">Toca la imagen correcta</p>
      </div>

      {/* Options grid */}
      <div className="grid grid-cols-2 gap-4 flex-1">
        {current.options.map((opt, idx) => {
          let cardClass = "bg-card border-2 border-border";
          if (selected !== null) {
            if (idx === current.correct) cardClass = "bg-secondary/20 border-2 border-secondary";
            else if (idx === selected && !isCorrect) cardClass = "bg-destructive/10 border-2 border-destructive";
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`game-card ${cardClass} flex items-center justify-center min-h-[100px]`}
            >
              <span className="text-6xl">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {selected !== null && (
        <div className="mt-4 text-center animate-bounce-in">
          <span className="text-2xl font-black">
            {isCorrect ? "✅ ¡Correcto!" : "❌ Intenta de nuevo"}
          </span>
        </div>
      )}
    </div>
  );
};

export default WordGame;
