import { getLevel, getLevelLabel } from "@/lib/adaptive";
import { getStreak } from "@/lib/streak";

interface AchievementsProps {
  onBack: () => void;
  points: number;
  medals: number;
  gamesPlayed: number;
}

const allMedals = [
  { name: "Primera Palabra", icon: "🥇", requirement: 10 },
  { name: "Explorador", icon: "🌟", requirement: 30 },
  { name: "Hablador", icon: "🗣️", requirement: 50 },
  { name: "Campeón", icon: "🏆", requirement: 100 },
  { name: "Súper Estrella", icon: "💫", requirement: 200 },
  { name: "Maestro", icon: "👑", requirement: 500 },
];

const Achievements = ({ onBack, points, medals, gamesPlayed }: AchievementsProps) => {
  const streak = getStreak();
  const level = Math.floor(points / 50) + 1;
  const progressToNext = (points % 50) / 50;

  const wordsLevel = getLevel("words");
  const repeatLevel = getLevel("repeat");
  const gamesLevel = getLevel("games");

  return (
    <div className="app-shell flex flex-col min-h-dvh bg-background px-5 py-6 pb-4">
      <div className="flex items-center justify-between mb-5">
        <button onClick={onBack} className="text-2xl p-2">←</button>
        <h2 className="text-xl font-black text-foreground">Mis Logros 🏆</h2>
        <div />
      </div>

      {/* Streak card */}
      <div className="bg-card rounded-2xl p-5 text-center mb-4 shadow-sm">
        <span className="text-4xl block mb-1">🔥</span>
        <p className="text-3xl font-black text-foreground">{streak} días seguidos</p>
      </div>

      {/* Level + Points row */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-primary/10 rounded-2xl p-4 text-center">
          <p className="text-xs text-muted-foreground font-bold">Nivel</p>
          <p className="text-3xl font-black text-primary">{level}</p>
          <div className="w-full bg-muted rounded-full h-2.5 mt-2">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-700"
              style={{ width: `${progressToNext * 100}%` }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground font-semibold mt-1">
            {points % 50}/50
          </p>
        </div>
        <div className="bg-accent/20 rounded-2xl p-4 text-center">
          <p className="text-xs text-muted-foreground font-bold">Puntos</p>
          <p className="text-3xl font-black text-foreground">{points}</p>
          <p className="text-xs text-muted-foreground font-bold mt-1">⭐</p>
          <p className="text-[10px] text-muted-foreground font-semibold mt-1">
            {gamesPlayed} juegos
          </p>
        </div>
      </div>

      {/* Adaptive levels */}
      <h3 className="text-sm font-black text-foreground mb-2">Dificultad</h3>
      <div className="flex gap-2 mb-4">
        {[
          { label: "🖼️", lvl: wordsLevel },
          { label: "🗣️", lvl: repeatLevel },
          { label: "🎮", lvl: gamesLevel },
        ].map((item) => (
          <div key={item.label} className="bg-card rounded-2xl p-3 flex-1 text-center shadow-sm">
            <span className="text-lg">{item.label}</span>
            <p className="text-xs font-bold text-muted-foreground mt-1">{getLevelLabel(item.lvl)}</p>
          </div>
        ))}
      </div>

      {/* Medals */}
      <h3 className="text-sm font-black text-foreground mb-2">Medallas ({medals})</h3>
      <div className="grid grid-cols-3 gap-2">
        {allMedals.map((medal, idx) => {
          const unlocked = points >= medal.requirement;
          return (
            <div
              key={idx}
              className={`rounded-2xl p-3 flex flex-col items-center gap-1 text-center ${
                unlocked
                  ? "bg-accent/30 medal-shimmer"
                  : "bg-muted/50 opacity-50"
              }`}
            >
              <span className="text-3xl">{unlocked ? medal.icon : "🔒"}</span>
              <span className="text-[10px] font-bold text-foreground leading-tight">
                {medal.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;
