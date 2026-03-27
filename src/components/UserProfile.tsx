import { useState, useEffect } from "react";
import AvatarDisplay, { type AvatarConfig } from "@/components/AvatarDisplay";
import AvatarCustomizer from "@/components/AvatarCustomizer";
import AndeanBackground from "@/components/AndeanBackground";

interface UserProfileProps {
  onBack: () => void;
  onLogout: () => void;
}

interface UserData {
  parentName: string;
  phone: string;
  childName: string;
  childAge: string;
  pin: string;
  avatarConfig?: AvatarConfig;
}

const getShopData = () => {
  const phone = localStorage.getItem("hablatito_current");
  if (!phone) return { inventory: [], equipped: [] };
  const stored = localStorage.getItem(`hablatito_shop_${phone}`);
  return stored ? JSON.parse(stored) : { inventory: [], equipped: [] };
};

const UserProfile = ({ onBack, onLogout }: UserProfileProps) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [editing, setEditing] = useState(false);
  const [customizingAvatar, setCustomizingAvatar] = useState(false);
  const [parentName, setParentName] = useState("");
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("3");
  const [phone, setPhone] = useState("");
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>({ gender: "boy", skinTone: "medium", hairStyle: "short" });
  const [saved, setSaved] = useState(false);
  const [shopData] = useState(getShopData);

  useEffect(() => {
    const currentPhone = localStorage.getItem("hablatito_current");
    if (currentPhone) {
      const stored = localStorage.getItem(`hablatito_user_${currentPhone}`);
      if (stored) {
        const data: UserData = JSON.parse(stored);
        setUserData(data);
        setParentName(data.parentName);
        setChildName(data.childName);
        setChildAge(data.childAge);
        setPhone(data.phone);
        if (data.avatarConfig) setAvatarConfig(data.avatarConfig);
      }
    }
  }, []);

  const saveAvatarConfig = (config: AvatarConfig) => {
    setAvatarConfig(config);
    if (userData) {
      const updated = { ...userData, avatarConfig: config };
      localStorage.setItem(`hablatito_user_${userData.phone}`, JSON.stringify(updated));
      setUserData(updated);
    }
  };

  const handleSave = () => {
    if (!userData) return;
    const oldPhone = userData.phone;
    const updated: UserData = {
      ...userData,
      parentName,
      childName,
      childAge,
      phone,
      avatarConfig,
    };

    if (phone !== oldPhone) {
      localStorage.removeItem(`hablatito_user_${oldPhone}`);
      localStorage.setItem("hablatito_current", phone);
    }

    localStorage.setItem(`hablatito_user_${phone}`, JSON.stringify(updated));
    setUserData(updated);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!userData) return null;

  return (
    <div className="app-shell flex flex-col min-h-dvh relative px-5 py-6">
      <AndeanBackground />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="text-2xl p-2 bg-white/60 rounded-full">←</button>
          <h2 className="text-xl font-black text-foreground drop-shadow-sm">Perfil</h2>
          <div className="w-10" />
        </div>

        {/* Avatar as profile image */}
        <div className="flex flex-col items-center mb-5">
          <button
            onClick={() => setCustomizingAvatar(!customizingAvatar)}
            className="relative active:scale-95 transition-transform"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg">
              <AvatarDisplay equippedItems={shopData.equipped} size="md" config={avatarConfig} />
            </div>
            <span className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-md">
              ✏️
            </span>
          </button>
          <p className="text-xl font-black text-foreground mt-2 drop-shadow-sm">{userData.childName}</p>
          <p className="text-sm text-foreground/70 font-bold">{userData.childAge} años</p>
        </div>

        {/* Avatar customizer */}
        {customizingAvatar && (
          <div className="bg-white/85 backdrop-blur-md rounded-3xl p-4 shadow-lg mb-4 animate-fade-in">
            <p className="text-sm font-black text-foreground mb-3 text-center">Personaliza tu avatar</p>
            <AvatarCustomizer
              config={avatarConfig}
              onChange={saveAvatarConfig}
              equippedItems={shopData.equipped}
            />
            <button
              onClick={() => setCustomizingAvatar(false)}
              className="btn-child bg-primary text-primary-foreground w-full mt-4"
            >
              ✅ Listo
            </button>
          </div>
        )}

        {saved && (
          <div className="bg-secondary/20 rounded-2xl p-3 text-center mb-4 animate-fade-in">
            <span className="text-sm font-bold text-secondary">✅ Datos guardados</span>
          </div>
        )}

        {!editing && !customizingAvatar ? (
          <div className="flex flex-col gap-3">
            {[
              ["👤", "Padre/Madre", userData.parentName],
              ["😊", "Niño", userData.childName],
              ["🎂", "Edad", `${userData.childAge} años`],
              ["📱", "Celular", userData.phone],
            ].map(([icon, label, value]) => (
              <div key={label} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
                <p className="text-xs text-muted-foreground font-bold mb-1">{icon} {label}</p>
                <p className="text-base font-bold text-foreground">{value}</p>
              </div>
            ))}
            <button onClick={() => setEditing(true)} className="btn-child bg-primary text-primary-foreground mt-4">
              ✏️ Editar datos
            </button>
            <button onClick={onLogout} className="btn-child bg-destructive text-destructive-foreground mt-2">
              🚪 Cerrar sesión
            </button>
          </div>
        ) : editing ? (
          <div className="flex flex-col gap-3 bg-white/85 backdrop-blur-md rounded-3xl p-4 shadow-lg">
            <div>
              <label className="text-sm font-bold text-foreground block mb-1">👤 Nombre del padre</label>
              <input type="text" value={parentName} onChange={(e) => setParentName(e.target.value)}
                className="w-full rounded-2xl border-2 border-border bg-white px-4 py-3 text-base font-semibold focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-sm font-bold text-foreground block mb-1">😊 Nombre del niño</label>
              <input type="text" value={childName} onChange={(e) => setChildName(e.target.value)}
                className="w-full rounded-2xl border-2 border-border bg-white px-4 py-3 text-base font-semibold focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-sm font-bold text-foreground block mb-1">🎂 Edad</label>
              <div className="flex gap-2">
                {["3", "4", "5", "6"].map((age) => (
                  <button key={age} onClick={() => setChildAge(age)}
                    className={`flex-1 rounded-2xl py-3 text-lg font-black transition-all ${
                      childAge === age ? "bg-primary text-primary-foreground scale-105" : "bg-white border-2 border-border text-foreground"
                    }`}>
                    {age}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-bold text-foreground block mb-1">📱 Celular</label>
              <input type="tel" inputMode="numeric" value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 9))}
                className="w-full rounded-2xl border-2 border-border bg-white px-4 py-3 text-base font-semibold focus:outline-none focus:border-primary" />
            </div>
            <div className="flex gap-3 mt-3">
              <button onClick={() => setEditing(false)} className="btn-child bg-muted text-foreground flex-1">Cancelar</button>
              <button onClick={handleSave} className="btn-child bg-primary text-primary-foreground flex-1">Guardar</button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserProfile;
