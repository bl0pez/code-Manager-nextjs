import { MainTable } from "@/components/MainTable";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { Device } from "@prisma/client";

const columns = ["Tipo", "Nodo", "Lazo", "Ubicación"];

export default function DetectorPage() {
  const devices: Device[] = [];

  return (
    <>
      <h1 className="text-2xl font-bold">Buscador de detectores</h1>
      <div className="bg-white p-2 shadow">
        <Input className="bg-white" />
      </div>

      <MainTable totalPages={1} columns={columns}>
        {devices.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.lazo}</TableCell>
            <TableCell>{item.type}</TableCell>
          </TableRow>
        ))}
      </MainTable>
    </>
  );
}
