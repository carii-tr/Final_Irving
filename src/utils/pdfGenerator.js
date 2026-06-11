import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePDF = async (elementId) => {
  const element = document.getElementById(elementId);

  if (!element) {
    alert("No se encontró el CV");
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff"
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let position = 0;

    if (imgHeight <= pdfHeight) {
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
    } else {
      let heightLeft = imgHeight;

      while (heightLeft > 0) {
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
        position -= pdfHeight;

        if (heightLeft > 0) pdf.addPage();
      }
    }

    pdf.save("DevProfile-CV.pdf");

  } catch (error) {
    console.error(error);
    alert("Error generando PDF");
  }
};