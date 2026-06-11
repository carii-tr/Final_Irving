import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePDF = async (elementId) => {
  const element = document.getElementById(elementId);

  if (!element) {
    alert("No se encontró el elemento del CV.");
    return;
  }

  // Guardar clases actuales del body para restaurarlas después
  const bodyClasses = document.body.className;
  const bodyStyle = document.body.getAttribute("style") || "";

  try {
    // Forzar modo claro temporalmente para que el PDF salga limpio
    document.body.classList.remove("dark");
    document.body.setAttribute(
      "style",
      "background-color: #ffffff !important; color: #1a1a1a !important;"
    );

    // Pequeña pausa para que el DOM aplique los estilos
    await new Promise((resolve) => setTimeout(resolve, 120));

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      removeContainer: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    // Paginación si el CV es más largo que una hoja
    let position = 0;
    let heightLeft = imgHeight;

    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position -= pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save("DevProfile-CV.pdf");

  } catch (error) {
    console.error("Error generando PDF:", error);
    alert("Ocurrió un error al generar el PDF. Intenta de nuevo.");
  } finally {
    // Restaurar clases y estilos originales del body pase lo que pase
    document.body.className = bodyClasses;
    document.body.setAttribute("style", bodyStyle);
  }
};
