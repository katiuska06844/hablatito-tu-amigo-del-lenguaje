import { useState, useEffect } from "react";
import { speakWord, speakCelebration } from "@/lib/speech";
import { recordResult, getLevel, getLevelLabel, type DifficultyLevel } from "@/lib/adaptive";

interface Props {
  onBack: () => void;
  onPoints: (pts: number) => void;
}

type BodyPart = { name: string; emoji: string; instruction: string };

const partsByLevel: Record<DifficultyLevel, BodyPart[]> = {
  1: [
    { name: "Cabeza", emoji: "🧑", instruction: "¡Toca tu cabeza!" },
    { name: "Manos", emoji: "🤲", instruction: "¡Muestra tus manos!" },
    { name: "Pies", emoji: "🦶", instruction: "¡Mueve tus pies!" },
  ],
  2: [
    { name: "Ojos", emoji: "👀", instruction: "¡Parpadea tus ojos!" },
    { name: "Boca", emoji: "👄", instruction: "¡Abre la boca!" },
    { name: "Nariz", emoji: "👃", instruction: "¡Toca tu nariz!" },
    { name: "Orejas", emoji: "👂", instruction: "¡Toca tus orejas!" },
    { name: "Manos", emoji: "🤲", instruction: "¡Aplaude con tus manos!" },
  ],
  3: [
    { name: "Rodillas", emoji: "🦵", instruction: "¡Dobla las rodillas!" },
    { name: "Codos", emoji: "💪", instruction: "¡Toca tus codos!" },
    { name: "Hombros", emoji: "🤷", instruction: "¡Sube los hombros!" },
    { name: "Dedos", emoji: "🖐️", instruction: "¡Mueve los dedos!" },
    { name: "Barriga", emoji: "🫃", instruction: "¡Toca tu barriga!" },
    { name: "Espalda", emoji: "🔙", instruction: "¡Toca tu espalda!" },
  ],
};

const BodyPartsActivity = ({ onBack, onPoints }: Props) => {
  const [level, setLevel] = useState<DifficultyLevel>(() => getLevel("bodyparts"));
  const [parts] = useState(() => partsByLevel[getLevel("bodyparts")]);
  const [idx, setIdx] = useState(0);
  const [tapped, setTapped] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = parts[idx];
  useEffect(() => { speakWord(current.name); }, [idx]);

  const handleTap = () => {
    if (tapped) return;
    setTapped(true);
    speakCelebration(current.instruction);
    setScore(s => s + 5);
    const nl = recordResult("bodyparts", true);
    setLevel(nl);
    setTimeout(() => {
      setTapped(false);
      if (idx < parts.length - 1) setIdx(i => i + 1);
      else { onPoints(score + 5); setDone(true); }
    }, 2000);
  };

  if (done) return (
    <div className="app-shell andean-bg flex flex-col items-center justify-center min-h-dvh px-6 gap-6">
      <div className="animate-bounce-in text-center">
        <span className="text-8xl block mb-4">👶</span>
        <h2 className="text-3xl font-black text-foreground">¡Muy bien!</h2>
        <p className="text-xl text-muted-foreground font-bold mt-2">Aprendiste {parts.length} partes del cuerpo</p>
        <p className="text-lg text-primary font-bold mt-1">+{score} puntos</p>
      </div>
      <button onClick={onBack} className="btn-child bg-primary text-primary-foreground">Volver</button>
    </div>
  );

  return (
    <div className="app-shell andean-bg flex flex-col min-h-dvh px-5 py-6">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="text-2xl p-2">←</button>
        <h2 className="text-xl font-black text-foreground">👶 Cuerpo</h2>
        <div className="bg-accent/30 rounded-2xl px-3 py-1.5"><span className="text-sm font-bold">⭐ {score}</span></div>
      </div>
      <div className="flex justify-center mb-3">
        <span className="bg-primary/15 text-primary rounded-full px-4 py-1 text-sm font-bold">{getLevelLabel(level)}</span>
      </div>
      <div className="w-full bg-muted rounded-full h-3 mb-8">
        <div className="bg-accent h-3 rounded-full transition-all duration-500" style={{ width: `${((idx + 1) / parts.length) * 100}%` }} />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-6" key={idx}>
        <button onClick={handleTap} className="animate-bounce-in active:scale-90 transition-transform">
          <span className="text-[120px] block">{current.emoji}</span>
        </button>
        <h1 className="text-4xl font-black text-foreground">{current.name}</h1>
        {tapped && (
          <div className="animate-bounce-in bg-accent/30 rounded-3xl px-6 py-4 text-center">
            <p className="text-2xl font-black text-foreground">{current.instruction}</p>
          </div>
        )}
        {!tapped && <p className="text-muted-foreground font-semibold">¡Toca para aprender!</p>}
      </div>
    </div>
  );
};

export default BodyPartsActivity;
