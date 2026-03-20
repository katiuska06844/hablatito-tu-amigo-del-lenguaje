import { useState, useEffect } from "react";

interface UserProfileProps {
  onBack: () => void;
}

interface UserData {
  parentName: string;
  phone: string;
  childName: string;
  childAge: string;
  pin: string;
}

const UserProfile = ({ onBack }: UserProfileProps) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [editing, setEditing] = useState(false);
  const [parentName, setParentName] = useState("");
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("3");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const phone = localStorage.getItem("hablatito_current");
    if (phone) {
      const stored = localStorage.getItem(`hablatito_user_${phone}`);
      if (stored) {
        const data: UserData = JSON.parse(stored);
        setUserData(data);
        setParentName(data.parentName);
        setChildName(data.childName);
        setChildAge(data.childAge);
      }
    }
  }, []);

  const handleSave = () => {
    if (!userData) return;
    const updated: UserData = {
      ...userData,
      parentName,
      childName,
      childAge,
    };
    localStorage.setItem(`hablatito_user_${userData.phone}`, JSON.stringify(updated));
    setUserData(updated);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-4xl mb-2">
          🧒
        </div>
        <p className="text-xl font-black text-foreground">{userData.childName}</p>
        <p className="text-sm text-muted-foreground font-semibold">{userData.childAge} años</p>
      </div>

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
