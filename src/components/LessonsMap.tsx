interface LessonsMapProps {
  onNavigate: (screen: string) => void;
  points: number;
}

const lessons = [
  { id: "games", label: "Sonidos", icon: "🔊", color: "from-sky to-secondary", unlockAt: 0 },
  { id: "repeat", label: "Sílabas", icon: "🔤", color: "from-accent to-[hsl(35,80%,55%)]", unlockAt: 0 },
  { id: "animals", label: "Animales", icon: "🐾", color: "from-primary to-[hsl(145,55%,35%)]", unlockAt: 0 },
  { id: "words", label: "Palabras", icon: "📝", color: "from-sky to-primary", unlockAt: 15 },
  { id: "fruits", label: "Frutas", icon: "🍎", color: "from-accent to-[hsl(15,70%,55%)]", unlockAt: 30 },
  { id: "colors", label: "Colores", icon: "🎨", color: "from-secondary to-accent", unlockAt: 50 },
  { id: "emotions", label: "Emociones", icon: "😊", color: "from-andean-warm to-accent", unlockAt: 70 },
  { id: "bodyparts", label: "Cuerpo", icon: "👶", color: "from-sky to-[hsl(180,50%,50%)]", unlockAt: 90 },
  { id: "phrases", label: "Frases", icon: "💬", color: "from-primary to-secondary", unlockAt: 120 },
  { id: "rural", label: "Mi Pueblo", icon: "🏡", color: "from-earth to-[hsl(35,45%,45%)]", unlockAt: 150 },
  { id: "stories", label: "Historias", icon: "📖", color: "from-secondary to-primary", unlockAt: 200 },
];

const TreasureChest = ({ unlocked }: { unlocked: boolean }) => (
  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all ${
    unlocked ? "bg-gradient-to-br from-[#FFD700] to-[#FFA500] animate-pulse-glow" : "bg-muted/60 opacity-50"
  }`}>
    <span className="text-3xl">{unlocked ? "🎁" : "🔒"}</span>
  </div>
);

const LessonsMap = ({ onNavigate, points }: LessonsMapProps) => {
  return (
    <div className="flex flex-col items-center py-2">
      {lessons.map((lesson, idx) => {
        const unlocked = points >= lesson.unlockAt;
        const isLast = idx === lessons.length - 1;
        const offset = idx % 3 === 0 ? "translate-x-0" : idx % 3 === 1 ? "translate-x-10" : "-translate-x-10";

        // Show treasure chest after every 5th lesson (after index 4, 9)
        const showChest = (idx + 1) % 5 === 0;

        return (
          <div key={lesson.id} className={`flex flex-col items-center transition-transform ${offset}`}>
            {/* Lesson node */}
            <button
              onClick={() => unlocked && onNavigate(lesson.id)}
              disabled={!unlocked}
              className={`w-[76px] h-[76px] rounded-full flex items-center justify-center text-3xl shadow-xl transition-all duration-200 border-4 ${
                unlocked
                  ? `bg-gradient-to-br ${lesson.color} border-white/50 active:scale-95 animate-pulse-glow`
                  : "bg-muted/40 border-muted opacity-50"
              }`}
            >
              {unlocked ? lesson.icon : "🔒"}
            </button>
            <span className={`text-xs font-black mt-1 drop-shadow-sm ${unlocked ? "text-foreground" : "text-muted-foreground"}`}>
              {lesson.label}
            </span>

            {/* Connector line */}
            {!isLast && !showChest && (
              <div className="w-0.5 h-7 border-l-2 border-dashed border-foreground/20 my-1" />
            )}

            {/* Treasure chest after every 5 lessons */}
            {showChest && (
              <>
                <div className="w-0.5 h-4 border-l-2 border-dashed border-foreground/20 my-1" />
                <TreasureChest unlocked={unlocked} />
                <span className="text-[10px] font-black mt-1 text-accent">+10 ⭐</span>
                {!isLast && (
                  <div className="w-0.5 h-4 border-l-2 border-dashed border-foreground/20 my-1" />
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LessonsMap;
