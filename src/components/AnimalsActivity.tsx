import { useState, useEffect } from "react";
import { speakWord, speakSound, speakCelebration } from "@/lib/speech";
import { getLevel, recordResult, getLevelLabel, type DifficultyLevel } from "@/lib/adaptive";

interface Props {
  onBack: () => void;
  onPoints: (pts: number) => void;
}

type Animal = { name: string; emoji: string; sound: string; fact: string };

const animalsByLevel: Record<DifficultyLevel, Animal[]> = {
  1: [
    { name: "Llama", emoji: "🦙", sound: "Mmm mmm", fact: "Vive en los Andes" },
    { name: "Cuy", emoji: "🐹", sound: "Cuii cuii", fact: "Es muy pequeño" },
    { name: "Gallina", emoji: "🐔", sound: "Coc coc", fact: "Pone huevos" },
  ],
  2: [
    { name: "Llama", emoji: "🦙", sound: "Mmm mmm", fact: "Vive en los Andes" },
    { name: "Alpaca", emoji: "🦙", sound: "Mmm", fact: "Tiene lana suave" },
    { name: "Cuy", emoji: "🐹", sound: "Cuii cuii", fact: "Es muy pequeño" },
    { name: "Perro", emoji: "🐶", sound: "Guau guau", fact: "Es el mejor amigo" },
    { name: "Vaca", emoji: "🐄", sound: "Muuu", fact: "Da leche" },
  ],
  3: [
    { name: "Llama", emoji: "🦙", sound: "Mmm mmm", fact: "Vive en los Andes" },
    { name: "Alpaca", emoji: "🦙", sound: "Mmm", fact: "Tiene lana suave" },
    { name: "Cóndor", emoji: "🦅", sound: "Cra cra", fact: "Vuela muy alto" },
    { name: "Cuy", emoji: "🐹", sound: "Cuii cuii", fact: "Es muy pequeño" },
    { name: "Gallina", emoji: "🐔", sound: "Coc coc", fact: "Pone huevos" },
    { name: "Vaca", emoji: "🐄", sound: "Muuu", fact: "Da leche" },
  ],
};

const AnimalsActivity = ({ onBack, onPoints }: Props) => {
  const [level, setLevel] = useState<DifficultyLevel>(() => getLevel("animals"));
  const [animals] = useState(() => animalsByLevel[getLevel("animals")]);
  const [idx, setIdx] = useState(0);
  const [showSound, setShowSound] = useState(false);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);

  const current = animals[idx];

  useEffect(() => { speakWord(current.name); }, [idx]);

  const handleTap = () => {
    speakSound(current.sound);
    setShowSound(true);
    setScore(s => s + 5);
    const nl = recordResult("animals", true);
    setLevel(nl);
    setTimeout(() => {
      setShowSound(false);
      if (idx < animals.length - 1) setIdx(i => i + 1);
      else { onPoints(score + 5); setDone(true); }
    }, 1500);
  };

  if (done) return (
    <div className="app-shell andean-bg flex flex-col items-center justify-center min-h-dvh px-6 gap-6">
      <div className="animate-bounce-in text-center">
        <span className="text-8xl block mb-4">🦙</span>
        <h2 className="text-3xl font-black text-foreground">¡Excelente!</h2>
        <p className="text-xl text-muted-foreground font-bold mt-2">Conociste {animals.length} animales del Perú</p>
        <p className="text-sm text-muted-foreground font-semibold mt-1">Nivel: {getLevelLabel(getLevel("animals"))}</p>
        <p className="text-lg text-primary font-bold mt-1">+{score} puntos</p>
      </div>
      <button onClick={onBack} className="btn-child bg-primary text-primary-foreground">Volver</button>
    </div>
  );

  return (
    <div className="app-shell andean-bg flex flex-col min-h-dvh px-5 py-6">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="text-2xl p-2">←</button>
        <h2 className="text-xl font-black text-foreground">🐾 Animales del Perú</h2>
        <div className="bg-accent/30 rounded-2xl px-3 py-1.5"><span className="text-sm font-bold">⭐ {score}</span></div>
      </div>
      <div className="flex justify-center mb-3">
        <span className="bg-primary/15 text-primary rounded-full px-4 py-1 text-sm font-bold">{getLevelLabel(level)}</span>
      </div>
      <div className="w-full bg-muted rounded-full h-3 mb-8">
        <div className="bg-primary h-3 rounded-full transition-all duration-500" style={{ width: `${((idx + 1) / animals.length) * 100}%` }} />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-4" key={idx}>
        <p className="text-muted-foreground font-semibold">¡Toca el animal!</p>
        <button onClick={handleTap} className="animate-bounce-in active:scale-90 transition-transform">
          <span className="text-[120px] block">{current.emoji}</span>
        </button>
        <h1 className="text-4xl font-black text-foreground">{current.name}</h1>
        <p className="text-sm text-muted-foreground font-semibold bg-card/80 rounded-2xl px-4 py-2">{current.fact}</p>
        {showSound && (
          <div className="animate-bounce-in bg-primary/20 rounded-3xl px-8 py-4">
            <p className="text-3xl font-black text-primary">"{current.sound}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalsActivity;
