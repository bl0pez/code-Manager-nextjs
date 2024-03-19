"use client";
import { Button } from "@/components/ui/button";

import * as XLSX from "xlsx";
import { FaFileDownload } from "react-icons/fa";

interface Props {
  data: any;
  fileName: string;
}

export const DowloadXlsxButton = ({ data, fileName }: Props) => {
  const handleClick = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <Button onClick={handleClick} variant="default" size="icon">
      <FaFileDownload size={20} />
    </Button>
  );
};
