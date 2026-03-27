import AvatarDisplay, { type AvatarConfig, type AvatarGender, type AvatarSkinTone, type AvatarHairStyle } from "./AvatarDisplay";

interface AvatarCustomizerProps {
  config: AvatarConfig;
  onChange: (config: AvatarConfig) => void;
  equippedItems: string[];
}

const SKIN_OPTIONS: { id: AvatarSkinTone; color: string; label: string }[] = [
  { id: "light", color: "#FDDCB1", label: "Clara" },
  { id: "medium", color: "#E8B87A", label: "Media" },
  { id: "tan", color: "#C68642", label: "Morena" },
  { id: "dark", color: "#8D5524", label: "Oscura" },
];

const HAIR_OPTIONS: { id: AvatarHairStyle; label: string; icon: string }[] = [
  { id: "short", label: "Corto", icon: "💇" },
  { id: "curly", label: "Rizado", icon: "🌀" },
  { id: "long", label: "Largo", icon: "💇‍♀️" },
  { id: "braids", label: "Trenzas", icon: "🎀" },
  { id: "ponytail", label: "Coleta", icon: "🎗️" },
  { id: "mohawk", label: "Cresta", icon: "⬆️" },
];

const AvatarCustomizer = ({ config, onChange, equippedItems }: AvatarCustomizerProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Preview */}
      <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-4 shadow-md">
        <AvatarDisplay equippedItems={equippedItems} size="lg" config={config} />
      </div>

      {/* Gender */}
      <div className="w-full">
        <p className="text-xs font-black text-foreground/70 mb-2 text-center">👤 Personaje</p>
        <div className="flex gap-2 justify-center">
          {([["boy", "🧒 Niño"], ["girl", "👧 Niña"]] as [AvatarGender, string][]).map(([g, label]) => (
            <button
              key={g}
              onClick={() => onChange({ ...config, gender: g })}
              className={`rounded-2xl px-5 py-2.5 text-sm font-black transition-all ${
                config.gender === g
                  ? "bg-primary text-primary-foreground scale-105 shadow-md"
                  : "bg-card text-foreground border-2 border-border"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Skin tone */}
      <div className="w-full">
        <p className="text-xs font-black text-foreground/70 mb-2 text-center">🎨 Tono de piel</p>
        <div className="flex gap-3 justify-center">
          {SKIN_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onChange({ ...config, skinTone: opt.id })}
              className={`w-11 h-11 rounded-full transition-all ${
                config.skinTone === opt.id
                  ? "ring-3 ring-primary scale-110 shadow-lg"
                  : "ring-2 ring-border"
              }`}
              style={{ backgroundColor: opt.color }}
              title={opt.label}
            />
          ))}
        </div>
      </div>

      {/* Hair style */}
      <div className="w-full">
        <p className="text-xs font-black text-foreground/70 mb-2 text-center">💇 Peinado</p>
        <div className="grid grid-cols-3 gap-2">
          {HAIR_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onChange({ ...config, hairStyle: opt.id })}
              className={`rounded-2xl py-2 text-xs font-bold transition-all ${
                config.hairStyle === opt.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-foreground border-2 border-border"
              }`}
            >
              {opt.icon} {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvatarCustomizer;
