import { useState, useEffect } from "react";
import { speakWord, speakSound, speakCelebration } from "@/lib/speech";

interface MiniGameProps {
  onBack: () => void;
  onPoints: (pts: number) => void;
}

const animals = [
  { name: "Vaca", emoji: "🐄", sound: "Muuu" },
  { name: "Gallo", emoji: "🐓", sound: "Kikiriki" },
  { name: "Oveja", emoji: "🐑", sound: "Beee" },
  { name: "Perro", emoji: "🐶", sound: "Guau" },
];

const MiniGame = ({ onBack, onPoints }: MiniGameProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSound, setShowSound] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const current = animals[currentIndex];

  useEffect(() => {
    speakWord(current.name);
  }, [currentIndex]);

  const handleAnimalTap = () => {
    speakSound(current.sound);
    setShowSound(true);
    setScore((s) => s + 5);

    setTimeout(() => {
      setShowSound(false);
      if (currentIndex < animals.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        onPoints(score + 5);
        setCompleted(true);
      }
    }, 1500);
  };

  if (completed) {
    return (
      <div className="app-shell flex flex-col items-center justify-center min-h-dvh bg-background px-6 gap-6">
        <div className="animate-bounce-in text-center">
          <span className="text-8xl block mb-4">🎮</span>
          <h2 className="text-3xl font-black text-foreground">¡Buen trabajo!</h2>
          <p className="text-xl text-muted-foreground font-bold mt-2">
            Conociste {animals.length} animales
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
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-2xl p-2">←</button>
        <h2 className="text-xl font-black text-foreground">Animales</h2>
        <div className="bg-accent/30 rounded-2xl px-3 py-1.5">
          <span className="text-sm font-bold">⭐ {score}</span>
        </div>
      </div>

      <div className="w-full bg-muted rounded-full h-3 mb-8">
        <div
          className="bg-secondary h-3 rounded-full transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / animals.length) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6" key={currentIndex}>
        <p className="text-muted-foreground font-semibold">¡Toca el animal!</p>

        <button
          onClick={handleAnimalTap}
          className="animate-bounce-in active:scale-90 transition-transform"
        >
          <span className="text-[120px] block">{current.emoji}</span>
        </button>

        <h1 className="text-4xl font-black text-foreground">{current.name}</h1>

        {showSound && (
          <div className="animate-bounce-in bg-secondary/20 rounded-3xl px-8 py-4">
            <p className="text-3xl font-black text-secondary">"{current.sound}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniGame;
