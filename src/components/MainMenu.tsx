import { useState, useEffect } from "react";
import titoMascot from "@/assets/tito-mascot.png";
import LessonsMap from "@/components/LessonsMap";
import HelpParents from "@/components/HelpParents";
import { getStreak, updateStreak } from "@/lib/streak";

interface MainMenuProps {
  onNavigate: (screen: string) => void;
  points: number;
  medals: number;
  childName: string;
  onLogout: () => void;
}

const MainMenu = ({ onNavigate, points, medals, childName, onLogout }: MainMenuProps) => {
  const [streak, setStreak] = useState(0);
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    const s = updateStreak();
    setStreak(s);
  }, []);

  return (
    <div className="app-shell flex flex-col min-h-dvh bg-background px-5 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <img src={titoMascot} alt="Tito" className="w-11 h-11 animate-float" />
          <div>
            <p className="text-base font-black text-foreground">¡Hola, {childName}!</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHelpOpen(true)}
            className="bg-secondary/20 rounded-2xl px-2.5 py-1.5 text-sm font-bold text-foreground active:scale-95 transition-transform"
            aria-label="Ayuda para padres"
          >
            🤝
          </button>
          <div className="bg-accent/20 rounded-2xl px-3 py-1.5 flex items-center gap-1">
            <span className="text-base">🔥</span>
            <span className="text-sm font-black text-foreground">{streak}</span>
          </div>
        </div>
      </div>

      {/* Lessons map */}
      <div className="flex-1 overflow-y-auto">
        <LessonsMap onNavigate={onNavigate} points={points} />
      </div>

      {/* Bottom nav */}
      <div className="flex justify-around mt-4 pt-3 border-t border-border">
        <button
          onClick={() => onNavigate("menu")}
          className="flex flex-col items-center gap-0.5 text-primary"
        >
          <span className="text-xl">🏠</span>
          <span className="text-[10px] font-bold">Inicio</span>
        </button>
        <button
          onClick={() => onNavigate("achievements")}
          className="flex flex-col items-center gap-0.5 text-muted-foreground"
        >
          <span className="text-xl">🏆</span>
          <span className="text-[10px] font-bold">Logros</span>
        </button>
        <button
          onClick={() => onNavigate("profile")}
          className="flex flex-col items-center gap-0.5 text-muted-foreground"
        >
          <span className="text-xl">🧒</span>
          <span className="text-[10px] font-bold">Perfil</span>
        </button>
        <button
          onClick={() => onNavigate("parents")}
          className="flex flex-col items-center gap-0.5 text-muted-foreground"
        >
          <span className="text-xl">👨‍👩‍👧</span>
          <span className="text-[10px] font-bold">Padres</span>
        </button>
      </div>

      <HelpParents open={helpOpen} onOpenChange={setHelpOpen} />
    </div>
  );
};

export default MainMenu;
