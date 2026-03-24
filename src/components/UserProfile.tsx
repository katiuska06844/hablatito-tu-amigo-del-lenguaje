import { useState, useEffect } from "react";

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
  avatar?: string;
}

const AVATARS = ["🧒", "👦", "👧", "🧒🏽", "👦🏽", "👧🏽", "🧒🏻", "👦🏻", "👧🏻", "🐶", "🐱", "🦊", "🐰", "🐻", "🐼"];

const UserProfile = ({ onBack, onLogout }: UserProfileProps) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [editing, setEditing] = useState(false);
  const [pickingAvatar, setPickingAvatar] = useState(false);
  const [parentName, setParentName] = useState("");
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("3");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("🧒");
  const [saved, setSaved] = useState(false);

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
        setAvatar(data.avatar || "🧒");
      }
    }
  }, []);

  const handleSave = () => {
    if (!userData) return;
    const oldPhone = userData.phone;
    const updated: UserData = {
      ...userData,
      parentName,
      childName,
      childAge,
      phone,
      avatar,
    };

    // If phone changed, update the key
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

  const handleAvatarSelect = (emoji: string) => {
    setAvatar(emoji);
    setPickingAvatar(false);
    // Save immediately if not in edit mode
    if (!editing && userData) {
      const updated = { ...userData, avatar: emoji };
      localStorage.setItem(`hablatito_user_${userData.phone}`, JSON.stringify(updated));
      setUserData(updated);
    }
  };

  if (!userData) return null;

  return (
    <div className="app-shell flex flex-col min-h-dvh bg-background px-5 py-6">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-2xl p-2">←</button>
        <h2 className="text-xl font-black text-foreground">Perfil</h2>
        <div />
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-6">
        <button
          onClick={() => setPickingAvatar(!pickingAvatar)}
          className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-5xl mb-1 active:scale-95 transition-transform relative"
        >
          {avatar}
          <span className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm">
            ✏️
          </span>
        </button>
        <p className="text-xl font-black text-foreground mt-2">{userData.childName}</p>
        <p className="text-sm text-muted-foreground font-semibold">{userData.childAge} años</p>
      </div>

      {/* Avatar picker */}
      {pickingAvatar && (
        <div className="bg-card rounded-2xl p-4 shadow-sm mb-4 animate-bounce-in">
          <p className="text-sm font-bold text-muted-foreground mb-3 text-center">Elige un avatar</p>
          <div className="grid grid-cols-5 gap-2 justify-items-center">
            {AVATARS.map((a) => (
              <button
                key={a}
                onClick={() => handleAvatarSelect(a)}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${
                  avatar === a
                    ? "bg-primary/30 scale-110 ring-2 ring-primary"
                    : "bg-muted/50 active:scale-95"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      )}

      {saved && (
        <div className="bg-secondary/20 rounded-2xl p-3 text-center mb-4 animate-bounce-in">
          <span className="text-sm font-bold text-secondary">✅ Datos guardados</span>
        </div>
      )}

      {!editing ? (
        <div className="flex flex-col gap-3">
          <div className="bg-card rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-muted-foreground font-bold mb-1">👤 Padre/Madre</p>
            <p className="text-base font-bold text-foreground">{userData.parentName}</p>
          </div>
          <div className="bg-card rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-muted-foreground font-bold mb-1">😊 Niño</p>
            <p className="text-base font-bold text-foreground">{userData.childName}</p>
          </div>
          <div className="bg-card rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-muted-foreground font-bold mb-1">🎂 Edad</p>
            <p className="text-base font-bold text-foreground">{userData.childAge} años</p>
          </div>
          <div className="bg-card rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-muted-foreground font-bold mb-1">📱 Celular</p>
            <p className="text-base font-bold text-foreground">{userData.phone}</p>
          </div>
          <button
            onClick={() => setEditing(true)}
            className="btn-child bg-primary text-primary-foreground mt-4"
          >
            ✏️ Editar datos
          </button>
          <button
            onClick={onLogout}
            className="btn-child bg-destructive text-destructive-foreground mt-2"
          >
            🚪 Cerrar sesión
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-sm font-bold text-foreground block mb-1">👤 Nombre del padre</label>
            <input
              type="text"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              className="w-full rounded-2xl border-2 border-border bg-card px-4 py-3 text-base font-semibold focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-foreground block mb-1">😊 Nombre del niño</label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              className="w-full rounded-2xl border-2 border-border bg-card px-4 py-3 text-base font-semibold focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-foreground block mb-1">🎂 Edad</label>
            <div className="flex gap-2">
              {["3", "4", "5", "6"].map((age) => (
                <button
                  key={age}
                  onClick={() => setChildAge(age)}
                  className={`flex-1 rounded-2xl py-3 text-lg font-black transition-all ${
                    childAge === age
                      ? "bg-primary text-primary-foreground scale-105"
                      : "bg-card border-2 border-border text-foreground"
                  }`}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-bold text-foreground block mb-1">📱 Celular</label>
            <input
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 9))}
              className="w-full rounded-2xl border-2 border-border bg-card px-4 py-3 text-base font-semibold focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setEditing(false)}
              className="btn-child bg-muted text-foreground flex-1"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="btn-child bg-primary text-primary-foreground flex-1"
            >
              Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
