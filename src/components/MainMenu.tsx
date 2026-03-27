import { useEffect, useState } from "react";
import titoMascot from "@/assets/tito-mascot-new.png";
import LessonsMap from "@/components/LessonsMap";
import AndeanBackground from "@/components/AndeanBackground";
import { updateStreak } from "@/lib/streak";

interface MainMenuProps {
  onNavigate: (screen: string) => void;
  points: number;
  medals: number;
  childName: string;
  onLogout: () => void;
}

const MainMenu = ({ onNavigate, points, medals, childName, onLogout }: MainMenuProps) => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const s = updateStreak();
    setStreak(s);
  }, []);

  return (
    <div className="app-shell flex flex-col min-h-dvh relative">
      <AndeanBackground />

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-3 relative z-10">
        <div className="flex items-center gap-3">
          <img src={titoMascot} alt="Tito" className="w-12 h-12 animate-float rounded-full border-2 border-white/60 shadow-md" width={48} height={48} />
          <div>
            <p className="text-base font-black text-foreground drop-shadow-sm">¡Hola, {childName}!</p>
            <p className="text-xs text-foreground/70 font-bold">⭐ {points} pts</p>
          </div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-3 py-1.5 flex items-center gap-1 shadow-md">
          <span className="text-base">🔥</span>
          <span className="text-sm font-black text-foreground">{streak}</span>
        </div>
      </div>

      {/* Title */}
      <div className="text-center px-5 mb-2 relative z-10">
        <p className="text-sm font-black text-foreground/80 tracking-wide uppercase drop-shadow-sm">Tu camino de aprendizaje 🗺️</p>
      </div>

      {/* Lessons map */}
      <div className="flex-1 overflow-y-auto px-5 pb-2 relative z-10">
        <LessonsMap onNavigate={onNavigate} points={points} />
      </div>

      {/* Bottom nav */}
      <div className="flex justify-around border-t border-white/30 bg-white/70 backdrop-blur-md py-2.5 px-2 relative z-10">
        <button onClick={() => onNavigate("menu")} className="flex flex-col items-center gap-0.5 text-primary">
          <span className="text-xl">🏠</span>
          <span className="text-[10px] font-bold">Inicio</span>
        </button>
        <button onClick={() => onNavigate("achievements")} className="flex flex-col items-center gap-0.5 text-foreground/60">
          <span className="text-xl">🏆</span>
          <span className="text-[10px] font-bold">Logros</span>
        </button>
        <button onClick={() => onNavigate("shop")} className="flex flex-col items-center gap-0.5 text-foreground/60">
          <span className="text-xl">🛍️</span>
          <span className="text-[10px] font-bold">Tienda</span>
        </button>
        <button onClick={() => onNavigate("profile")} className="flex flex-col items-center gap-0.5 text-foreground/60">
          <span className="text-xl">🧒</span>
          <span className="text-[10px] font-bold">Perfil</span>
        </button>
        <button onClick={() => onNavigate("parents")} className="flex flex-col items-center gap-0.5 text-foreground/60">
          <span className="text-xl">👨‍👩‍👧</span>
          <span className="text-[10px] font-bold">Padres</span>
        </button>
      </div>
    </div>
  );
};

export default MainMenu;
