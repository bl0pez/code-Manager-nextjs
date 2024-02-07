import { CreateCodeBlue } from "@/codePanel/components/form/CreateCodeBlue";
import { TanStackTable } from "@/codePanel/components/table/TanStackTable";

const columns = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Fecha/Hora",
    accessorKey: "date",
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

export default function BlueCodePage() {
  return (
    <div className="flex flex-col justify-center h-full gap-4">
      <CreateCodeBlue />
      <TanStackTable columns={columns} data={[]} />
    </div>
  );
}
