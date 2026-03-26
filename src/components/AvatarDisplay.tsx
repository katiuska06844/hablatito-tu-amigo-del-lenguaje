interface AvatarDisplayProps {
  equippedItems: string[];
  size?: "sm" | "md" | "lg";
}

// Full-body avatar as a single integrated visual with layered accessories
const AvatarDisplay = ({ equippedItems, size = "md" }: AvatarDisplayProps) => {
  const sizeClass = size === "sm" ? "w-20 h-24" : size === "md" ? "w-32 h-40" : "w-44 h-56";
  const bodySize = size === "sm" ? "text-4xl" : size === "md" ? "text-7xl" : "text-8xl";
  const accSize = size === "sm" ? "text-lg" : size === "md" ? "text-2xl" : "text-3xl";

  // Determine what's equipped
  const hat = equippedItems.find(i => SHOP_ITEMS_MAP[i]?.slot === "hat");
  const outfit = equippedItems.find(i => SHOP_ITEMS_MAP[i]?.slot === "outfit");
  const accessory = equippedItems.find(i => SHOP_ITEMS_MAP[i]?.slot === "accessory");

  return (
    <div className={`${sizeClass} relative flex items-center justify-center`}>
      {/* Base body */}
      <span className={`${bodySize} relative z-10`}>🧒</span>

      {/* Hat layer - positioned on top */}
      {hat && (
        <span className={`absolute top-0 left-1/2 -translate-x-1/2 ${accSize} z-20`}>
          {SHOP_ITEMS_MAP[hat].emoji}
        </span>
      )}

      {/* Outfit layer - positioned at body */}
      {outfit && (
        <span className={`absolute bottom-2 left-1/2 -translate-x-1/2 ${accSize} z-20`}>
          {SHOP_ITEMS_MAP[outfit].emoji}
        </span>
      )}

      {/* Accessory layer - positioned at side */}
      {accessory && (
        <span className={`absolute right-0 top-1/2 -translate-y-1/2 ${accSize} z-20`}>
          {SHOP_ITEMS_MAP[accessory].emoji}
        </span>
      )}
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
