import { useState } from "react";
import AndeanBackground from "@/components/AndeanBackground";

interface AuthProps {
  onAuth: (childName: string) => void;
}

interface UserData {
  parentName: string;
  phone: string;
  childName: string;
  childAge: string;
  pin: string;
}

const Auth = ({ onAuth }: AuthProps) => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const [parentName, setParentName] = useState("");
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("3");

  const handleLogin = () => {
    setError("");
    const stored = localStorage.getItem(`hablatito_user_${phone}`);
    if (!stored) {
      setError("No encontramos esta cuenta. ¿Deseas registrarte?");
      return;
    }
    const data: UserData = JSON.parse(stored);
    if (data.pin !== pin) {
      setError("PIN incorrecto");
      return;
    }
    localStorage.setItem("hablatito_current", phone);
    onAuth(data.childName);
  };

  const handleRegister = () => {
    setError("");
    if (!parentName.trim() || !childName.trim() || !phone.trim() || pin.length < 4) {
      setError("Completa todos los campos. El PIN debe tener 4 números.");
      return;
    }
    if (localStorage.getItem(`hablatito_user_${phone}`)) {
      setError("Este número ya está registrado. Inicia sesión.");
      return;
    }
    const data: UserData = { parentName, phone, childName, childAge, pin };
    localStorage.setItem(`hablatito_user_${phone}`, JSON.stringify(data));
    localStorage.setItem("hablatito_current", phone);
    onAuth(childName);
  };

  return (
    <div className="app-shell flex flex-col items-center min-h-dvh relative px-6 py-8">
      <AndeanBackground />
      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="text-5xl mb-2 animate-float">🦙</div>
        <h1 className="text-3xl font-black text-foreground mb-1 drop-shadow-md">HablaTito</h1>
        <p className="text-sm text-foreground/80 font-bold mb-5 drop-shadow-sm">
          {mode === "login" ? "Inicia sesión" : "Crea tu cuenta"}
        </p>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-5 w-full max-w-xs shadow-xl">
          {mode === "login" ? (
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-bold text-foreground block mb-1">📱 Número de celular</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="999 888 777"
                  className="w-full rounded-2xl border-2 border-border bg-white px-4 py-3.5 text-lg font-semibold focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-foreground block mb-1">🔒 PIN (4 números)</label>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                  placeholder="••••"
                  className="w-full rounded-2xl border-2 border-border bg-white px-4 py-3.5 text-lg font-semibold text-center tracking-[0.5em] focus:outline-none focus:border-primary"
                />
              </div>

              {error && <p className="text-destructive text-sm font-bold text-center">{error}</p>}

              <button onClick={handleLogin} className="btn-child bg-primary text-primary-foreground w-full mt-1">
                Entrar
              </button>
              <button onClick={() => { setMode("register"); setError(""); }} className="text-sm font-bold text-primary text-center">
                ¿No tienes cuenta? Regístrate
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="text-xs text-muted-foreground font-semibold bg-muted rounded-2xl p-2.5 text-center">
                👨‍👩‍👧 Datos del padre o cuidador
              </p>
              <div>
                <label className="text-sm font-bold text-foreground block mb-1">👤 Tu nombre</label>
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Nombre del padre/madre"
                  className="w-full rounded-2xl border-2 border-border bg-white px-4 py-3 text-base font-semibold focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-foreground block mb-1">📱 Celular</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="999 888 777"
                  className="w-full rounded-2xl border-2 border-border bg-white px-4 py-3 text-base font-semibold focus:outline-none focus:border-primary"
                />
              </div>

              <p className="text-xs text-muted-foreground font-semibold bg-muted rounded-2xl p-2.5 text-center mt-1">
                👶 Datos del niño
              </p>
              <div>
                <label className="text-sm font-bold text-foreground block mb-1">😊 Nombre del niño</label>
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="Nombre"
                  className="w-full rounded-2xl border-2 border-border bg-white px-4 py-3 text-base font-semibold focus:outline-none focus:border-primary"
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
                          : "bg-white border-2 border-border text-foreground"
                      }`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-foreground block mb-1">🔒 Crea un PIN (4 números)</label>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                  placeholder="••••"
                  className="w-full rounded-2xl border-2 border-border bg-white px-4 py-3 text-lg font-semibold text-center tracking-[0.5em] focus:outline-none focus:border-primary"
                />
              </div>

              {error && <p className="text-destructive text-sm font-bold text-center">{error}</p>}

              <button onClick={handleRegister} className="btn-child bg-primary text-primary-foreground w-full mt-1">
                Registrarme
              </button>
              <button onClick={() => { setMode("login"); setError(""); }} className="text-sm font-bold text-primary text-center">
                ¿Ya tienes cuenta? Inicia sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
