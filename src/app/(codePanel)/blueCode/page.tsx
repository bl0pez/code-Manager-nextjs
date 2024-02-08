import { getCodeBlue } from "@/actions/codePanel/getCodeBlue";
import { getCodeBlueTeams } from "@/actions/codePanel/getCodeBlueTeams";
import { getOperators } from "@/actions/codePanel/getOperatos";
import { CreateCodeBlue } from "@/codePanel/components/form/CreateCodeBlue";
import { TanStackTable } from "@/codePanel/components/table/TanStackTable";

const columns = [
  {
    header: "Fecha/Hora",
    accessorKey: "createdAt",
  },
  {
    header: "Equipo",
    accessorKey: "team",
  },
  {
    header: "Ubicación",
    accessorKey: "location",
  },
  {
    header: "Funcionario",
    accessorKey: "officer",
  },
  {
    header: "Operador",
    accessorKey: "operator",
  },
];

export default async function BlueCodePage() {
  const { operatos = [] } = await getOperators();
  const { teams = [] } = await getCodeBlueTeams();
  const { codeBlue = [] } = await getCodeBlue();

  return (
    <div>
      <TanStackTable columns={columns} data={codeBlue}>
        <CreateCodeBlue teams={teams} operatos={operatos} />
      </TanStackTable>
    </div>
  );
}
