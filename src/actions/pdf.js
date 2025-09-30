
import { handleTitle } from "./user";


export const handlePdf = async (fileName) => {
  const element = document.getElementById("pdf");
  const html2pdf = (await import("html2pdf.js")).default;
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
  console.log("Creando pdf");
  const element = document.getElementById(id);
  if (!element) return;

  // Clonar el elemento (deep clone)
  const clone = element.cloneNode(true);

  // Aplicar modo claro solo al clon
  clone.style.color = "black";
  clone.style.backgroundColor = "white";

  // Opcional: aplicar color negro a todos los hijos
  clone.querySelectorAll("*").forEach((el) => {
    el.style.color = "black";
    el.style.backgroundColor = "white";
  });

  const html2pdf = (await import("html2pdf.js")).default;
  const title = await handleTitle(fileName);

  html2pdf()
    .set({
      margin: [40, 20, 40, 20],
      filename: fileName + ".pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "pt", format: "a4", orientation: "landscape" },
      pagebreak: { mode: ["css", "legacy"] },
    })
    .from(clone)
    .toPdf()
    .get("pdf")
    .then((pdf) => {
      pdf.setFontSize(16);
      pdf.setPage(1);
      pdf.text(title, 40, 40);
      pdf.save(fileName + ".pdf");
    });
};



