import { useState, useEffect, useCallback } from "react";
import { speakWord } from "@/lib/speech";
import { getLevel, recordResult, getLevelLabel, type DifficultyLevel } from "@/lib/adaptive";
import VoiceButton from "@/components/VoiceButton";

interface Props { onBack: () => void; onPoints: (pts: number) => void; }
type BodyPart = { name: string; emoji: string; hint: string };

const partsByLevel: Record<DifficultyLevel, BodyPart[]> = {
  1: [
    { name: "Cabeza", emoji: "🧠", hint: "Arriba de todo" },
    { name: "Ojos", emoji: "👀", hint: "Para ver" },
    { name: "Boca", emoji: "👄", hint: "Para hablar y comer" },
  ],
  2: [
    { name: "Cabeza", emoji: "🧠", hint: "Arriba de todo" },
    { name: "Ojos", emoji: "👀", hint: "Para ver" },
    { name: "Manos", emoji: "🤲", hint: "Para agarrar" },
    { name: "Pies", emoji: "🦶", hint: "Para caminar" },
    { name: "Nariz", emoji: "👃", hint: "Para oler" },
  ],
  3: [
    { name: "Cabeza", emoji: "🧠", hint: "Arriba de todo" },
    { name: "Ojos", emoji: "👀", hint: "Para ver" },
    { name: "Orejas", emoji: "👂", hint: "Para escuchar" },
    { name: "Manos", emoji: "🤲", hint: "Para agarrar" },
    { name: "Pies", emoji: "🦶", hint: "Para caminar" },
    { name: "Nariz", emoji: "👃", hint: "Para oler" },
  ],
};

const BodyPartsActivity = ({ onBack, onPoints }: Props) => {
  const [level, setLevel] = useState<DifficultyLevel>(() => getLevel("bodyparts"));
  const [items] = useState(() => partsByLevel[getLevel("bodyparts")]);
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);
  const [tapped, setTapped] = useState(false);
  const current = items[idx];

  useEffect(() => { speakWord(current.name); setTapped(false); }, [idx]);
  const handleTap = () => { speakWord(current.name); setTapped(true); };

  const handleVoiceMatch = useCallback(() => {
    setScore(s => s + 5);
    recordResult("bodyparts", true);
    setLevel(getLevel("bodyparts"));
    setTimeout(() => {
      if (idx < items.length - 1) setIdx(i => i + 1);
      else { onPoints(score + 5); setDone(true); }
    }, 600);
  }, [idx, items.length, score, onPoints]);

  if (done) return (
    <div className="app-shell andean-bg flex flex-col items-center justify-center min-h-dvh px-6 gap-6">
      <div className="animate-bounce-in text-center">
        <span className="text-8xl block mb-4">👶</span>
        <h2 className="text-3xl font-black text-foreground">¡Súper!</h2>
        <p className="text-xl text-muted-foreground font-bold mt-2">Aprendiste {items.length} partes del cuerpo</p>
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
      <div className="w-full bg-muted rounded-full h-3 mb-6">
        <div className="bg-primary h-3 rounded-full transition-all duration-500" style={{ width: `${((idx + 1) / items.length) * 100}%` }} />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-4" key={idx}>
        {!tapped && <p className="text-muted-foreground font-semibold">¡Señala y toca!</p>}
        <button onClick={handleTap} className="animate-bounce-in active:scale-90 transition-transform">
          <span className="text-[100px] block">{current.emoji}</span>
        </button>
        <h1 className="text-4xl font-black text-foreground">{current.name}</h1>
        <p className="text-sm text-muted-foreground font-semibold bg-card/80 rounded-2xl px-4 py-2">{current.hint}</p>
        {tapped && <VoiceButton targetWord={current.name} onMatch={handleVoiceMatch} />}
      </div>
    </div>
  );
};

export default BodyPartsActivity;
