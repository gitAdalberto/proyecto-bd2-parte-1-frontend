import html2pdf from "html2pdf.js";
import { handleTitle } from "./user";


export const handlePdf = async (fileName) => {
  const element = document.getElementById("pdf");

  html2pdf()
    .set({
      margin: [40, 20, 40, 20], // top, left, bottom, right
      filename: fileName + ".pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "pt", format: "a4", orientation: "landscape" },
      pagebreak: { mode: ["css", "legacy"] }, // permite cortar la tabla en varias páginas
    })
    .from(element)
    .toPdf()
    .get("pdf")
    .then((pdf) => {
      pdf.save(fileName + ".pdf");
    });
};
export const handlePdf2 = async (fileName, id) => {
  const element = document.getElementById(id);
  if (!element) return;

  const title = await handleTitle(fileName);

  html2pdf()
    .set({
      margin: [40, 20, 40, 20], // top, left, bottom, right
      filename: fileName + ".pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "pt", format: "a4", orientation: "landscape" },
      pagebreak: { mode: ["css", "legacy"] },
    })
    .from(element)
    .toPdf()
    .get("pdf")
    .then((pdf) => {
      pdf.setFontSize(16);

      // Solo en la primera página
      const totalPages = pdf.internal.getNumberOfPages();
      pdf.setPage(1); // ir a la primera página
      pdf.text(title, 40, 40);

      pdf.save(fileName + ".pdf");
    });
};

