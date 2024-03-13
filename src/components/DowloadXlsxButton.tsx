"use client";
import * as XLSX from "xlsx";
import { FaFileDownload } from "react-icons/fa";

import { Button } from "./ui/button";

interface Props {
  data: any;
  fileName: string;
}

export const DowloadXlsxButton = ({ data, fileName }: Props) => {
  const handleClick = () => {
    const mappedData = data.map((item: any) => ({
      "Fecha/Hora": new Date(item.createdAt).toLocaleString(),
      Equipo: item.team,
      Ubicación: item.location,
      "Funcionario/a": item.informant,
      Operador: item.operator,
    }));

    const ws = XLSX.utils.json_to_sheet(mappedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <Button onClick={handleClick} variant="default" size="icon">
      <FaFileDownload size={20} />
    </Button>
  );
};
