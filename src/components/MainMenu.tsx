import { useEffect, useState } from "react";
import titoMascot from "@/assets/tito-mascot-new.png";
import andeanBg from "@/assets/andean-bg.jpg";
import LessonsMap from "@/components/LessonsMap";
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

  useEffect(() => {
    const s = updateStreak();
    setStreak(s);
  }, []);

  return (
    <div
      className="app-shell flex flex-col min-h-dvh"
      style={{
        backgroundImage: `linear-gradient(to bottom, hsla(200,65%,85%,0.85), hsla(120,25%,92%,0.9)), url(${andeanBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-3">
        <div className="flex items-center gap-3">
          <img src={titoMascot} alt="Tito" className="w-12 h-12 animate-float rounded-full" width={48} height={48} />
          <div>
            <p className="text-base font-black text-foreground">¡Hola, {childName}!</p>
            <p className="text-xs text-muted-foreground font-bold">⭐ {points} pts</p>
          </div>
        </div>
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl px-3 py-1.5 flex items-center gap-1 shadow-sm">
          <span className="text-base">🔥</span>
          <span className="text-sm font-black text-foreground">{streak}</span>
        </div>
      </div>

      {/* Title */}
      <div className="text-center px-5 mb-2">
        <p className="text-sm font-black text-foreground/70 tracking-wide uppercase">Tu camino de aprendizaje 🗺️</p>
      </div>

      {/* Lessons map */}
      <div className="flex-1 overflow-y-auto px-5 pb-2">
        <LessonsMap onNavigate={onNavigate} points={points} />
      </div>

      {/* Bottom nav */}
      <div className="flex justify-around border-t border-border/50 bg-card/80 backdrop-blur-sm py-2.5 px-2">
        <button onClick={() => onNavigate("menu")} className="flex flex-col items-center gap-0.5 text-primary">
          <span className="text-xl">🏠</span>
          <span className="text-[10px] font-bold">Inicio</span>
        </button>
        <button onClick={() => onNavigate("achievements")} className="flex flex-col items-center gap-0.5 text-muted-foreground">
          <span className="text-xl">🏆</span>
          <span className="text-[10px] font-bold">Logros</span>
        </button>
        <button onClick={() => onNavigate("shop")} className="flex flex-col items-center gap-0.5 text-muted-foreground">
          <span className="text-xl">🛍️</span>
          <span className="text-[10px] font-bold">Tienda</span>
        </button>
        <button onClick={() => onNavigate("profile")} className="flex flex-col items-center gap-0.5 text-muted-foreground">
          <span className="text-xl">🧒</span>
          <span className="text-[10px] font-bold">Perfil</span>
        </button>
        <button onClick={() => onNavigate("parents")} className="flex flex-col items-center gap-0.5 text-muted-foreground">
          <span className="text-xl">👨‍👩‍👧</span>
          <span className="text-[10px] font-bold">Padres</span>
        </button>
      </div>
    </div>
  );
};

export default MainMenu;
