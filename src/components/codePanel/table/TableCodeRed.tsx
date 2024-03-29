import { TableCell, TableRow } from "@/components/ui/table";

import { getCodeRedWhitPagination } from "@/actions/codePanel/codeRed/getCodeRedWhitPagination";
import { getOperators } from "@/actions/codePanel/getOperatos";
import { MainTable } from "@/components/MainTable";
import { Modal } from "@/components/Modal";
import { CodeRedForm } from "@/components/codePanel/form/CodeRedForm";
import { Pagination } from "@/components/Pagination";

interface Props {
  page: number;
  take: number;
}

const columns = [
  "Fecha/Hora",
  "Ubicación",
  "Funcionario/a",
  "Hora de llamada a bomberos",
  "Operador",
  "Comunicación radial COE",
];

export const TableCodeRed = async ({ page, take }: Props) => {
  const { codeRed, currentPage, totalPages, nextPage, prevPage } =
    await getCodeRedWhitPagination({
      page,
      take,
    });

  const { operators } = await getOperators();

  return (
    <>
      <div className="flex gap-2 mb-2">
        <Modal
          title="Código Rojo"
          subtitle="Complete el formulario para crear un código rojo"
        >
          <CodeRedForm operators={operators} />
        </Modal>
      </div>

      <MainTable totalPages={totalPages} columns={columns}>
        {codeRed.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
            <TableCell>{item.location}</TableCell>
            <TableCell>{item.informant}</TableCell>
            <TableCell>
              {item.firefightersCallTime
                ? new Date(item.firefightersCallTime).toLocaleTimeString()
                : ""}
            </TableCell>
            <TableCell>{item.operator}</TableCell>
            <TableCell>{item.COERadialCommunication ? "Si" : "No"}</TableCell>
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
