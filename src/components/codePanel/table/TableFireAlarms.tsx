import { TableCell, TableRow } from "@/components/ui/table";

import { getCodeRedWhitPagination } from "@/actions/codePanel/codeRed/getCodeRedWhitPagination";
import { getOperators } from "@/actions/codePanel/getOperatos";
import { MainTable } from "@/components/MainTable";
import { Modal } from "@/components/Modal";
import { CodeRedForm } from "@/components/codePanel/form/CodeRedForm";
import { Pagination } from "@/components/Pagination";
import { getDevices } from "@/actions/codePanel/fireAlarms/getDevices";

interface Props {
  page: number;
  take: number;
  search?: string;
  nodo?: string;
}

const columns = ["Ubicación", "Nodo", "Lazo", "Id dispositivo", "Tipo"];

export const TableFireAlarms = async ({ nodo, page, search, take }: Props) => {
  const { currentPage, devices, nextPage, prevPage, totalPages } =
    await getDevices({ page: page, take: take, nodoId: nodo, search });

  return (
    <>
      <MainTable totalPages={totalPages} columns={columns}>
        {devices.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.location}</TableCell>
            <TableCell>
              {item.nodo.nodo} - {item.nodo.building}
            </TableCell>
            <TableCell>{item.lazo}</TableCell>
            <TableCell>{item.deviceId}</TableCell>
            <TableCell>{item.typeDevice.type}</TableCell>
          </TableRow>
        ))}
      </MainTable>

      <Pagination
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
        totalPages={totalPages}
      />
    </>
  );
};
