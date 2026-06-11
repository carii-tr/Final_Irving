import CVPreview from "../components/CVPreview";
import { generatePDF } from "../utils/pdfGenerator";

function Preview() {
  return (
    <div className="page page--preview">
      <h1 className="page__title">Previsualización del CV</h1>

      <div className="page__actions">
        <button
          className="button button--primary"
          onClick={() => generatePDF("cv-preview")}
        >
          📄 Exportar PDF
        </button>
      </div>

      <div className="page__content">
        <CVPreview />
      </div>
    </div>
  );
}

export default Preview;