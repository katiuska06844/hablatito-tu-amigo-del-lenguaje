import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const lessonHelp = [
  {
    icon: "🔊",
    title: "Sonidos",
    tip: "Tu hijo escuchará sonidos de animales y deberá elegir el correcto. Puedes ayudarle imitando los sonidos juntos.",
  },
  {
    icon: "🔤",
    title: "Sílabas",
    tip: "Escucharán sílabas y deberán repetirlas. Anima a tu hijo a mover la boca exageradamente.",
  },
  {
    icon: "📝",
    title: "Palabras",
    tip: "Se muestran imágenes con su nombre. Pide a tu hijo que señale y nombre lo que ve.",
  },
  {
    icon: "💬",
    title: "Frases",
    tip: "Frases cortas para practicar. Repítanlas juntos varias veces como un juego.",
  },
  {
    icon: "📖",
    title: "Historias",
    tip: "Cuentos cortos con imágenes. Haz preguntas como '¿Qué pasó?' para estimular la conversación.",
  },
];

interface HelpParentsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HelpParents = ({ open, onOpenChange }: HelpParentsProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[380px] rounded-3xl p-5 max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-black text-center">
            🤝 Ayuda para mamá y papá
          </DialogTitle>
          <DialogDescription className="text-sm text-center text-muted-foreground font-semibold">
            Consejos rápidos para cada lección
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-2">
          {lessonHelp.map((item, idx) => (
            <div key={idx} className="bg-muted/40 rounded-2xl p-3 flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <div>
                <p className="font-bold text-sm text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
                  {item.tip}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-primary/10 rounded-2xl p-3 mt-2">
          <p className="text-xs text-foreground font-bold text-center">
            💡 Recuerda: 5 minutos al día hacen la diferencia
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpParents;
