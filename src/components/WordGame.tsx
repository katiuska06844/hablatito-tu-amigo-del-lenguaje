import { useState, useEffect } from "react";
import { speakWord, speakCelebration } from "@/lib/speech";
import { getLevel, recordResult, getLevelLabel, type DifficultyLevel } from "@/lib/adaptive";

interface WordGameProps {
  onBack: () => void;
  onPoints: (pts: number) => void;
}

type WordSet = { word: string; emoji: string; options: string[]; correct: number };

const wordsByLevel: Record<DifficultyLevel, WordSet[]> = {
  1: [
    { word: "Gato", emoji: "🐱", options: ["🐱", "🐶"], correct: 0 },
    { word: "Sol", emoji: "☀️", options: ["☀️", "🌙"], correct: 0 },
    { word: "Casa", emoji: "🏠", options: ["🏠", "🚗"], correct: 0 },
    { word: "Agua", emoji: "💧", options: ["💧", "🔥"], correct: 0 },
  ],
  2: [
    { word: "Gato", emoji: "🐱", options: ["🐱", "🐶", "🐔", "🐴"], correct: 0 },
    { word: "Sol", emoji: "☀️", options: ["🌙", "☀️", "⭐", "🌧️"], correct: 1 },
    { word: "Casa", emoji: "🏠", options: ["🏔️", "🌳", "🏠", "🚗"], correct: 2 },
    { word: "Flor", emoji: "🌸", options: ["🌸", "🍎", "🌽", "🥕"], correct: 0 },
    { word: "Agua", emoji: "💧", options: ["🔥", "🌈", "💧", "🍞"], correct: 2 },
  ],
  3: [
    { word: "Mariposa", emoji: "🦋", options: ["🐝", "🦋", "🐞", "🪲"], correct: 1 },
    { word: "Estrella", emoji: "⭐", options: ["🌙", "☀️", "⭐", "🪐"], correct: 2 },
    { word: "Montaña", emoji: "🏔️", options: ["🌊", "🏔️", "🌋", "🏜️"], correct: 1 },
    { word: "Zanahoria", emoji: "🥕", options: ["🥕", "🌽", "🍅", "🥒"], correct: 0 },
    { word: "Arcoíris", emoji: "🌈", options: ["🌧️", "🌤️", "🌈", "❄️"], correct: 2 },
    { word: "Tortuga", emoji: "🐢", options: ["🐸", "🐊", "🐢", "🦎"], correct: 2 },
  ],
};

const WordGame = ({ onBack, onPoints }: WordGameProps) => {
  const [level, setLevel] = useState<DifficultyLevel>(() => getLevel("words"));
  const words = wordsByLevel[level];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = words[currentIndex];

  useEffect(() => {
    speakWord(current.word);
  }, [currentIndex]);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === current.correct;
    setIsCorrect(correct);
    const newLevel = recordResult("words", correct);
    setLevel(newLevel);

    if (correct) {
      setScore((s) => s + 10);
      speakCelebration("¡Correcto!");
    } else {
      speakCelebration("Intenta de nuevo");
    }

    setTimeout(() => {
      if (currentIndex < words.length - 1) {
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
          <p className="text-sm text-muted-foreground font-semibold mt-1">
            Próximo nivel: {getLevelLabel(getLevel("words"))}
          </p>
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: Math.min(Math.floor(score / 10), 5) }).map((_, i) => (
              <span key={i} className="text-3xl medal-shimmer">⭐</span>
            ))}
          </div>
        </div>
        <button onClick={onBack} className="btn-child bg-primary text-primary-foreground mt-4">
          Volver al menú
        </button>
      </div>
    );
  }

  return (
    <div className="app-shell flex flex-col min-h-dvh bg-background px-5 py-6">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="text-2xl p-2">←</button>
        <h2 className="text-xl font-black text-foreground">Palabras</h2>
        <div className="bg-accent/30 rounded-2xl px-3 py-1.5">
          <span className="text-sm font-bold">⭐ {score}</span>
        </div>
      </div>

      {/* Level badge */}
      <div className="flex justify-center mb-4">
        <span className="bg-primary/15 text-primary rounded-full px-4 py-1 text-sm font-bold">
          {getLevelLabel(level)}
        </span>
      </div>

      <div className="w-full bg-muted rounded-full h-3 mb-8">
        <div
          className="bg-primary h-3 rounded-full transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
        />
      </div>

      <div className="flex flex-col items-center gap-2 mb-8 animate-bounce-in" key={currentIndex}>
        <span className="text-8xl">{current.emoji}</span>
        <h1 className="text-4xl font-black text-foreground mt-2">{current.word}</h1>
        <p className="text-muted-foreground font-semibold">Toca la imagen correcta</p>
      </div>

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
