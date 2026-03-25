import { useState, useEffect } from "react";
import { speakWord, speakCelebration } from "@/lib/speech";
import { recordResult, getLevel, getLevelLabel, type DifficultyLevel } from "@/lib/adaptive";

interface Props {
  onBack: () => void;
  onPoints: (pts: number) => void;
}

type ColorItem = { name: string; hex: string; options: { name: string; hex: string }[]; correct: number };

const colorsByLevel: Record<DifficultyLevel, ColorItem[]> = {
  1: [
    { name: "Rojo", hex: "#EF4444", options: [{ name: "Rojo", hex: "#EF4444" }, { name: "Azul", hex: "#3B82F6" }], correct: 0 },
    { name: "Azul", hex: "#3B82F6", options: [{ name: "Azul", hex: "#3B82F6" }, { name: "Amarillo", hex: "#EAB308" }], correct: 0 },
    { name: "Verde", hex: "#22C55E", options: [{ name: "Verde", hex: "#22C55E" }, { name: "Rojo", hex: "#EF4444" }], correct: 0 },
  ],
  2: [
    { name: "Amarillo", hex: "#EAB308", options: [{ name: "Rojo", hex: "#EF4444" }, { name: "Amarillo", hex: "#EAB308" }, { name: "Azul", hex: "#3B82F6" }, { name: "Verde", hex: "#22C55E" }], correct: 1 },
    { name: "Rojo", hex: "#EF4444", options: [{ name: "Rojo", hex: "#EF4444" }, { name: "Naranja", hex: "#F97316" }, { name: "Morado", hex: "#A855F7" }, { name: "Azul", hex: "#3B82F6" }], correct: 0 },
    { name: "Verde", hex: "#22C55E", options: [{ name: "Amarillo", hex: "#EAB308" }, { name: "Azul", hex: "#3B82F6" }, { name: "Verde", hex: "#22C55E" }, { name: "Rojo", hex: "#EF4444" }], correct: 2 },
    { name: "Naranja", hex: "#F97316", options: [{ name: "Naranja", hex: "#F97316" }, { name: "Rojo", hex: "#EF4444" }, { name: "Amarillo", hex: "#EAB308" }, { name: "Morado", hex: "#A855F7" }], correct: 0 },
  ],
  3: [
    { name: "Morado", hex: "#A855F7", options: [{ name: "Morado", hex: "#A855F7" }, { name: "Azul", hex: "#3B82F6" }, { name: "Rosa", hex: "#EC4899" }, { name: "Rojo", hex: "#EF4444" }], correct: 0 },
    { name: "Rosa", hex: "#EC4899", options: [{ name: "Naranja", hex: "#F97316" }, { name: "Rosa", hex: "#EC4899" }, { name: "Morado", hex: "#A855F7" }, { name: "Rojo", hex: "#EF4444" }], correct: 1 },
    { name: "Celeste", hex: "#38BDF8", options: [{ name: "Azul", hex: "#3B82F6" }, { name: "Verde", hex: "#22C55E" }, { name: "Celeste", hex: "#38BDF8" }, { name: "Morado", hex: "#A855F7" }], correct: 2 },
    { name: "Marrón", hex: "#92400E", options: [{ name: "Marrón", hex: "#92400E" }, { name: "Naranja", hex: "#F97316" }, { name: "Rojo", hex: "#EF4444" }, { name: "Verde", hex: "#22C55E" }], correct: 0 },
    { name: "Blanco", hex: "#F8FAFC", options: [{ name: "Amarillo", hex: "#EAB308" }, { name: "Blanco", hex: "#F8FAFC" }, { name: "Celeste", hex: "#38BDF8" }, { name: "Rosa", hex: "#EC4899" }], correct: 1 },
  ],
};

const ColorsActivity = ({ onBack, onPoints }: Props) => {
  const [level, setLevel] = useState<DifficultyLevel>(() => getLevel("colors"));
  const [items] = useState(() => colorsByLevel[getLevel("colors")]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = items[idx];
  useEffect(() => { speakWord(current.name); }, [idx]);

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    const correct = i === current.correct;
    setIsCorrect(correct);
    const nl = recordResult("colors", correct);
    setLevel(nl);
    if (correct) { setScore(s => s + 10); speakCelebration("¡Correcto!"); }
    else speakCelebration("Intenta de nuevo");
    setTimeout(() => {
      if (idx < items.length - 1) { setIdx(j => j + 1); setSelected(null); setIsCorrect(null); }
      else { onPoints(correct ? score + 10 : score); setDone(true); }
    }, 1200);
  };

  if (done) return (
    <div className="app-shell andean-bg flex flex-col items-center justify-center min-h-dvh px-6 gap-6">
      <div className="animate-bounce-in text-center">
        <span className="text-8xl block mb-4">🎨</span>
        <h2 className="text-3xl font-black text-foreground">¡Muy bien!</h2>
        <p className="text-xl text-muted-foreground font-bold mt-2">Ganaste {score} puntos</p>
      </div>
      <button onClick={onBack} className="btn-child bg-primary text-primary-foreground">Volver</button>
    </div>
  );

  return (
    <div className="app-shell andean-bg flex flex-col min-h-dvh px-5 py-6">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="text-2xl p-2">←</button>
        <h2 className="text-xl font-black text-foreground">🎨 Colores</h2>
        <div className="bg-accent/30 rounded-2xl px-3 py-1.5"><span className="text-sm font-bold">⭐ {score}</span></div>
      </div>
      <div className="flex justify-center mb-3">
        <span className="bg-primary/15 text-primary rounded-full px-4 py-1 text-sm font-bold">{getLevelLabel(level)}</span>
      </div>
      <div className="w-full bg-muted rounded-full h-3 mb-6">
        <div className="bg-primary h-3 rounded-full transition-all duration-500" style={{ width: `${((idx + 1) / items.length) * 100}%` }} />
      </div>
      <div className="flex flex-col items-center gap-4 mb-6 animate-bounce-in" key={idx}>
        <div className="w-32 h-32 rounded-full border-4 border-card shadow-lg" style={{ backgroundColor: current.hex }} />
        <h1 className="text-4xl font-black text-foreground">{current.name}</h1>
        <p className="text-muted-foreground font-semibold">¿Cuál es {current.name.toLowerCase()}?</p>
      </div>
      <div className="grid grid-cols-2 gap-4 flex-1">
        {current.options.map((opt, i) => {
          let border = "border-border";
          if (selected !== null) {
            if (i === current.correct) border = "border-primary border-4";
            else if (i === selected && !isCorrect) border = "border-destructive border-4";
          }
          return (
            <button key={i} onClick={() => handleSelect(i)} className={`game-card bg-card border-2 ${border} flex flex-col items-center justify-center gap-2 min-h-[100px]`}>
              <div className="w-16 h-16 rounded-full shadow-md" style={{ backgroundColor: opt.hex }} />
              <span className="text-sm font-bold text-foreground">{opt.name}</span>
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div className="mt-4 text-center animate-bounce-in">
          <span className="text-2xl font-black">{isCorrect ? "✅ ¡Correcto!" : "❌ Intenta de nuevo"}</span>
        </div>
      )}
    </div>
  );
};

export default ColorsActivity;
