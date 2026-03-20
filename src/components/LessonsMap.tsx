import { getLevel } from "@/lib/adaptive";

interface LessonsMapProps {
  onNavigate: (screen: string) => void;
  points: number;
}

const lessons = [
  { id: "games", label: "Sonidos", icon: "🔊", color: "bg-secondary", unlockAt: 0 },
  { id: "repeat", label: "Sílabas", icon: "🔤", color: "bg-accent", unlockAt: 0 },
  { id: "words", label: "Palabras", icon: "📝", color: "bg-sky", unlockAt: 15 },
  { id: "phrases", label: "Frases", icon: "💬", color: "bg-primary", unlockAt: 50 },
  { id: "stories", label: "Historias", icon: "📖", color: "bg-earth", unlockAt: 120 },
];

const LessonsMap = ({ onNavigate, points }: LessonsMapProps) => {
  return (
    <div className="flex flex-col items-center py-2">
      {lessons.map((lesson, idx) => {
        const unlocked = points >= lesson.unlockAt;
        const isLast = idx === lessons.length - 1;

        return (
          <div key={lesson.id} className="flex flex-col items-center">
            {/* Node */}
            <button
              onClick={() => unlocked && onNavigate(lesson.id)}
              disabled={!unlocked}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-md transition-all duration-200 ${
                unlocked
                  ? `${lesson.color} active:scale-95`
                  : "bg-muted opacity-60"
              }`}
            >
              {unlocked ? lesson.icon : "🔒"}
            </button>
            <span className={`text-sm font-black mt-1.5 ${unlocked ? "text-foreground" : "text-muted-foreground"}`}>
              {lesson.label} {!unlocked && "🔒"}
            </span>

            {/* Connector line */}
            {!isLast && (
              <div className="w-0.5 h-8 border-l-2 border-dashed border-muted-foreground/30 my-1" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LessonsMap;
