import { useState } from "react";

interface LessonsMapProps {
  onNavigate: (screen: string) => void;
  points: number;
  onAddPoints?: (pts: number) => void;
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

// Confetti particle component
const ConfettiParticle = ({ delay, x, color }: { delay: number; x: number; color: string }) => (
  <div
    className="absolute w-2 h-2 rounded-full animate-confetti-fall pointer-events-none"
    style={{
      left: `${x}%`,
      backgroundColor: color,
      animationDelay: `${delay}ms`,
      top: '-8px',
    }}
  />
);

const CONFETTI_COLORS = ['#FF6B8A', '#FFD54F', '#4FC35A', '#60C8F0', '#AB7DF6', '#FF8A65'];

const TreasureChest = ({ unlocked, index, onClaim }: { unlocked: boolean; index: number; onClaim: () => void }) => {
  const [opened, setOpened] = useState(false);
  const [reward, setReward] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Check localStorage if already claimed
  const phone = typeof window !== 'undefined' ? localStorage.getItem("hablatito_current") : null;
  const claimKey = `hablatito_chest_${phone}_${index}`;
  const alreadyClaimed = typeof window !== 'undefined' && localStorage.getItem(claimKey) === "1";

  const handleClick = () => {
    if (!unlocked || opened || alreadyClaimed) return;
    const pts = Math.floor(Math.random() * 16) + 5; // 5-20 random points
    setReward(pts);
    setOpened(true);
    setShowConfetti(true);
    localStorage.setItem(claimKey, "1");
    onClaim();
    // Actually add points
    if (typeof window !== 'undefined') {
      const progress = localStorage.getItem(`hablatito_progress_${phone}`);
      if (progress) {
        const p = JSON.parse(progress);
        p.points = (p.points || 0) + pts;
        localStorage.setItem(`hablatito_progress_${phone}`, JSON.stringify(p));
      }
    }
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const isOpen = opened || alreadyClaimed;

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        disabled={!unlocked || isOpen}
        className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all relative overflow-visible ${
          !unlocked
            ? "bg-muted/60 opacity-50"
            : isOpen
            ? "bg-gradient-to-br from-[#FFD700] to-[#FFA500]"
            : "bg-gradient-to-br from-[#FFD700] to-[#FFA500] animate-pulse-glow active:scale-95 cursor-pointer ring-2 ring-[#FFD700]/50"
        }`}
      >
        <span className="text-3xl">
          {!unlocked ? "🔒" : isOpen ? "🎁" : "📦"}
        </span>
        {/* Confetti */}
        {showConfetti && (
          <div className="absolute inset-0 overflow-visible">
            {Array.from({ length: 20 }).map((_, i) => (
              <ConfettiParticle
                key={i}
                delay={i * 60}
                x={Math.random() * 140 - 20}
                color={CONFETTI_COLORS[i % CONFETTI_COLORS.length]}
              />
            ))}
          </div>
        )}
      </button>
      {isOpen && reward !== null && (
        <span className="text-[10px] font-black mt-1 text-accent block text-center">+{reward} ⭐</span>
      )}
      {isOpen && alreadyClaimed && reward === null && (
        <span className="text-[10px] font-black mt-1 text-muted-foreground block text-center">Abierto ✓</span>
      )}
      {!unlocked && (
        <span className="text-[10px] font-black mt-1 text-muted-foreground block text-center">🔒</span>
      )}
      {unlocked && !isOpen && (
        <span className="text-[10px] font-black mt-1 text-accent block text-center animate-bounce">¡Toca!</span>
      )}
    </div>
  );
};

const LessonsMap = ({ onNavigate, points, onAddPoints }: LessonsMapProps) => {
  const [, forceUpdate] = useState(0);

  return (
    <div className="flex flex-col items-center py-2">
      {lessons.map((lesson, idx) => {
        const unlocked = points >= lesson.unlockAt;
        const isLast = idx === lessons.length - 1;
        const offset = idx % 3 === 0 ? "translate-x-0" : idx % 3 === 1 ? "translate-x-10" : "-translate-x-10";

        const showChest = (idx + 1) % 5 === 0;

        return (
          <div key={lesson.id} className={`flex flex-col items-center transition-transform ${offset}`}>
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

            {!isLast && !showChest && (
              <div className="w-0.5 h-7 border-l-2 border-dashed border-foreground/20 my-1" />
            )}

            {showChest && (
              <>
                <div className="w-0.5 h-4 border-l-2 border-dashed border-foreground/20 my-1" />
                <TreasureChest
                  unlocked={unlocked}
                  index={idx}
                  onClaim={() => {
                    forceUpdate(n => n + 1);
                    if (onAddPoints) onAddPoints(0); // trigger parent re-render
                  }}
                />
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
