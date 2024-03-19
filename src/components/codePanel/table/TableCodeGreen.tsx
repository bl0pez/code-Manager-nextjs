import { Pagination } from "@/components/Pagination";
import { MainTable } from "@/components/MainTable";
import { Modal } from "@/components/Modal";
import { DowloadXlsxButton } from "@/components/DowloadXlsxButton";
import { TableCell, TableRow } from "@/components/ui/table";
import { getOperators } from "@/actions/codePanel/getOperatos";
import { CodeGreenForm } from "@/components/codePanel/form/CodeGreenForm";
import { getCodeGreenWhitPagination } from "@/actions/codePanel/codeGreen/getCodeGreenWhitPagination";

interface Props {
  page: number;
  take: number;
}

const columns = [
  "Fecha/Hora",
  "Ubicación",
  "Evento",
  "Carabineros",
  "Funcionario",
  "Operador",
];

export const TableCodeGreen = async ({ page, take }: Props) => {
  const { codeGreen, totalPages, nextPage, prevPage, currentPage } =
    await getCodeGreenWhitPagination({
      page,
      take,
    });

  const { operators } = await getOperators();

  return (
    <>
      <div className="flex gap-2 mb-2">
        <Modal
          title="Crear Código Verde"
          subtitle="Complete el formulario para crear un código verde"
        >
          <CodeGreenForm operators={operators} />
        </Modal>
        <DowloadXlsxButton data={codeGreen} fileName="CodeGreen" />
      </div>

      <MainTable totalPages={totalPages} columns={columns}>
        {codeGreen.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
            <TableCell>{item.location}</TableCell>
            <TableCell>{item.event}</TableCell>
            <TableCell>{item.police ? "Si" : "No"}</TableCell>
            <TableCell>{item.informant}</TableCell>
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
