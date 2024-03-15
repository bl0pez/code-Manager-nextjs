import { CodeBlueService } from "@/services/codeBlue.service";
import { getOperators } from "@/actions/codePanel/getOperatos";

import { TableCell, TableRow } from "@/components/ui/table";
import { MainTable } from "@/components/MainTable";
import { Modal } from "@/components/Modal";
import { DowloadXlsxButton } from "@/components/DowloadXlsxButton";
import { getCodeBlueTeams } from "@/actions/codePanel/getCodeBlueTeams";
import { CodeBlueForm } from "@/codePanel/components/form/CodeBlueForm";

interface Props {
  page: number;
  take: number;
}

export const TableCodeBlue = async ({ page, take }: Props) => {
  const { codeBlue, currentPage, totalPages } =
    await CodeBlueService.findAllCodeBlue({ page, take });

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
        <DowloadXlsxButton data={codeBlue} fileName="CodeBlue" />
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
    </>
  );
};
