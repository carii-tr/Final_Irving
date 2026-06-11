import CVPreview from "../components/CVPreview";
import { generatePDF } from "../utils/pdfGenerator";
import { Link } from "react-router-dom";
import { useState } from "react";

function Preview() {
  const [generating, setGenerating] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleExport = async () => {
    setGenerating(true);
    try {
      await generatePDF("cv-preview");
      showToast("¡PDF generado y descargado correctamente!");
    } catch {
      showToast("Error al generar el PDF. Intenta de nuevo.", "error");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="page page--preview">
      {toast && <div className={`toast toast--${toast.type}`}>{toast.message}</div>}

      <div className="page__header">
        <h1 className="page__title">Previsualización del CV</h1>
        <div className="page__actions">
          <Link className="btn btn--secondary" to="/editor">
            ← Volver al editor
          </Link>
          <button
            className="btn btn--primary"
            onClick={handleExport}
            disabled={generating}
          >
            {generating ? "Generando PDF..." : "📄 Exportar a PDF"}
          </button>
        </div>
      </div>

      <div className="preview__container">
        <CVPreview />
      </div>
    </div>
  );
}

export default Preview;
