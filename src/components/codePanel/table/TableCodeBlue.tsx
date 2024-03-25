import { CodeBlueForm } from "@/components/codePanel/form/CodeBlueForm";
import { getCodeBlueTeams } from "@/actions/codePanel/codeBlue/getCodeBlueTeams";
import { getOperators } from "@/actions/codePanel/getOperatos";
import { MainTable } from "@/components/MainTable";
import { Modal } from "@/components/Modal";
import { Pagination } from "@/components/Pagination";
import { TableCell, TableRow } from "@/components/ui/table";
import { getCodeBlueWhitPagination } from "@/actions/codePanel/codeBlue/getCodeBlueWhitPagination";

interface Props {
  page: number;
  take: number;
}

export const TableCodeBlue = async ({ page, take }: Props) => {
  const { codeBlue, currentPage, nextPage, prevPage, totalPages } =
    await getCodeBlueWhitPagination({ page, take });

  const { teams } = await getCodeBlueTeams();
  const { operators } = await getOperators();

  return (
    <>
      <div className="flex gap-2 mb-2">
        <Modal
          title="Crear Código Azul"
          subtitle="Complete el formulario para crear un nuevo código azul"
        >
          <CodeBlueForm operators={operators} teams={teams} />
        </Modal>
      </div>

      <MainTable
        totalPages={totalPages}
        columns={[
          "Fecha/Hora",
          "Equipo",
          "Ubicación",
          "Funcionario/a",
          "Operador",
        ]}
      >
        {codeBlue.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
            <TableCell>{item.team}</TableCell>
            <TableCell>{item.location}</TableCell>
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
