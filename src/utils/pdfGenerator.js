import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePDF = async (elementId) => {
    const element = document.getElementById(elementId);

    if (!element) {
        alert("No se encontró el CV para exportar");
        return;
    }

    try {
        const canvas = await html2canvas(element, {
            scale: 2, // mejor calidad
            useCORS: true
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        let position = 0;

        // Si es muy largo, permite múltiples páginas
        if (imgHeight < pdfHeight) {
            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        } else {
            let heightLeft = imgHeight;

            while (heightLeft > 0) {
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pdfHeight;
                position -= pdfHeight;

                if (heightLeft > 0) pdf.addPage();
            }
        }

        pdf.save("DevProfile-CV.pdf");

    } catch (error) {
        console.error("Error generando PDF:", error);
        alert("Error al generar PDF");
    }
};