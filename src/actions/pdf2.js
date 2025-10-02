import { handleTitle } from "./user";
import jsPDF from "jspdf";

export const exportTableToPdf = async (title, headers, rows) => {
  console.log("Generando PDF...");

  // Importar dinámicamente autotable
  const autoTable = (await import("jspdf-autotable")).default;

  const doc = new jsPDF("landscape");
  const finalTitle = await handleTitle(title);

  // Título
  doc.setFontSize(16);
  doc.text(finalTitle, 14, 20);

  // Generar tabla con el plugin
  autoTable(doc, {
    startY: 30,
    head: headers,
    body: rows,
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [22, 160, 133] }, // color del header
    alternateRowStyles: { fillColor: [240, 240, 240] },
  });

  // Descargar (usa un nombre válido con extensión .pdf)
  doc.save(`${title}.pdf`);
};
