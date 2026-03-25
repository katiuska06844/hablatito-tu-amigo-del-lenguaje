import { useState, useEffect } from "react";
import { speakWord, speakCelebration } from "@/lib/speech";

interface Props {
  onBack: () => void;
  onPoints: (pts: number) => void;
}

type StoryPage = {
  text: string;
  emoji: string;
  background: string;
  interactive?: { instruction: string; emoji: string };
};

type Story = { title: string; icon: string; pages: StoryPage[] };

const stories: Story[] = [
  {
    title: "Tito va al mercado",
    icon: "🦙",
    pages: [
      { text: "Tito la llama vive en las montañas.", emoji: "🏔️", background: "bg-secondary/10" },
      { text: "Un día, mamá le dice: ¡Vamos al mercado!", emoji: "👩", background: "bg-accent/10", interactive: { instruction: "¡Toca a mamá para saludar!", emoji: "👋" } },
      { text: "En el camino ven una alpaca.", emoji: "🦙", background: "bg-primary/10", interactive: { instruction: "¡Toca la alpaca!", emoji: "🦙" } },
      { text: "En el mercado hay papas, maíz y frutas.", emoji: "🏪", background: "bg-accent/10", interactive: { instruction: "¡Toca las papas!", emoji: "🥔" } },
      { text: "Tito compra maíz para la sopa.", emoji: "🌽", background: "bg-secondary/10" },
      { text: "¡Tito regresa feliz a casa!", emoji: "🏡", background: "bg-primary/10" },
    ],
  },
  {
    title: "La fiesta del pueblo",
    icon: "🎉",
    pages: [
      { text: "Hoy es la fiesta del pueblo.", emoji: "🎉", background: "bg-accent/10" },
      { text: "Los niños bailan con música.", emoji: "💃", background: "bg-secondary/10", interactive: { instruction: "¡Toca para bailar!", emoji: "🎵" } },
      { text: "Hay comida rica: cuy y papa.", emoji: "🍽️", background: "bg-primary/10", interactive: { instruction: "¡Toca la comida!", emoji: "🐹" } },
      { text: "Los fuegos artificiales iluminan el cielo.", emoji: "🎆", background: "bg-secondary/10" },
      { text: "Todos están felices en la fiesta.", emoji: "😊", background: "bg-accent/10" },
    ],
  },
  {
    title: "El cóndor y la montaña",
    icon: "🦅",
    pages: [
      { text: "En lo alto de la montaña vive un cóndor.", emoji: "🦅", background: "bg-secondary/10" },
      { text: "El cóndor tiene alas muy grandes.", emoji: "🦅", background: "bg-primary/10", interactive: { instruction: "¡Abre los brazos como un cóndor!", emoji: "🤗" } },
      { text: "Desde arriba ve el río y el campo.", emoji: "🏞️", background: "bg-accent/10", interactive: { instruction: "¡Mira hacia abajo!", emoji: "👀" } },
      { text: "El cóndor vuela libre y feliz.", emoji: "🌤️", background: "bg-secondary/10" },
      { text: "¡Es el ave más grande del Perú!", emoji: "🇵🇪", background: "bg-primary/10" },
    ],
  },
];

const StoriesActivity = ({ onBack, onPoints }: Props) => {
  const [storyIdx, setStoryIdx] = useState<number | null>(null);
  const [pageIdx, setPageIdx] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [storiesDone, setStoriesDone] = useState(0);

  const story = storyIdx !== null ? stories[storyIdx] : null;
  const page = story ? story.pages[pageIdx] : null;

  useEffect(() => {
    if (page) speakWord(page.text);
  }, [pageIdx, storyIdx]);

  const handleInteract = () => {
    if (!page?.interactive || interacted) return;
    setInteracted(true);
    speakCelebration("¡Muy bien!");
  };

  const nextPage = () => {
    if (!story) return;
    if (pageIdx < story.pages.length - 1) {
      setPageIdx(p => p + 1);
      setInteracted(false);
    } else {
      setStoriesDone(d => d + 1);
      onPoints(15);
      setStoryIdx(null);
      setPageIdx(0);
      setInteracted(false);
    }
  };

  const prevPage = () => {
    if (pageIdx > 0) { setPageIdx(p => p - 1); setInteracted(false); }
  };

  // Story selection
  if (storyIdx === null) return (
    <div className="app-shell andean-bg flex flex-col min-h-dvh px-5 py-6">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-2xl p-2">←</button>
        <h2 className="text-xl font-black text-foreground">📖 Historias</h2>
        <div className="bg-accent/30 rounded-2xl px-3 py-1.5"><span className="text-sm font-bold">📖 {storiesDone}</span></div>
      </div>
      <p className="text-center text-muted-foreground font-semibold mb-6">Elige una historia para leer</p>
      <div className="flex flex-col gap-4">
        {stories.map((s, i) => (
          <button
            key={i}
            onClick={() => setStoryIdx(i)}
            className="bg-card rounded-3xl p-6 shadow-md flex items-center gap-4 active:scale-95 transition-transform"
          >
            <span className="text-5xl">{s.icon}</span>
            <div className="text-left">
              <p className="text-lg font-black text-foreground">{s.title}</p>
              <p className="text-sm text-muted-foreground font-semibold">{s.pages.length} páginas</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // Story reader
  return (
    <div className={`app-shell flex flex-col min-h-dvh px-5 py-6 ${page?.background || "andean-bg"}`}>
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => { setStoryIdx(null); setPageIdx(0); }} className="text-2xl p-2">←</button>
        <h2 className="text-base font-black text-foreground">{story!.title}</h2>
        <span className="text-sm font-bold text-muted-foreground">{pageIdx + 1}/{story!.pages.length}</span>
      </div>

      {/* Progress */}
      <div className="w-full bg-muted rounded-full h-2 mb-6">
        <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: `${((pageIdx + 1) / story!.pages.length) * 100}%` }} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6 animate-bounce-in" key={pageIdx}>
        <span className="text-[100px]">{page!.emoji}</span>
        <p className="text-2xl font-black text-foreground text-center leading-relaxed px-4">{page!.text}</p>

        {page!.interactive && !interacted && (
          <button onClick={handleInteract} className="bg-accent/30 rounded-3xl px-6 py-4 active:scale-95 transition-transform animate-pulse-glow">
            <p className="text-lg font-bold text-foreground">{page!.interactive.instruction}</p>
            <span className="text-4xl block mt-2">{page!.interactive.emoji}</span>
          </button>
        )}

        {interacted && (
          <div className="animate-bounce-in bg-primary/20 rounded-3xl px-6 py-3">
            <span className="text-2xl font-black text-primary">✅ ¡Muy bien!</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-4">
        <button
          onClick={prevPage}
          disabled={pageIdx === 0}
          className="btn-child bg-muted text-foreground disabled:opacity-30"
        >
          ← Atrás
        </button>
        <button onClick={() => { speakWord(page!.text); }} className="text-3xl p-3">🔊</button>
        <button onClick={nextPage} className="btn-child bg-primary text-primary-foreground">
          {pageIdx === story!.pages.length - 1 ? "Fin ✨" : "Siguiente →"}
        </button>
      </div>
    </div>
  );
};

export default StoriesActivity;
