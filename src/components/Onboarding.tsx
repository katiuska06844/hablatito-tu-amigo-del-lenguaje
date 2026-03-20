import { useState } from "react";
import titoMascot from "@/assets/tito-mascot.png";
import ruralLandscape from "@/assets/rural-landscape.png";

interface OnboardingProps {
  onComplete: () => void;
}

const steps = [
  {
    title: "¡Hola! Soy Tito 🦙",
    description: "Tu amigo que te ayudará a aprender palabras nuevas",
    showMascot: true,
  },
  {
    title: "¡Vamos a jugar!",
    description: "Toca las imágenes, escucha las palabras y repítelas",
    icon: "🎮",
  },
  {
    title: "¡Gana medallas! 🏅",
    description: "Cada vez que juegas, ganas puntos y premios",
    icon: "⭐",
  },
];

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState(0);

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else onComplete();
  };

  const current = steps[step];

  return (
    <div className="app-shell flex flex-col items-center justify-between min-h-dvh bg-background px-6 py-10">
      {/* Landscape background */}
      <div className="w-full flex justify-center mt-4">
        <img src={ruralLandscape} alt="Paisaje" className="w-full max-w-xs opacity-80" />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center gap-4 animate-bounce-in" key={step}>
        {current.showMascot ? (
          <img src={titoMascot} alt="Tito" className="w-40 h-40 animate-float" />
        ) : (
          <span className="text-7xl">{current.icon}</span>
        )}
        <h1 className="text-3xl font-black text-foreground">{current.title}</h1>
        <p className="text-lg text-muted-foreground font-semibold max-w-[280px]">
          {current.description}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex flex-col items-center gap-4 w-full">
        {/* Dots */}
        <div className="flex gap-3">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === step ? "bg-primary scale-125" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="btn-child w-full max-w-[280px] bg-primary text-primary-foreground"
        >
          {step === steps.length - 1 ? "¡Empezar!" : "Siguiente →"}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
