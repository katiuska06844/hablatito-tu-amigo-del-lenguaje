interface RewardsProps {
  onBack: () => void;
  points: number;
  medals: number;
}

const allMedals = [
  { name: "Primera Palabra", icon: "🥇", requirement: 10 },
  { name: "Explorador", icon: "🌟", requirement: 30 },
  { name: "Hablador", icon: "🗣️", requirement: 50 },
  { name: "Campeón", icon: "🏆", requirement: 100 },
  { name: "Súper Estrella", icon: "💫", requirement: 200 },
  { name: "Maestro", icon: "👑", requirement: 500 },
];

const Rewards = ({ onBack, points, medals }: RewardsProps) => {
  return (
    <div className="app-shell flex flex-col min-h-dvh bg-background px-5 py-6">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-2xl p-2">←</button>
        <h2 className="text-xl font-black text-foreground">Premios</h2>
        <div />
      </div>

      {/* Points display */}
      <div className="bg-accent/20 rounded-3xl p-6 text-center mb-6">
        <span className="text-5xl block mb-2">⭐</span>
        <p className="text-4xl font-black text-foreground">{points}</p>
        <p className="text-muted-foreground font-bold">puntos totales</p>
      </div>

      {/* Medals */}
      <h3 className="text-lg font-black text-foreground mb-4">Medallas ({medals})</h3>
      <div className="grid grid-cols-3 gap-3">
        {allMedals.map((medal, idx) => {
          const unlocked = points >= medal.requirement;
          return (
            <div
              key={idx}
              className={`rounded-2xl p-4 flex flex-col items-center gap-2 text-center ${
                unlocked
                  ? "bg-accent/30 medal-shimmer"
                  : "bg-muted/50 opacity-50"
              }`}
            >
              <span className="text-4xl">{unlocked ? medal.icon : "🔒"}</span>
              <span className="text-xs font-bold text-foreground leading-tight">
                {medal.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rewards;
