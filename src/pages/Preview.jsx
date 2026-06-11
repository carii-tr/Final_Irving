import CVPreview from "../components/CVPreview";
import { generatePDF } from "../utils/pdfGenerator";

function Preview() {
  return (
    <div className="container">

      <h1 className="title">Previsualización CV</h1>

      <button
        className="btn btn-primary"
        onClick={() => generatePDF("cv-preview")}
      >
        📄 Exportar PDF
      </button>

      <div className="card">
        <CVPreview />
      </div>

    </div>
  );
}

export default Preview;