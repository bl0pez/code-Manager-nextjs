import { TableCell, TableRow } from "@/components/ui/table";

import { getCodeRed } from "@/actions/codePanel/codeRed/getCodeRedWhitPagination";
import { getOperators } from "@/actions/codePanel/getOperatos";
import { DowloadXlsxButton } from "@/components/DowloadXlsxButton";
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
  "Servicio",
  "Nombre del funcionario",
  "Descripción del paciente",
  "Operador",
];

export const TableCodeLeak = async ({ page, take }: Props) => {
  const { codeRed, currentPage, totalPages, nextPage, prevPage } =
    await getCodeRed({
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
        <DowloadXlsxButton data={codeRed} fileName="CodeRed" />
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
