export type AvatarGender = "boy" | "girl";
export type AvatarSkinTone = "light" | "medium" | "tan" | "dark";
export type AvatarHairStyle = "short" | "curly" | "long" | "braids" | "ponytail" | "mohawk";

export interface AvatarConfig {
  gender: AvatarGender;
  skinTone: AvatarSkinTone;
  hairStyle: AvatarHairStyle;
}

interface AvatarDisplayProps {
  equippedItems: string[];
  size?: "sm" | "md" | "lg";
  config?: AvatarConfig;
}

const SKIN_COLORS: Record<AvatarSkinTone, { base: string; shadow: string }> = {
  light: { base: "#FDDCB1", shadow: "#F0C899" },
  medium: { base: "#E8B87A", shadow: "#D4A060" },
  tan: { base: "#C68642", shadow: "#A86E35" },
  dark: { base: "#8D5524", shadow: "#764421" },
};

const HAIR_COLORS: Record<AvatarSkinTone, string> = {
  light: "#4A2F1B",
  medium: "#2C1810",
  tan: "#1A0F08",
  dark: "#0D0705",
};

const DEFAULT_CONFIG: AvatarConfig = { gender: "boy", skinTone: "medium", hairStyle: "short" };

const AvatarDisplay = ({ equippedItems, size = "md", config = DEFAULT_CONFIG }: AvatarDisplayProps) => {
  const dims = size === "sm" ? { w: 80, h: 100 } : size === "md" ? { w: 130, h: 165 } : { w: 180, h: 225 };

  const hat = equippedItems.find(i => SHOP_ITEMS_MAP[i]?.slot === "hat");
  const outfit = equippedItems.find(i => SHOP_ITEMS_MAP[i]?.slot === "outfit");
  const accessory = equippedItems.find(i => SHOP_ITEMS_MAP[i]?.slot === "accessory");

  const hatItem = hat ? SHOP_ITEMS_MAP[hat] : null;
  const outfitItem = outfit ? SHOP_ITEMS_MAP[outfit] : null;
  const accItem = accessory ? SHOP_ITEMS_MAP[accessory] : null;

  const skin = SKIN_COLORS[config.skinTone];
  const hairColor = HAIR_COLORS[config.skinTone];

  const renderHair = () => {
    switch (config.hairStyle) {
      case "short":
        return <path d="M32,35 Q35,12 60,10 Q85,12 88,35 Q85,22 60,20 Q35,22 32,35" fill={hairColor} />;
      case "curly":
        return (
          <g>
            <path d="M30,38 Q28,10 60,7 Q92,10 90,38 Q88,20 60,17 Q32,20 30,38" fill={hairColor} />
            {[35, 45, 55, 65, 75, 85].map((x, i) => (
              <circle key={i} cx={x} cy={12 + (i % 2) * 4} r={6} fill={hairColor} />
            ))}
          </g>
        );
      case "long":
        return (
          <g>
            <path d="M30,35 Q32,10 60,8 Q88,10 90,35" fill={hairColor} />
            <path d="M30,35 L26,75 Q28,80 35,72 L35,40 Z" fill={hairColor} />
            <path d="M90,35 L94,75 Q92,80 85,72 L85,40 Z" fill={hairColor} />
          </g>
        );
      case "braids":
        return (
          <g>
            <path d="M32,35 Q35,12 60,10 Q85,12 88,35 Q85,22 60,20 Q35,22 32,35" fill={hairColor} />
            {/* Left braid */}
            <path d="M34,35 L28,55 L32,60 L26,75 L30,80 L24,95" stroke={hairColor} strokeWidth="6" fill="none" strokeLinecap="round" />
            <circle cx="24" cy="97" r="4" fill="#E74C3C" />
            {/* Right braid */}
            <path d="M86,35 L92,55 L88,60 L94,75 L90,80 L96,95" stroke={hairColor} strokeWidth="6" fill="none" strokeLinecap="round" />
            <circle cx="96" cy="97" r="4" fill="#E74C3C" />
          </g>
        );
      case "ponytail":
        return (
          <g>
            <path d="M32,35 Q35,12 60,10 Q85,12 88,35 Q85,22 60,20 Q35,22 32,35" fill={hairColor} />
            <path d="M60,10 Q70,5 75,10 Q80,20 78,50 Q76,65 72,80" stroke={hairColor} strokeWidth="8" fill="none" strokeLinecap="round" />
            <circle cx="72" cy="82" r="4" fill="#FFD54F" />
          </g>
        );
      case "mohawk":
        return (
          <g>
            <path d="M38,32 Q40,20 60,18 Q80,20 82,32 Q80,25 60,23 Q40,25 38,32" fill={hairColor} />
            {[48, 54, 60, 66, 72].map((x, i) => (
              <ellipse key={i} cx={x} cy={8 + i * 1} rx={3} ry={10} fill={hairColor} />
            ))}
          </g>
        );
      default:
        return <path d="M32,35 Q35,12 60,10 Q85,12 88,35 Q85,22 60,20 Q35,22 32,35" fill={hairColor} />;
    }
  };

  const renderGenderDetails = () => {
    if (config.gender === "girl") {
      return (
        <g>
          {/* Eyelashes */}
          <line x1="44" y1="34" x2="42" y2="31" stroke={hairColor} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="47" y1="33" x2="46" y2="30" stroke={hairColor} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="73" y1="33" x2="74" y2="30" stroke={hairColor} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="76" y1="34" x2="78" y2="31" stroke={hairColor} strokeWidth="1.5" strokeLinecap="round" />
        </g>
      );
    }
    return null;
  };

  return (
    <div style={{ width: dims.w, height: dims.h }} className="relative">
      <svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Legs */}
        <rect x="40" y="120" width="14" height="28" rx="7" fill={skin.base} />
        <rect x="66" y="120" width="14" height="28" rx="7" fill={skin.base} />
        {/* Shoes */}
        <ellipse cx="47" cy="150" rx="12" ry="6" fill="#E74C3C" />
        <ellipse cx="73" cy="150" rx="12" ry="6" fill="#E74C3C" />
        {/* Shoe highlights */}
        <ellipse cx="47" cy="148" rx="6" ry="2" fill="#FF6B6B" opacity="0.5" />
        <ellipse cx="73" cy="148" rx="6" ry="2" fill="#FF6B6B" opacity="0.5" />

        {/* Body / torso */}
        {outfitItem ? (
          <g>
            {outfitItem.id === "poncho" && (
              <>
                <path d="M30,70 L60,58 L90,70 L93,122 L27,122 Z" fill="#E67E22" />
                <path d="M42,78 L78,78 L75,105 L45,105 Z" fill="#D35400" opacity="0.4" />
                <line x1="60" y1="62" x2="60" y2="118" stroke="#C0392B" strokeWidth="2" />
                {/* Andean pattern */}
                <path d="M35,85 L45,80 L55,85 L65,80 L75,85 L85,80" stroke="#FFF" strokeWidth="1.5" fill="none" opacity="0.5" />
                <path d="M35,95 L45,90 L55,95 L65,90 L75,95 L85,90" stroke="#FFF" strokeWidth="1.5" fill="none" opacity="0.5" />
              </>
            )}
            {outfitItem.id === "capa" && (
              <>
                <path d="M25,68 L60,52 L95,68 L98,128 L22,128 Z" fill="#8E44AD" />
                <path d="M55,57 L65,57 L63,78 L57,78 Z" fill="#FFD700" />
                <circle cx="60" cy="63" r="3" fill="#FFD700" />
                {/* Cape shimmer */}
                <path d="M30,80 Q60,75 90,80" stroke="#AB7DF6" strokeWidth="1" fill="none" opacity="0.6" />
              </>
            )}
            {outfitItem.id === "chaleco" && (
              <>
                <rect x="38" y="68" width="44" height="50" rx="8" fill="#F39C12" />
                <rect x="48" y="72" width="24" height="12" rx="3" fill="#E74C3C" />
                <line x1="60" y1="68" x2="60" y2="118" stroke="#D35400" strokeWidth="1.5" />
                {/* Buttons */}
                <circle cx="60" cy="90" r="2.5" fill="#D35400" />
                <circle cx="60" cy="100" r="2.5" fill="#D35400" />
                <circle cx="60" cy="110" r="2.5" fill="#D35400" />
              </>
            )}
          </g>
        ) : (
          <g>
            {/* Default shirt */}
            <rect x="38" y="68" width="44" height="50" rx="10" fill="#3498DB" />
            <rect x="38" y="68" width="44" height="50" rx="10" fill="url(#shirtShine)" opacity="0.3" />
            {/* Collar */}
            <path d="M52,68 L60,75 L68,68" stroke="#2980B9" strokeWidth="2" fill="none" />
          </g>
        )}

        {/* Arms */}
        <rect x="24" y="72" width="14" height="35" rx="7" fill={skin.base} />
        <rect x="82" y="72" width="14" height="35" rx="7" fill={skin.base} />
        {/* Hands */}
        <circle cx="31" cy="110" r="7" fill={skin.base} />
        <circle cx="89" cy="110" r="7" fill={skin.base} />
        {/* Hand highlights */}
        <circle cx="29" cy="108" r="2" fill={skin.shadow} opacity="0.3" />
        <circle cx="87" cy="108" r="2" fill={skin.shadow} opacity="0.3" />

        {/* Head */}
        <circle cx="60" cy="40" r="28" fill={skin.base} />
        {/* Ear */}
        <ellipse cx="32" cy="42" rx="5" ry="7" fill={skin.base} />
        <ellipse cx="32" cy="42" rx="3" ry="5" fill={skin.shadow} opacity="0.3" />
        <ellipse cx="88" cy="42" rx="5" ry="7" fill={skin.base} />
        <ellipse cx="88" cy="42" rx="3" ry="5" fill={skin.shadow} opacity="0.3" />

        {/* Hair */}
        {renderHair()}

        {/* Eyes */}
        <ellipse cx="50" cy="39" rx="5" ry="5.5" fill="white" />
        <ellipse cx="70" cy="39" rx="5" ry="5.5" fill="white" />
        <circle cx="51" cy="39" r="3.5" fill="#2C3E50" />
        <circle cx="71" cy="39" r="3.5" fill="#2C3E50" />
        <circle cx="52" cy="37.5" r="1.5" fill="white" />
        <circle cx="72" cy="37.5" r="1.5" fill="white" />

        {/* Gender details (eyelashes for girls) */}
        {renderGenderDetails()}

        {/* Blush */}
        <ellipse cx="42" cy="47" rx="6" ry="3.5" fill="#FFAAAA" opacity="0.45" />
        <ellipse cx="78" cy="47" rx="6" ry="3.5" fill="#FFAAAA" opacity="0.45" />
        {/* Smile */}
        <path d="M50,49 Q60,58 70,49" stroke="#C0392B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Nose */}
        <ellipse cx="60" cy="44" rx="2" ry="1.5" fill={skin.shadow} opacity="0.4" />

        {/* Hat layer */}
        {hatItem && (
          <g>
            {hatItem.id === "chullo" && (
              <>
                <path d="M30,28 Q38,0 60,-2 Q82,0 90,28 Z" fill="#E74C3C" />
                <rect x="30" y="24" width="60" height="9" rx="3" fill="#F39C12" />
                <rect x="30" y="30" width="60" height="5" rx="2" fill="#2ECC71" />
                {/* Pattern on chullo */}
                <path d="M34,27 L42,24 L50,27 L58,24 L66,27 L74,24 L82,27 L86,24" stroke="white" strokeWidth="1.5" fill="none" opacity="0.6" />
                <line x1="60" y1="-2" x2="60" y2="-12" stroke="#E74C3C" strokeWidth="2.5" />
                <circle cx="60" cy="-14" r="5" fill="#F39C12" />
                {/* Ear flaps with tassels */}
                <path d="M30,28 L20,52 L34,46 Z" fill="#E74C3C" />
                <path d="M90,28 L100,52 L86,46 Z" fill="#E74C3C" />
                <line x1="20" y1="52" x2="20" y2="62" stroke="#F39C12" strokeWidth="2" />
                <line x1="100" y1="52" x2="100" y2="62" stroke="#F39C12" strokeWidth="2" />
              </>
            )}
            {hatItem.id === "sombrero" && (
              <>
                <ellipse cx="60" cy="18" rx="42" ry="7" fill="#D4A853" />
                <path d="M38,18 Q40,-2 60,-5 Q80,-2 82,18 Z" fill="#C89B3C" />
                <rect x="40" y="13" width="40" height="5" rx="2" fill="#8B6914" />
              </>
            )}
            {hatItem.id === "corona" && (
              <>
                <path d="M36,22 L40,0 L48,16 L60,-4 L72,16 L80,0 L84,22 Z" fill="#FFD700" />
                <path d="M36,22 L84,22" stroke="#DAA520" strokeWidth="3" />
                <circle cx="48" cy="12" r="3" fill="#E74C3C" />
                <circle cx="60" cy="4" r="3.5" fill="#3498DB" />
                <circle cx="72" cy="12" r="3" fill="#2ECC71" />
              </>
            )}
            {hatItem.id === "gorra" && (
              <>
                <path d="M33,28 Q36,8 60,6 Q84,8 87,28 Z" fill="#E74C3C" />
                <ellipse cx="74" cy="27" rx="24" ry="6" fill="#C0392B" />
                <circle cx="60" cy="10" r="3" fill="#C0392B" />
              </>
            )}
          </g>
        )}

        {/* Accessory layer */}
        {accItem && (
          <g>
            {accItem.id === "mochila" && (
              <>
                <rect x="84" y="70" width="20" height="28" rx="6" fill="#E67E22" stroke="#D35400" strokeWidth="1.5" />
                <rect x="88" y="76" width="12" height="6" rx="2" fill="#D35400" />
                <line x1="94" y1="82" x2="94" y2="94" stroke="#D35400" strokeWidth="1" />
                <circle cx="94" cy="95" r="2" fill="#D35400" />
              </>
            )}
            {accItem.id === "estrella" && (
              <>
                <line x1="96" y1="108" x2="96" y2="65" stroke="#8B6914" strokeWidth="3" strokeLinecap="round" />
                <polygon points="96,55 100,63 108,64 102,70 104,78 96,73 88,78 90,70 84,64 92,63" fill="#FFD700" />
                <circle cx="96" cy="68" r="2" fill="#FFF9C4" opacity="0.7" />
              </>
            )}
            {accItem.id === "globo" && (
              <>
                <path d="M18,108 Q14,80 18,45" stroke="#888" strokeWidth="1" fill="none" />
                <ellipse cx="18" cy="32" rx="14" ry="17" fill="#E74C3C" opacity="0.85" />
                <ellipse cx="14" cy="26" rx="4" ry="6" fill="white" opacity="0.3" />
                <path d="M14,48 L18,49 L22,48" stroke="#E74C3C" strokeWidth="1" fill="none" />
              </>
            )}
            {accItem.id === "bandera" && (
              <>
                <line x1="98" y1="110" x2="98" y2="62" stroke="#666" strokeWidth="2.5" strokeLinecap="round" />
                <rect x="98" y="62" width="20" height="14" fill="white" />
                <rect x="98" y="62" width="7" height="14" fill="#D91023" />
                <rect x="111" y="62" width="7" height="14" fill="#D91023" />
              </>
            )}
            {accItem.id === "mascota" && (
              <g transform="translate(93, 112) scale(0.65)">
                <ellipse cx="15" cy="20" rx="13" ry="11" fill="white" stroke="#DDD" strokeWidth="0.5" />
                <circle cx="15" cy="6" r="9" fill="white" stroke="#DDD" strokeWidth="0.5" />
                <circle cx="11" cy="4" r="2" fill="#2C3E50" />
                <circle cx="19" cy="4" r="2" fill="#2C3E50" />
                <circle cx="12" cy="3.5" r="0.8" fill="white" />
                <circle cx="20" cy="3.5" r="0.8" fill="white" />
                <path d="M13,8 Q15,10 17,8" stroke="#C0392B" strokeWidth="1" fill="none" />
                <rect x="5" y="28" width="5" height="14" rx="2.5" fill="white" />
                <rect x="20" y="28" width="5" height="14" rx="2.5" fill="white" />
                <ellipse cx="8" cy="0" rx="3" ry="7" fill="white" />
                <ellipse cx="22" cy="0" rx="3" ry="7" fill="white" />
                <ellipse cx="8" cy="1" rx="1.5" ry="4" fill="#FFB6C1" opacity="0.4" />
                <ellipse cx="22" cy="1" rx="1.5" ry="4" fill="#FFB6C1" opacity="0.4" />
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};

// Shared item definitions
export interface ShopItem {
  id: string;
  name: string;
  emoji: string;
  price: number;
  slot: "hat" | "outfit" | "accessory";
}

export const SHOP_ITEMS: ShopItem[] = [
  { id: "chullo", name: "Chullo Andino", emoji: "🧶", price: 30, slot: "hat" },
  { id: "sombrero", name: "Sombrero", emoji: "👒", price: 50, slot: "hat" },
  { id: "corona", name: "Corona", emoji: "👑", price: 100, slot: "hat" },
  { id: "gorra", name: "Gorra", emoji: "🧢", price: 40, slot: "hat" },
  { id: "poncho", name: "Poncho", emoji: "🧥", price: 60, slot: "outfit" },
  { id: "capa", name: "Capa Mágica", emoji: "🦸", price: 80, slot: "outfit" },
  { id: "chaleco", name: "Chaleco", emoji: "🦺", price: 45, slot: "outfit" },
  { id: "mochila", name: "Mochila", emoji: "🎒", price: 35, slot: "accessory" },
  { id: "estrella", name: "Varita", emoji: "✨", price: 70, slot: "accessory" },
  { id: "globo", name: "Globo", emoji: "🎈", price: 20, slot: "accessory" },
  { id: "bandera", name: "Bandera Perú", emoji: "🇵🇪", price: 25, slot: "accessory" },
  { id: "mascota", name: "Mascota Llama", emoji: "🦙", price: 90, slot: "accessory" },
];

export const SHOP_ITEMS_MAP: Record<string, ShopItem> = {};
SHOP_ITEMS.forEach(item => { SHOP_ITEMS_MAP[item.id] = item; });

export default AvatarDisplay;
