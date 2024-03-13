import { getCodeRed } from "@/actions/codePanel/codeRed/getCodeRed";
import { Pagination } from "@/components/Pagination";

interface Props {
  page: number;
}

const columns = [
  "Fecha/Hora",
  "Ubicación",
  "Funcionario/a",
  "Hora de llamada a bomberos",
  "Operador",
  "Comunicación radial COE",
];

const TableCodeRed = async ({ page }: Props) => {
  const { codeRed, currentPage, totalPages } = await getCodeRed({
    page,
  });

  return (
    <div className="bg-white shadow rounded flex-1 w-full">
      <div className="overflow-y-auto h-80">
        <table className="w-full">
          <thead className="bg-indigo-600 text-white sticky top-0 text-left">
            <tr>
              {columns.map((column) => (
                <th key={column} className="capitalize px-3.5 py-2 min-w-36">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {codeRed.map((code) => (
              <tr key={code.id}>
                <td className="px-3.5 py-2">
                  {new Date(code.createdAt).toLocaleString()}
                </td>
                <td className="px-3.5 py-2">{code.location}</td>
                <td className="px-3.5 py-2">{code.informant}</td>
                <td className="px-3.5 py-2">
                  {code.firefightersCallTime
                    ? new Date(code.firefightersCallTime).toLocaleString()
                    : "N/A"}
                </td>
                <td className="px-3.5 py-2">{code.operator}</td>
                <td className="px-3.5 py-2">
                  {code.COERadialCommunication ? "Sí" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between flex-wrap px-3.5 py-2 bg-white w-full shadow">
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {currentPage} of {totalPages}
          </strong>
        </span>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default TableCodeRed;
