import { useState, useEffect } from "react";
import AvatarDisplay, { SHOP_ITEMS, SHOP_ITEMS_MAP, type ShopItem } from "@/components/AvatarDisplay";

interface ShopProps {
  onBack: () => void;
  points: number;
  onSpendPoints: (amount: number) => void;
}

interface ShopData {
  inventory: string[];
  equipped: string[];
}

const getShopData = (): ShopData => {
  const phone = localStorage.getItem("hablatito_current");
  if (!phone) return { inventory: [], equipped: [] };
  const stored = localStorage.getItem(`hablatito_shop_${phone}`);
  return stored ? JSON.parse(stored) : { inventory: [], equipped: [] };
};

const saveShopData = (data: ShopData) => {
  const phone = localStorage.getItem("hablatito_current");
  if (phone) localStorage.setItem(`hablatito_shop_${phone}`, JSON.stringify(data));
};

const Shop = ({ onBack, points, onSpendPoints }: ShopProps) => {
  const [shopData, setShopData] = useState<ShopData>(getShopData);
  const [tab, setTab] = useState<"shop" | "inventory">("shop");
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState<"all" | "hat" | "outfit" | "accessory">("all");

  const handleBuy = (item: ShopItem) => {
    if (shopData.inventory.includes(item.id)) {
      setMessage("Ya lo tienes");
      return;
    }
    if (points < item.price) {
      setMessage(`Necesitas ${item.price - points} puntos más`);
      setTimeout(() => setMessage(""), 2000);
      return;
    }
    onSpendPoints(item.price);
    const updated = {
      ...shopData,
      inventory: [...shopData.inventory, item.id],
    };
    setShopData(updated);
    saveShopData(updated);
    setMessage(`¡Compraste ${item.name}!`);
    setTimeout(() => setMessage(""), 2000);
  };

  const handleEquip = (itemId: string) => {
    const item = SHOP_ITEMS_MAP[itemId];
    if (!item) return;
    // Replace same slot
    const newEquipped = shopData.equipped.filter(id => SHOP_ITEMS_MAP[id]?.slot !== item.slot);
    newEquipped.push(itemId);
    const updated = { ...shopData, equipped: newEquipped };
    setShopData(updated);
    saveShopData(updated);
  };

  const handleUnequip = (itemId: string) => {
    const updated = { ...shopData, equipped: shopData.equipped.filter(id => id !== itemId) };
    setShopData(updated);
    saveShopData(updated);
  };

  const filtered = filter === "all" ? SHOP_ITEMS : SHOP_ITEMS.filter(i => i.slot === filter);

  return (
    <div className="app-shell andean-bg flex flex-col min-h-dvh px-5 py-6">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="text-2xl p-2">←</button>
        <h2 className="text-xl font-black text-foreground">🛍️ Tienda</h2>
        <div className="bg-accent/30 rounded-2xl px-3 py-1.5">
          <span className="text-sm font-bold">⭐ {points}</span>
        </div>
      </div>

      {/* Avatar preview */}
      <div className="flex justify-center mb-4">
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-4 shadow-sm">
          <AvatarDisplay equippedItems={shopData.equipped} size="md" />
          <p className="text-xs text-muted-foreground font-bold text-center mt-2">Tu avatar</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab("shop")}
          className={`flex-1 rounded-2xl py-2.5 text-sm font-black transition-all ${
            tab === "shop" ? "bg-primary text-primary-foreground" : "bg-card text-foreground"
          }`}
        >
          🛒 Tienda
        </button>
        <button
          onClick={() => setTab("inventory")}
          className={`flex-1 rounded-2xl py-2.5 text-sm font-black transition-all ${
            tab === "inventory" ? "bg-primary text-primary-foreground" : "bg-card text-foreground"
          }`}
        >
          🎒 Inventario ({shopData.inventory.length})
        </button>
      </div>

      {message && (
        <div className="bg-accent/20 rounded-2xl p-3 text-center mb-3 animate-bounce-in">
          <span className="text-sm font-bold text-foreground">{message}</span>
        </div>
      )}

      {tab === "shop" && (
        <>
          {/* Filter */}
          <div className="flex gap-1.5 mb-3 overflow-x-auto">
            {([["all", "Todo"], ["hat", "🎩"], ["outfit", "👕"], ["accessory", "🎒"]] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`rounded-2xl px-3 py-1.5 text-xs font-bold whitespace-nowrap ${
                  filter === key ? "bg-secondary text-secondary-foreground" : "bg-card text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto pb-4">
            {filtered.map(item => {
              const owned = shopData.inventory.includes(item.id);
              return (
                <div key={item.id} className="bg-card/90 rounded-2xl p-3 text-center shadow-sm">
                  <span className="text-4xl block mb-1">{item.emoji}</span>
                  <p className="text-xs font-black text-foreground">{item.name}</p>
                  <p className="text-[10px] text-muted-foreground font-semibold capitalize">{item.slot}</p>
                  {owned ? (
                    <span className="text-[10px] font-bold text-primary bg-primary/10 rounded-full px-2 py-0.5 mt-1 inline-block">
                      ✅ Comprado
                    </span>
                  ) : (
                    <button
                      onClick={() => handleBuy(item)}
                      className={`mt-1 rounded-2xl px-3 py-1.5 text-xs font-bold transition-all ${
                        points >= item.price
                          ? "bg-primary text-primary-foreground active:scale-95"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      ⭐ {item.price}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {tab === "inventory" && (
        <div className="flex-1 overflow-y-auto pb-4">
          {shopData.inventory.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-5xl block mb-3">🛍️</span>
              <p className="text-sm font-bold text-muted-foreground">Tu inventario está vacío</p>
              <p className="text-xs text-muted-foreground">¡Compra artículos en la tienda!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {shopData.inventory.map(id => {
                const item = SHOP_ITEMS_MAP[id];
                if (!item) return null;
                const isEquipped = shopData.equipped.includes(id);
                return (
                  <div key={id} className={`rounded-2xl p-3 text-center shadow-sm ${isEquipped ? "bg-primary/15 ring-2 ring-primary" : "bg-card/90"}`}>
                    <span className="text-4xl block mb-1">{item.emoji}</span>
                    <p className="text-xs font-black text-foreground">{item.name}</p>
                    <button
                      onClick={() => isEquipped ? handleUnequip(id) : handleEquip(id)}
                      className={`mt-1 rounded-2xl px-3 py-1.5 text-xs font-bold transition-all active:scale-95 ${
                        isEquipped
                          ? "bg-destructive/80 text-destructive-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {isEquipped ? "Quitar" : "Equipar"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Shop;
