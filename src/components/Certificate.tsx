import { useRef } from "react";

interface CertificateProps {
  childName: string;
  levelsCompleted: number;
  onClose: () => void;
}

const Certificate = ({ childName, levelsCompleted, onClose }: CertificateProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = 800;
    const h = 560;
    canvas.width = w;
    canvas.height = h;

    // Sky gradient background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, "#87CEEB");
    bgGrad.addColorStop(0.4, "#B8E6B8");
    bgGrad.addColorStop(1, "#FDF6EC");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Mountains
    ctx.fillStyle = "#5A8A5A";
    ctx.beginPath();
    ctx.moveTo(0, 300);
    ctx.lineTo(150, 160);
    ctx.lineTo(300, 280);
    ctx.lineTo(450, 140);
    ctx.lineTo(600, 260);
    ctx.lineTo(750, 150);
    ctx.lineTo(w, 300);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    // Lighter mountain layer
    ctx.fillStyle = "#7AB87A";
    ctx.beginPath();
    ctx.moveTo(0, 340);
    ctx.lineTo(200, 240);
    ctx.lineTo(400, 320);
    ctx.lineTo(550, 220);
    ctx.lineTo(w, 340);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    // Earth at bottom
    ctx.fillStyle = "#C4A060";
    ctx.fillRect(0, h - 80, w, 80);

    // Semi-transparent certificate card
    ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
    const cx = 80, cy = 60, cw = w - 160, ch = h - 120;
    ctx.beginPath();
    ctx.roundRect(cx, cy, cw, ch, 20);
    ctx.fill();

    // Border
    ctx.strokeStyle = "#E0883A";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(cx + 8, cy + 8, cw - 16, ch - 16, 16);
    ctx.stroke();

    // Stars
    ctx.font = "24px serif";
    ctx.fillText("⭐", cx + 20, cy + 40);
    ctx.fillText("⭐", cx + cw - 50, cy + 40);
    ctx.fillText("⭐", cx + 20, cy + ch - 20);
    ctx.fillText("⭐", cx + cw - 50, cy + ch - 20);

    // Title
    ctx.fillStyle = "#E0883A";
    ctx.font = "bold 32px Nunito, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("🏆 CERTIFICADO DE SUPERACIÓN 🏆", w / 2, cy + 70);

    // Subtitle
    ctx.fillStyle = "#5A3E1B";
    ctx.font = "16px Nunito, sans-serif";
    ctx.fillText("de Logro en Lenguaje y Comunicación", w / 2, cy + 100);

    // "Se otorga a"
    ctx.fillStyle = "#7A6B5A";
    ctx.font = "16px Nunito, sans-serif";
    ctx.fillText("¡Felicidades! Se otorga a:", w / 2, cy + 145);

    // Child name
    ctx.fillStyle = "#E0883A";
    ctx.font = "bold 38px Nunito, sans-serif";
    ctx.fillText(childName || "Estudiante", w / 2, cy + 195);

    // Line under name
    ctx.strokeStyle = "#E0883A";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(200, cy + 205);
    ctx.lineTo(600, cy + 205);
    ctx.stroke();

    // Achievement text
    ctx.fillStyle = "#5A3E1B";
    ctx.font = "15px Nunito, sans-serif";
    ctx.fillText("Has demostrado gran valentía y sabiduría al recorrer el camino andino.", w / 2, cy + 240);
    ctx.fillText(`Has completado con éxito ${levelsCompleted} niveles de aprendizaje en HablaTito.`, w / 2, cy + 265);

    // Medal
    ctx.font = "50px serif";
    ctx.fillText("🥇", w / 2, cy + 330);

    // Mascot
    ctx.font = "40px serif";
    ctx.fillText("🦙", w / 2 - 60, cy + 340);
    ctx.fillText("🦜", w / 2 + 60, cy + 340);

    // App name
    ctx.fillStyle = "#E0883A";
    ctx.font = "bold 20px Nunito, sans-serif";
    ctx.fillText("HablaTito", w / 2, cy + 370);

    // Date
    const date = new Date().toLocaleDateString("es-PE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    ctx.fillStyle = "#7A6B5A";
    ctx.font = "13px Nunito, sans-serif";
    ctx.fillText(date, w / 2, cy + 400);

    // Download
    const link = document.createElement("a");
    link.download = `certificado-${childName || "hablatito"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const canDownload = levelsCompleted >= 5;

  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm">
      <p className="text-xs font-bold text-muted-foreground mb-2 text-center">📜 Certificado Digital</p>

      {canDownload ? (
        <div className="text-center">
          <span className="text-4xl block mb-2">🏆</span>
          <p className="text-sm font-bold text-foreground mb-1">¡Felicidades!</p>
          <p className="text-xs text-muted-foreground font-semibold mb-3">
            Completaste {levelsCompleted} niveles. ¡Descarga tu certificado de superación!
          </p>
          <button
            onClick={generateCertificate}
            className="bg-primary text-primary-foreground rounded-2xl px-5 py-2.5 text-sm font-bold active:scale-95 transition-transform"
          >
            📥 Descargar Certificado
          </button>
        </div>
      ) : (
        <div className="text-center">
          <span className="text-4xl block mb-2 opacity-50">📜</span>
          <p className="text-sm font-bold text-foreground mb-1">Certificado bloqueado</p>
          <p className="text-xs text-muted-foreground font-semibold">
            Completa 5 niveles para desbloquear ({levelsCompleted}/5)
          </p>
          <div className="w-full bg-muted rounded-full h-2 mt-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-700"
              style={{ width: `${Math.min((levelsCompleted / 5) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default Certificate;
