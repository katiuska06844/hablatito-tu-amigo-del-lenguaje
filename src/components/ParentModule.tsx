interface ParentModuleProps {
  onBack: () => void;
  onLogout?: () => void;
}

const tips = [
  { icon: "💬", title: "Habla con tu hijo", text: "Nombra las cosas que ven juntos." },
  { icon: "📖", title: "Cuenta cuentos", text: "Usa cuentos cortos antes de dormir." },
  { icon: "🎵", title: "Canta canciones", text: "Las canciones ayudan a recordar palabras." },
  { icon: "🤝", title: "Juega junto", text: "Usa la app con tu hijo, no lo dejes solo." },
  { icon: "⏰", title: "5 minutos al día", text: "Poco tiempo pero todos los días." },
  { icon: "❤️", title: "Ten paciencia", text: "Cada niño aprende a su ritmo." },
];

const ParentModule = ({ onBack, onLogout }: ParentModuleProps) => {
  return (
    <div className="app-shell flex flex-col min-h-dvh bg-background px-5 py-6">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-2xl p-2">←</button>
        <h2 className="text-xl font-black text-foreground">Guía para Padres</h2>
        <div />
      </div>

      <div className="bg-secondary/10 rounded-3xl p-5 mb-6">
        <p className="text-lg font-black text-foreground mb-1">👨‍👩‍👧 Para mamá y papá</p>
        <p className="text-sm text-muted-foreground font-semibold">
          Consejos simples para ayudar a tu hijo a hablar mejor.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {tips.map((tip, idx) => (
          <div key={idx} className="bg-card rounded-2xl p-4 flex items-start gap-4 shadow-sm">
            <span className="text-3xl flex-shrink-0">{tip.icon}</span>
            <div>
              <p className="font-bold text-foreground">{tip.title}</p>
              <p className="text-sm text-muted-foreground font-semibold">{tip.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentModule;
