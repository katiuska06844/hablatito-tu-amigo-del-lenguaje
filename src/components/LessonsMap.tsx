import { getLevel } from "@/lib/adaptive";

interface LessonsMapProps {
  onNavigate: (screen: string) => void;
  points: number;
}

const lessons = [
  { id: "games", label: "Sonidos", icon: "🔊", color: "bg-secondary", unlockAt: 0 },
  { id: "repeat", label: "Sílabas", icon: "🔤", color: "bg-accent", unlockAt: 0 },
  { id: "animals", label: "Animales", icon: "🐾", color: "bg-primary", unlockAt: 0 },
  { id: "words", label: "Palabras", icon: "📝", color: "bg-sky", unlockAt: 15 },
  { id: "fruits", label: "Frutas", icon: "🍎", color: "bg-accent", unlockAt: 30 },
  { id: "colors", label: "Colores", icon: "🎨", color: "bg-secondary", unlockAt: 50 },
  { id: "emotions", label: "Emociones", icon: "😊", color: "bg-andean-warm", unlockAt: 70 },
  { id: "bodyparts", label: "Cuerpo", icon: "👶", color: "bg-sky", unlockAt: 90 },
  { id: "phrases", label: "Frases", icon: "💬", color: "bg-primary", unlockAt: 120 },
  { id: "rural", label: "Mi Pueblo", icon: "🏡", color: "bg-earth", unlockAt: 150 },
  { id: "stories", label: "Historias", icon: "📖", color: "bg-secondary", unlockAt: 200 },
];

const LessonsMap = ({ onNavigate, points }: LessonsMapProps) => {
  return (
    <div className="flex flex-col items-center py-2">
      {lessons.map((lesson, idx) => {
        const unlocked = points >= lesson.unlockAt;
        const isLast = idx === lessons.length - 1;
        // Alternate left/right for Duolingo-style path
        const offset = idx % 3 === 0 ? "translate-x-0" : idx % 3 === 1 ? "translate-x-8" : "-translate-x-8";

        return (
          <div key={lesson.id} className={`flex flex-col items-center transition-transform ${offset}`}>
            {/* Node */}
            <button
              onClick={() => unlocked && onNavigate(lesson.id)}
              disabled={!unlocked}
              className={`w-[72px] h-[72px] rounded-full flex items-center justify-center text-3xl shadow-lg transition-all duration-200 ${
                unlocked
                  ? `${lesson.color} active:scale-95 animate-pulse-glow`
                  : "bg-muted opacity-50"
              }`}
            >
              {unlocked ? lesson.icon : "🔒"}
            </button>
            <span className={`text-xs font-black mt-1 ${unlocked ? "text-foreground" : "text-muted-foreground"}`}>
              {lesson.label}
            </span>

            {/* Connector */}
            {!isLast && (
              <div className="w-0.5 h-6 border-l-2 border-dashed border-muted-foreground/30 my-0.5" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LessonsMap;
