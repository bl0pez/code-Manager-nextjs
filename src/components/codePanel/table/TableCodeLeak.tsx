import { TableCell, TableRow } from "@/components/ui/table";

import { getOperators } from "@/actions/codePanel/getOperatos";
import { MainTable } from "@/components/MainTable";
import { Modal } from "@/components/Modal";
import { CodeRedForm } from "@/components/codePanel/form/CodeRedForm";
import { Pagination } from "@/components/Pagination";
import { getCodeLeakWhitPagination } from "@/actions/codePanel/codeLeak/getCodeLeakWhitPagination";

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
  const { codeLeak, currentPage, totalPages, nextPage, prevPage } =
    await getCodeLeakWhitPagination({
      page,
      take,
    });

  const { operators } = await getOperators();

  return (
    <>
      <div className="flex gap-2 mb-2">
        <Modal
          title="Código de fuga"
          subtitle="Complete el formulario para crear un código de fuga."
        >
          <CodeRedForm operators={operators} />
        </Modal>
      </div>

      <MainTable totalPages={totalPages} columns={columns}>
        {codeLeak.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
            <TableCell>{item.service}</TableCell>
            <TableCell>{item.informant}</TableCell>
            <TableCell>{item.patient_description}</TableCell>
            <TableCell>{item.operator}</TableCell>
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
