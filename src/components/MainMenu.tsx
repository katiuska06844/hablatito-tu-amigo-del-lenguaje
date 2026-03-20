import titoMascot from "@/assets/tito-mascot.png";

interface MainMenuProps {
  onNavigate: (screen: string) => void;
  points: number;
  medals: number;
  onLogout: () => void;
}

const menuItems = [
  { id: "words", label: "Palabras", icon: "🖼️", color: "bg-primary" },
  { id: "games", label: "Juegos", icon: "🎮", color: "bg-secondary" },
  { id: "repeat", label: "Repetir", icon: "🗣️", color: "bg-sky" },
  { id: "rewards", label: "Premios", icon: "🏅", color: "bg-accent" },
];

const MainMenu = ({ onNavigate, points, medals }: MainMenuProps) => {
  return (
    <div className="app-shell flex flex-col min-h-dvh bg-background px-5 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img src={titoMascot} alt="Tito" className="w-12 h-12 animate-float" />
          <div>
            <p className="text-sm font-bold text-muted-foreground">¡Hola!</p>
            <p className="text-lg font-black text-foreground">HablaTito</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="bg-accent/30 rounded-2xl px-3 py-1.5 flex items-center gap-1">
            <span className="text-sm">⭐</span>
            <span className="text-sm font-bold text-foreground">{points}</span>
          </div>
          <div className="bg-primary/20 rounded-2xl px-3 py-1.5 flex items-center gap-1">
            <span className="text-sm">🏅</span>
            <span className="text-sm font-bold text-foreground">{medals}</span>
          </div>
        </div>
      </div>

      {/* Greeting card */}
      <div className="bg-primary/10 rounded-3xl p-5 mb-6 flex items-center gap-4">
        <span className="text-5xl">👋</span>
        <div>
          <p className="font-black text-lg text-foreground">¿Listo para aprender?</p>
          <p className="text-sm text-muted-foreground font-semibold">
            Toca una actividad para empezar
          </p>
        </div>
      </div>

      {/* Activity grid */}
      <div className="grid grid-cols-2 gap-4 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`game-card ${item.color} flex flex-col items-center justify-center gap-3 min-h-[140px]`}
          >
            <span className="text-5xl">{item.icon}</span>
            <span className="text-lg font-bold text-primary-foreground">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Bottom nav */}
      <div className="flex justify-around mt-6 pt-4 border-t border-border">
        <button
          onClick={() => onNavigate("menu")}
          className="flex flex-col items-center gap-1 text-primary"
        >
          <span className="text-2xl">🏠</span>
          <span className="text-xs font-bold">Inicio</span>
        </button>
        <button
          onClick={() => onNavigate("progress")}
          className="flex flex-col items-center gap-1 text-muted-foreground"
        >
          <span className="text-2xl">📊</span>
          <span className="text-xs font-bold">Progreso</span>
        </button>
        <button
          onClick={() => onNavigate("parents")}
          className="flex flex-col items-center gap-1 text-muted-foreground"
        >
          <span className="text-2xl">👨‍👩‍👧</span>
          <span className="text-xs font-bold">Padres</span>
        </button>
      </div>
    </div>
  );
};

export default MainMenu;
