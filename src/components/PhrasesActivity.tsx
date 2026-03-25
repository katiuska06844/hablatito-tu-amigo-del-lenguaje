import { useState, useEffect } from "react";
import { speakWord, speakCelebration } from "@/lib/speech";
import { recordResult, getLevel, getLevelLabel, type DifficultyLevel } from "@/lib/adaptive";

interface Props {
  onBack: () => void;
  onPoints: (pts: number) => void;
}

type Phrase = { phrase: string; emoji: string; words: string[]; correctOrder: number[] };

const phrasesByLevel: Record<DifficultyLevel, Phrase[]> = {
  1: [
    { phrase: "El gato come", emoji: "🐱", words: ["come", "El", "gato"], correctOrder: [1, 2, 0] },
    { phrase: "Yo tengo agua", emoji: "💧", words: ["agua", "Yo", "tengo"], correctOrder: [1, 2, 0] },
  ],
  2: [
    { phrase: "La llama camina", emoji: "🦙", words: ["camina", "La", "llama"], correctOrder: [1, 2, 0] },
    { phrase: "Mamá me quiere", emoji: "❤️", words: ["quiere", "me", "Mamá"], correctOrder: [2, 1, 0] },
    { phrase: "El sol brilla", emoji: "☀️", words: ["brilla", "El", "sol"], correctOrder: [1, 2, 0] },
  ],
  3: [
    { phrase: "Los niños juegan felices", emoji: "👧", words: ["felices", "juegan", "Los", "niños"], correctOrder: [2, 3, 1, 0] },
    { phrase: "La alpaca tiene lana", emoji: "🦙", words: ["lana", "tiene", "La", "alpaca"], correctOrder: [2, 3, 1, 0] },
    { phrase: "Mi casa es bonita", emoji: "🏡", words: ["bonita", "es", "Mi", "casa"], correctOrder: [2, 3, 1, 0] },
  ],
};

const PhrasesActivity = ({ onBack, onPoints }: Props) => {
  const [level, setLevel] = useState<DifficultyLevel>(() => getLevel("phrases"));
  const [items] = useState(() => phrasesByLevel[getLevel("phrases")]);
  const [idx, setIdx] = useState(0);
  const [selectedWords, setSelectedWords] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [result, setResult] = useState<boolean | null>(null);

  const current = items[idx];
  useEffect(() => { speakWord(current.phrase); }, [idx]);

  const handleWordTap = (wordIdx: number) => {
    if (selectedWords.includes(wordIdx) || result !== null) return;
    const newSelected = [...selectedWords, wordIdx];
    setSelectedWords(newSelected);

    if (newSelected.length === current.words.length) {
      const isCorrect = newSelected.every((w, i) => w === current.correctOrder[i]);
      setResult(isCorrect);
      const nl = recordResult("phrases", isCorrect);
      setLevel(nl);
      if (isCorrect) { setScore(s => s + 10); speakCelebration("¡Correcto!"); }
      else speakCelebration("Intenta de nuevo");

      setTimeout(() => {
        if (idx < items.length - 1) { setIdx(j => j + 1); setSelectedWords([]); setResult(null); }
        else { onPoints(isCorrect ? score + 10 : score); setDone(true); }
      }, 1500);
    }
  };

  const resetSelection = () => { setSelectedWords([]); setResult(null); };

  if (done) return (
    <div className="app-shell andean-bg flex flex-col items-center justify-center min-h-dvh px-6 gap-6">
      <div className="animate-bounce-in text-center">
        <span className="text-8xl block mb-4">💬</span>
        <h2 className="text-3xl font-black text-foreground">¡Excelente!</h2>
        <p className="text-xl text-muted-foreground font-bold mt-2">Ganaste {score} puntos</p>
      </div>
      <button onClick={onBack} className="btn-child bg-primary text-primary-foreground">Volver</button>
    </div>
  );

  return (
    <div className="app-shell andean-bg flex flex-col min-h-dvh px-5 py-6">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="text-2xl p-2">←</button>
        <h2 className="text-xl font-black text-foreground">💬 Frases</h2>
        <div className="bg-accent/30 rounded-2xl px-3 py-1.5"><span className="text-sm font-bold">⭐ {score}</span></div>
      </div>
      <div className="flex justify-center mb-3">
        <span className="bg-primary/15 text-primary rounded-full px-4 py-1 text-sm font-bold">{getLevelLabel(level)}</span>
      </div>
      <div className="w-full bg-muted rounded-full h-3 mb-6">
        <div className="bg-primary h-3 rounded-full transition-all duration-500" style={{ width: `${((idx + 1) / items.length) * 100}%` }} />
      </div>

      <div className="flex flex-col items-center gap-4 mb-6 animate-bounce-in" key={idx}>
        <span className="text-7xl">{current.emoji}</span>
        <p className="text-muted-foreground font-semibold text-center">Ordena las palabras para formar la frase</p>
        <button onClick={() => speakWord(current.phrase)} className="text-3xl">🔊</button>
      </div>

      {/* Selected words area */}
      <div className="bg-card/80 rounded-3xl p-4 min-h-[60px] flex flex-wrap gap-2 justify-center mb-4">
        {selectedWords.map((wi, i) => (
          <span key={i} className="bg-primary/20 text-foreground rounded-2xl px-4 py-2 text-lg font-bold">{current.words[wi]}</span>
        ))}
        {selectedWords.length === 0 && <p className="text-muted-foreground text-sm">Toca las palabras en orden</p>}
      </div>

      {/* Available words */}
      <div className="flex flex-wrap gap-3 justify-center mb-4">
        {current.words.map((word, i) => (
          <button
            key={i}
            onClick={() => handleWordTap(i)}
            disabled={selectedWords.includes(i)}
            className={`rounded-2xl px-5 py-3 text-xl font-black transition-all ${
              selectedWords.includes(i)
                ? "bg-muted text-muted-foreground opacity-40"
                : "bg-card border-2 border-border text-foreground active:scale-95"
            }`}
          >
            {word}
          </button>
        ))}
      </div>

      {result !== null && (
        <div className="text-center animate-bounce-in mb-4">
          <span className="text-2xl font-black">{result ? "✅ ¡Correcto!" : "❌ Intenta de nuevo"}</span>
        </div>
      )}

      {selectedWords.length > 0 && result === null && (
        <button onClick={resetSelection} className="mx-auto text-sm font-bold text-muted-foreground underline">
          Borrar y reintentar
        </button>
      )}
    </div>
  );
};

export default PhrasesActivity;
