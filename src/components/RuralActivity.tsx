import { useState, useEffect } from "react";
import { speakWord, speakCelebration } from "@/lib/speech";
import { recordResult, getLevel, getLevelLabel, type DifficultyLevel } from "@/lib/adaptive";

interface Props {
  onBack: () => void;
  onPoints: (pts: number) => void;
}

type Scene = { name: string; emoji: string; description: string; options: string[]; correct: number };

const scenesByLevel: Record<DifficultyLevel, Scene[]> = {
  1: [
    { name: "Casa", emoji: "🏡", description: "Donde vivimos", options: ["🏡", "🏢"], correct: 0 },
    { name: "Campo", emoji: "🌾", description: "Donde sembramos", options: ["🌾", "🏙️"], correct: 0 },
    { name: "Mercado", emoji: "🏪", description: "Donde compramos", options: ["🏪", "🏥"], correct: 0 },
  ],
  2: [
    { name: "Casa", emoji: "🏡", description: "Donde vivimos", options: ["🏡", "🏢", "🏥", "🏭"], correct: 0 },
    { name: "Río", emoji: "🏞️", description: "Agua que corre", options: ["🏜️", "🏞️", "🌋", "🏔️"], correct: 1 },
    { name: "Montaña", emoji: "🏔️", description: "Muy alta", options: ["🏔️", "🏝️", "🏞️", "🌋"], correct: 0 },
    { name: "Chacra", emoji: "🌱", description: "Donde sembramos", options: ["🏭", "🏢", "🌱", "🏥"], correct: 2 },
  ],
  3: [
    { name: "Iglesia", emoji: "⛪", description: "Donde rezamos", options: ["🏫", "⛪", "🏥", "🏡"], correct: 1 },
    { name: "Escuela", emoji: "🏫", description: "Donde aprendemos", options: ["🏫", "⛪", "🏭", "🏡"], correct: 0 },
    { name: "Puente", emoji: "🌉", description: "Cruzar el río", options: ["🏞️", "🌉", "🏔️", "🌋"], correct: 1 },
    { name: "Camino", emoji: "🛤️", description: "Para caminar", options: ["🛤️", "🏙️", "🌊", "🏜️"], correct: 0 },
    { name: "Plaza", emoji: "🏛️", description: "Centro del pueblo", options: ["🏭", "🏛️", "🏥", "🏫"], correct: 1 },
  ],
};

const RuralActivity = ({ onBack, onPoints }: Props) => {
  const [level, setLevel] = useState<DifficultyLevel>(() => getLevel("rural"));
  const [scenes] = useState(() => scenesByLevel[getLevel("rural")]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = scenes[idx];
  useEffect(() => { speakWord(current.name); }, [idx]);

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    const correct = i === current.correct;
    setIsCorrect(correct);
    const nl = recordResult("rural", correct);
    setLevel(nl);
    if (correct) { setScore(s => s + 10); speakCelebration("¡Correcto!"); }
    else speakCelebration("Intenta de nuevo");
    setTimeout(() => {
      if (idx < scenes.length - 1) { setIdx(j => j + 1); setSelected(null); setIsCorrect(null); }
      else { onPoints(correct ? score + 10 : score); setDone(true); }
    }, 1200);
  };

  if (done) return (
    <div className="app-shell andean-bg flex flex-col items-center justify-center min-h-dvh px-6 gap-6">
      <div className="animate-bounce-in text-center">
        <span className="text-8xl block mb-4">🏡</span>
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
        <h2 className="text-xl font-black text-foreground">🏡 Mi Pueblo</h2>
        <div className="bg-accent/30 rounded-2xl px-3 py-1.5"><span className="text-sm font-bold">⭐ {score}</span></div>
      </div>
      <div className="flex justify-center mb-3">
        <span className="bg-earth/15 text-earth rounded-full px-4 py-1 text-sm font-bold">{getLevelLabel(level)}</span>
      </div>
      <div className="w-full bg-muted rounded-full h-3 mb-6">
        <div className="bg-earth h-3 rounded-full transition-all duration-500" style={{ width: `${((idx + 1) / scenes.length) * 100}%` }} />
      </div>
      <div className="flex flex-col items-center gap-2 mb-6 animate-bounce-in" key={idx}>
        <span className="text-8xl">{current.emoji}</span>
        <h1 className="text-4xl font-black text-foreground">{current.name}</h1>
        <p className="text-muted-foreground font-semibold bg-card/80 rounded-2xl px-4 py-2">{current.description}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 flex-1">
        {current.options.map((opt, i) => {
          let cls = "bg-card border-2 border-border";
          if (selected !== null) {
            if (i === current.correct) cls = "bg-primary/20 border-2 border-primary";
            else if (i === selected && !isCorrect) cls = "bg-destructive/10 border-2 border-destructive";
          }
          return (
            <button key={i} onClick={() => handleSelect(i)} className={`game-card ${cls} flex items-center justify-center min-h-[100px]`}>
              <span className="text-6xl">{opt}</span>
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

export default RuralActivity;
