"use client";

import { Button } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ExportExcelButton({ filename, rows }) {
    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Hoja1");

        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, `${filename}.xlsx`);
    };


    return (
        <Button
            colorScheme="green"
            leftIcon={<DownloadIcon />}
            onClick={handleExport}
        >
            Exportar Excel
        </Button>
    );
}
