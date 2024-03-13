"use server";
import { CodeBlueService } from "@/services/codeBlue.service";
import { utils, write } from "xlsx";

export const downloadBlueCodeData = async () => {
  const workbook = utils.book_new();

  const codeBlueData = await CodeBlueService.findAllCodeBlue({});

  const codeBlueSheet = utils.json_to_sheet(codeBlueData.codeBlue);

  utils.book_append_sheet(workbook, codeBlueSheet, "Code Blue Data");

  // Escribir el libro de trabajo en un Blob
  const workbookBlob = new Blob(
    [write(workbook, { bookType: "xlsx", type: "array" })],
    { type: "application/octet-stream" }
  );

  // Crear un objeto URL a partir del Blob
  const url = URL.createObjectURL(workbookBlob);

  // Crear un enlace y hacer clic en él para iniciar la descarga
  const link = document.createElement("a");
  link.href = url;
  link.download = "CodeBlueData.xlsx";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
