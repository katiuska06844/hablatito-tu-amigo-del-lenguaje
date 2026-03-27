interface AvatarDisplayProps {
  equippedItems: string[];
  size?: "sm" | "md" | "lg";
}

// Full-body cartoon child avatar as SVG with layered accessories
const AvatarDisplay = ({ equippedItems, size = "md" }: AvatarDisplayProps) => {
  const dims = size === "sm" ? { w: 80, h: 100 } : size === "md" ? { w: 130, h: 165 } : { w: 180, h: 225 };

  const hat = equippedItems.find(i => SHOP_ITEMS_MAP[i]?.slot === "hat");
  const outfit = equippedItems.find(i => SHOP_ITEMS_MAP[i]?.slot === "outfit");
  const accessory = equippedItems.find(i => SHOP_ITEMS_MAP[i]?.slot === "accessory");

  const hatItem = hat ? SHOP_ITEMS_MAP[hat] : null;
  const outfitItem = outfit ? SHOP_ITEMS_MAP[outfit] : null;
  const accItem = accessory ? SHOP_ITEMS_MAP[accessory] : null;

  return (
    <div style={{ width: dims.w, height: dims.h }} className="relative">
      <svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Legs */}
        <rect x="40" y="120" width="14" height="28" rx="7" fill="#F4C89A" />
        <rect x="66" y="120" width="14" height="28" rx="7" fill="#F4C89A" />
        {/* Shoes */}
        <ellipse cx="47" cy="150" rx="12" ry="6" fill="#E74C3C" />
        <ellipse cx="73" cy="150" rx="12" ry="6" fill="#E74C3C" />

        {/* Body / torso */}
        {outfitItem ? (
          <g>
            {outfitItem.id === "poncho" && (
              <>
                <path d="M35,70 L60,60 L85,70 L90,120 L30,120 Z" fill="#E67E22" />
                <path d="M45,80 L75,80 L72,100 L48,100 Z" fill="#D35400" opacity="0.5" />
                <line x1="60" y1="65" x2="60" y2="115" stroke="#C0392B" strokeWidth="2" />
              </>
            )}
            {outfitItem.id === "capa" && (
              <>
                <path d="M30,68 L60,55 L90,68 L95,125 L25,125 Z" fill="#8E44AD" />
                <path d="M55,60 L65,60 L63,80 L57,80 Z" fill="#FFD700" />
              </>
            )}
            {outfitItem.id === "chaleco" && (
              <>
                <rect x="38" y="68" width="44" height="50" rx="8" fill="#F39C12" />
                <rect x="48" y="72" width="24" height="12" rx="3" fill="#E74C3C" />
                <line x1="60" y1="68" x2="60" y2="118" stroke="#D35400" strokeWidth="1.5" />
              </>
            )}
          </g>
        ) : (
          /* Default shirt */
          <rect x="38" y="68" width="44" height="50" rx="10" fill="#3498DB" />
        )}

        {/* Arms */}
        <rect x="24" y="72" width="14" height="35" rx="7" fill="#F4C89A" />
        <rect x="82" y="72" width="14" height="35" rx="7" fill="#F4C89A" />
        {/* Hands */}
        <circle cx="31" cy="110" r="7" fill="#F4C89A" />
        <circle cx="89" cy="110" r="7" fill="#F4C89A" />

        {/* Head */}
        <circle cx="60" cy="40" r="28" fill="#FDDCB1" />
        {/* Hair */}
        <path d="M32,35 Q35,12 60,10 Q85,12 88,35 Q85,22 60,20 Q35,22 32,35" fill="#4A2F1B" />
        {/* Eyes */}
        <circle cx="50" cy="38" r="4" fill="#2C3E50" />
        <circle cx="70" cy="38" r="4" fill="#2C3E50" />
        <circle cx="51.5" cy="37" r="1.5" fill="white" />
        <circle cx="71.5" cy="37" r="1.5" fill="white" />
        {/* Blush */}
        <ellipse cx="43" cy="46" rx="5" ry="3" fill="#FFAAAA" opacity="0.5" />
        <ellipse cx="77" cy="46" rx="5" ry="3" fill="#FFAAAA" opacity="0.5" />
        {/* Smile */}
        <path d="M50,48 Q60,56 70,48" stroke="#C0392B" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Hat layer */}
        {hatItem && (
          <g>
            {hatItem.id === "chullo" && (
              <>
                <path d="M32,28 Q40,2 60,0 Q80,2 88,28 Z" fill="#E74C3C" />
                <rect x="32" y="25" width="56" height="8" rx="3" fill="#F39C12" />
                <rect x="32" y="30" width="56" height="4" rx="2" fill="#2ECC71" />
                <line x1="60" y1="0" x2="60" y2="-8" stroke="#E74C3C" strokeWidth="2" />
                <circle cx="60" cy="-10" r="4" fill="#F39C12" />
                {/* Ear flaps */}
                <path d="M32,28 L24,50 L36,45 Z" fill="#E74C3C" />
                <path d="M88,28 L96,50 L84,45 Z" fill="#E74C3C" />
              </>
            )}
            {hatItem.id === "sombrero" && (
              <>
                <ellipse cx="60" cy="18" rx="38" ry="6" fill="#D4A853" />
                <path d="M40,18 Q42,0 60,-2 Q78,0 80,18 Z" fill="#C89B3C" />
                <rect x="42" y="14" width="36" height="4" rx="2" fill="#8B6914" />
              </>
            )}
            {hatItem.id === "corona" && (
              <>
                <path d="M38,22 L42,4 L50,16 L60,0 L70,16 L78,4 L82,22 Z" fill="#FFD700" />
                <circle cx="50" cy="12" r="2" fill="#E74C3C" />
                <circle cx="60" cy="6" r="2.5" fill="#3498DB" />
                <circle cx="70" cy="12" r="2" fill="#2ECC71" />
              </>
            )}
            {hatItem.id === "gorra" && (
              <>
                <path d="M35,28 Q38,10 60,8 Q82,10 85,28 Z" fill="#E74C3C" />
                <ellipse cx="72" cy="27" rx="22" ry="5" fill="#C0392B" />
              </>
            )}
          </g>
        )}

        {/* Accessory layer */}
        {accItem && (
          <g>
            {accItem.id === "mochila" && (
              <rect x="82" y="72" width="18" height="24" rx="5" fill="#E67E22" stroke="#D35400" strokeWidth="1.5" />
            )}
            {accItem.id === "estrella" && (
              <>
                <line x1="96" y1="105" x2="96" y2="70" stroke="#8B6914" strokeWidth="3" strokeLinecap="round" />
                <polygon points="96,60 99,67 107,68 101,73 103,81 96,76 89,81 91,73 85,68 93,67" fill="#FFD700" />
              </>
            )}
            {accItem.id === "globo" && (
              <>
                <line x1="18" y1="105" x2="18" y2="40" stroke="#888" strokeWidth="1" />
                <ellipse cx="18" cy="30" rx="12" ry="15" fill="#E74C3C" opacity="0.85" />
                <ellipse cx="15" cy="25" rx="3" ry="5" fill="white" opacity="0.3" />
              </>
            )}
            {accItem.id === "bandera" && (
              <>
                <line x1="96" y1="108" x2="96" y2="65" stroke="#666" strokeWidth="2" />
                <rect x="96" y="65" width="18" height="12" fill="white" />
                <rect x="96" y="65" width="6" height="12" fill="#D91023" />
                <rect x="108" y="65" width="6" height="12" fill="#D91023" />
              </>
            )}
            {accItem.id === "mascota" && (
              <>
                {/* Mini llama next to character */}
                <g transform="translate(95, 115) scale(0.6)">
                  <ellipse cx="15" cy="18" rx="12" ry="10" fill="white" />
                  <circle cx="15" cy="5" r="8" fill="white" />
                  <circle cx="12" cy="3" r="1.5" fill="#2C3E50" />
                  <circle cx="18" cy="3" r="1.5" fill="#2C3E50" />
                  <rect x="5" y="25" width="4" height="14" rx="2" fill="white" />
                  <rect x="21" y="25" width="4" height="14" rx="2" fill="white" />
                  <ellipse cx="10" cy="-3" rx="2" ry="5" fill="white" />
                  <ellipse cx="20" cy="-3" rx="2" ry="5" fill="white" />
                </g>
              </>
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
