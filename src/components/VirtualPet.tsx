interface VirtualPetProps {
  completedLessons: number;
}

const petStages = [
  { minLessons: 0, emoji: "🥚", name: "Huevito", description: "¡Completa lecciones para que nazca!" },
  { minLessons: 3, emoji: "🐣", name: "Pollito", description: "¡Tu mascota nació!" },
  { minLessons: 8, emoji: "🐥", name: "Patito", description: "¡Está creciendo!" },
  { minLessons: 15, emoji: "🦜", name: "Lorito", description: "¡Ya puede hablar!" },
  { minLessons: 25, emoji: "🦅", name: "Águila", description: "¡Es un campeón!" },
];

const VirtualPet = ({ completedLessons }: VirtualPetProps) => {
  const currentStage = [...petStages].reverse().find((s) => completedLessons >= s.minLessons) || petStages[0];
  const nextStage = petStages.find((s) => completedLessons < s.minLessons);

  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm">
      <p className="text-xs font-bold text-muted-foreground mb-2 text-center">Mi Mascota</p>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-4xl animate-float flex-shrink-0">
          {currentStage.emoji}
        </div>
        <div className="flex-1">
          <p className="font-black text-foreground text-base">{currentStage.name}</p>
          <p className="text-xs text-muted-foreground font-semibold">{currentStage.description}</p>
          {nextStage && (
            <div className="mt-1.5">
              <div className="flex items-center justify-between text-[10px] text-muted-foreground font-bold mb-0.5">
                <span>Siguiente: {nextStage.emoji} {nextStage.name}</span>
                <span>{completedLessons}/{nextStage.minLessons}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-accent h-2 rounded-full transition-all duration-700"
                  style={{ width: `${Math.min((completedLessons / nextStage.minLessons) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}
          {!nextStage && (
            <p className="text-xs font-bold text-secondary mt-1">🎉 ¡Nivel máximo!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VirtualPet;
