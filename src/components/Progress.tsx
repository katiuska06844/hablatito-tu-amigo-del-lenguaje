import { getLevel, getLevelLabel } from "@/lib/adaptive";

interface ProgressProps {
  onBack: () => void;
  points: number;
  gamesPlayed: number;
}

const Progress = ({ onBack, points, gamesPlayed }: ProgressProps) => {
  const level = Math.floor(points / 50) + 1;
  const progressToNext = (points % 50) / 50;

  const wordsLevel = getLevel("words");
  const repeatLevel = getLevel("repeat");
  const gamesLevel = getLevel("games");

  const weekDays = ["L", "M", "Mi", "J", "V", "S", "D"];
  const activeDays = [true, true, false, true, true, false, false];

  return (
    <div className="app-shell flex flex-col min-h-dvh bg-background px-5 py-6">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-2xl p-2">←</button>
        <h2 className="text-xl font-black text-foreground">Progreso</h2>
        <div />
      </div>

      {/* Level card */}
      <div className="bg-primary/10 rounded-3xl p-6 text-center mb-6">
        <p className="text-muted-foreground font-bold text-sm">Nivel general</p>
        <p className="text-5xl font-black text-primary my-2">{level}</p>
        <div className="w-full bg-muted rounded-full h-4 mt-3">
          <div
            className="bg-primary h-4 rounded-full transition-all duration-700"
            style={{ width: `${progressToNext * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground font-semibold mt-2">
          {points % 50}/50 para el siguiente nivel
        </p>
      </div>

      {/* Adaptive levels per activity */}
      <h3 className="text-lg font-black text-foreground mb-3">Dificultad adaptativa</h3>
      <div className="flex flex-col gap-2 mb-6">
        {[
          { label: "🖼️ Palabras", lvl: wordsLevel },
          { label: "🗣️ Repetir", lvl: repeatLevel },
          { label: "🎮 Juegos", lvl: gamesLevel },
        ].map((item) => (
          <div key={item.label} className="bg-card rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <span className="font-bold text-foreground">{item.label}</span>
            <span className="text-sm font-bold text-muted-foreground">{getLevelLabel(item.lvl)}</span>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-card rounded-2xl p-4 text-center shadow-sm">
          <span className="text-3xl">⭐</span>
          <p className="text-2xl font-black text-foreground mt-1">{points}</p>
          <p className="text-xs text-muted-foreground font-bold">Puntos</p>
        </div>
        <div className="bg-card rounded-2xl p-4 text-center shadow-sm">
          <span className="text-3xl">🎮</span>
          <p className="text-2xl font-black text-foreground mt-1">{gamesPlayed}</p>
          <p className="text-xs text-muted-foreground font-bold">Juegos</p>
        </div>
      </div>

      {/* Weekly activity */}
      <h3 className="text-lg font-black text-foreground mb-3">Esta semana</h3>
      <div className="flex justify-between bg-card rounded-2xl p-4 shadow-sm">
        {weekDays.map((day, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                activeDays[idx]
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {activeDays[idx] ? "✓" : "·"}
            </div>
            <span className="text-xs font-bold text-muted-foreground">{day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;
