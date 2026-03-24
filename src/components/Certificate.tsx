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

    // Background
    ctx.fillStyle = "#FDF6EC";
    ctx.fillRect(0, 0, w, h);

    // Border
    ctx.strokeStyle = "#E0883A";
    ctx.lineWidth = 6;
    ctx.strokeRect(20, 20, w - 40, h - 40);

    // Inner border
    ctx.strokeStyle = "#F5C76B";
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 30, w - 60, h - 60);

    // Star decorations
    ctx.font = "28px serif";
    ctx.fillText("⭐", 50, 70);
    ctx.fillText("⭐", w - 80, 70);
    ctx.fillText("⭐", 50, h - 50);
    ctx.fillText("⭐", w - 80, h - 50);

    // Title
    ctx.fillStyle = "#E0883A";
    ctx.font = "bold 36px Nunito, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("🏆 CERTIFICADO 🏆", w / 2, 100);

    // Subtitle
    ctx.fillStyle = "#5A3E1B";
    ctx.font = "20px Nunito, sans-serif";
    ctx.fillText("de Logro en Lenguaje y Comunicación", w / 2, 140);

    // "Se otorga a"
    ctx.fillStyle = "#7A6B5A";
    ctx.font = "18px Nunito, sans-serif";
    ctx.fillText("Se otorga a:", w / 2, 200);

    // Child name
    ctx.fillStyle = "#E0883A";
    ctx.font = "bold 42px Nunito, sans-serif";
    ctx.fillText(childName || "Estudiante", w / 2, 260);

    // Line under name
    ctx.strokeStyle = "#E0883A";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(200, 275);
    ctx.lineTo(600, 275);
    ctx.stroke();

    // Achievement
    ctx.fillStyle = "#5A3E1B";
    ctx.font = "18px Nunito, sans-serif";
    ctx.fillText(`Por completar ${levelsCompleted} niveles en HablaTito`, w / 2, 320);

    // Mascot
    ctx.font = "60px serif";
    ctx.fillText("🦜", w / 2, 400);

    // App name
    ctx.fillStyle = "#E0883A";
    ctx.font = "bold 22px Nunito, sans-serif";
    ctx.fillText("HablaTito", w / 2, 440);

    // Date
    const date = new Date().toLocaleDateString("es-PE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    ctx.fillStyle = "#7A6B5A";
    ctx.font = "14px Nunito, sans-serif";
    ctx.fillText(date, w / 2, 490);

    // Download
    const link = document.createElement("a");
    link.download = `certificado-${childName || "hablatito"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const canDownload = levelsCompleted >= 5;

  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm">
      <p className="text-xs font-bold text-muted-foreground mb-2 text-center">Certificado</p>
      
      {canDownload ? (
        <div className="text-center">
          <span className="text-4xl block mb-2">📜</span>
          <p className="text-sm font-bold text-foreground mb-1">¡Felicidades!</p>
          <p className="text-xs text-muted-foreground font-semibold mb-3">
            Completaste {levelsCompleted} niveles. ¡Descarga tu certificado!
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
