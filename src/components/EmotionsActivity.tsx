import { useState, useEffect, useCallback } from "react";
import { speakWord } from "@/lib/speech";
import { getLevel, recordResult, getLevelLabel, type DifficultyLevel } from "@/lib/adaptive";
import VoiceButton from "@/components/VoiceButton";

interface Props { onBack: () => void; onPoints: (pts: number) => void; }
type Emotion = { name: string; emoji: string; desc: string };

const emotionsByLevel: Record<DifficultyLevel, Emotion[]> = {
  1: [
    { name: "Feliz", emoji: "😊", desc: "Cuando estamos contentos" },
    { name: "Triste", emoji: "😢", desc: "Cuando algo nos duele" },
    { name: "Enojado", emoji: "😠", desc: "Cuando no nos gusta algo" },
  ],
  2: [
    { name: "Feliz", emoji: "😊", desc: "Cuando estamos contentos" },
    { name: "Triste", emoji: "😢", desc: "Cuando algo nos duele" },
    { name: "Enojado", emoji: "😠", desc: "Cuando no nos gusta algo" },
    { name: "Sorprendido", emoji: "😲", desc: "Cuando algo nos asombra" },
    { name: "Asustado", emoji: "😨", desc: "Cuando tenemos miedo" },
  ],
  3: [
    { name: "Feliz", emoji: "😊", desc: "Cuando estamos contentos" },
    { name: "Triste", emoji: "😢", desc: "Cuando algo nos duele" },
    { name: "Enojado", emoji: "😠", desc: "Cuando no nos gusta algo" },
    { name: "Sorprendido", emoji: "😲", desc: "Cuando algo nos asombra" },
    { name: "Asustado", emoji: "😨", desc: "Cuando tenemos miedo" },
    { name: "Cansado", emoji: "😴", desc: "Cuando necesitamos dormir" },
  ],
};

const EmotionsActivity = ({ onBack, onPoints }: Props) => {
  const [level, setLevel] = useState<DifficultyLevel>(() => getLevel("emotions"));
  const [items] = useState(() => emotionsByLevel[getLevel("emotions")]);
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);
  const [tapped, setTapped] = useState(false);
  const current = items[idx];

  useEffect(() => { speakWord(current.name); setTapped(false); }, [idx]);
  const handleTap = () => { speakWord(current.name); setTapped(true); };

  const handleVoiceMatch = useCallback(() => {
    setScore(s => s + 5);
    recordResult("emotions", true);
    setLevel(getLevel("emotions"));
    setTimeout(() => {
      if (idx < items.length - 1) setIdx(i => i + 1);
      else { onPoints(score + 5); setDone(true); }
    }, 600);
  }, [idx, items.length, score, onPoints]);

  if (done) return (
    <div className="app-shell andean-bg flex flex-col items-center justify-center min-h-dvh px-6 gap-6">
      <div className="animate-bounce-in text-center">
        <span className="text-8xl block mb-4">😊</span>
        <h2 className="text-3xl font-black text-foreground">¡Increíble!</h2>
        <p className="text-xl text-muted-foreground font-bold mt-2">Aprendiste {items.length} emociones</p>
        <p className="text-lg text-primary font-bold mt-1">+{score} puntos</p>
      </div>
      <button onClick={onBack} className="btn-child bg-primary text-primary-foreground">Volver</button>
    </div>
  );

  return (
    <div className="app-shell andean-bg flex flex-col min-h-dvh px-5 py-6">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="text-2xl p-2">←</button>
        <h2 className="text-xl font-black text-foreground">😊 Emociones</h2>
        <div className="bg-accent/30 rounded-2xl px-3 py-1.5"><span className="text-sm font-bold">⭐ {score}</span></div>
      </div>
      <div className="flex justify-center mb-3">
        <span className="bg-primary/15 text-primary rounded-full px-4 py-1 text-sm font-bold">{getLevelLabel(level)}</span>
      </div>
      <div className="w-full bg-muted rounded-full h-3 mb-6">
        <div className="bg-primary h-3 rounded-full transition-all duration-500" style={{ width: `${((idx + 1) / items.length) * 100}%` }} />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-4" key={idx}>
        {!tapped && <p className="text-muted-foreground font-semibold">¡Toca la carita!</p>}
        <button onClick={handleTap} className="animate-bounce-in active:scale-90 transition-transform">
          <span className="text-[100px] block">{current.emoji}</span>
        </button>
        <h1 className="text-4xl font-black text-foreground">{current.name}</h1>
        <p className="text-sm text-muted-foreground font-semibold bg-card/80 rounded-2xl px-4 py-2">{current.desc}</p>
        {tapped && <VoiceButton targetWord={current.name} onMatch={handleVoiceMatch} />}
      </div>
    </div>
  );
};

export default EmotionsActivity;
