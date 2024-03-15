import { getCodeAir } from "@/actions/codePanel/codeAir/getCodeaAir";
import { Modal } from "@/components/Modal";
import { DowloadXlsxButton } from "@/components/DowloadXlsxButton";
import { MainTable } from "@/components/MainTable";
import { TableCell, TableRow } from "@/components/ui/table";
import { CodeAirForm } from "@/codePanel/components/form/CodeAirForm";
import { getOperators } from "@/actions/codePanel/getOperatos";

interface Props {
  page: number;
  take: number;
}

const columns = [
  "Fecha/Hora",
  "Lugar del evento",
  "Detalle de la emergencia",
  "Funcionario",
  "Operador",
];

const TableCodeGreen = async ({ page, take }: Props) => {
  const { codeAir, currentPage, totalPages } = await getCodeAir({
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
          <CodeAirForm operators={operators} />
        </Modal>
        <DowloadXlsxButton data={codeAir} fileName="CodeGreen" />
      </div>

      <MainTable totalPages={totalPages} columns={columns}>
        {codeAir.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
            <TableCell>{item.location}</TableCell>
            <TableCell>{item.emergencyDetails}</TableCell>
            <TableCell>{item.informant}</TableCell>
            <TableCell>{item.operator}</TableCell>
          </TableRow>
        ))}
      </MainTable>
    </>
  );
};

export default TableCodeGreen;
