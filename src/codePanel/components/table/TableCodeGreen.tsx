import { Pagination } from "@/components/ui/Pagination";
import { getCodeGreen } from "@/actions/codePanel/codeGreen/getCodeGreen";

interface Props {
  page: number;
}

const columns = [
  "Fecha/Hora",
  "Ubicación",
  "Evento",
  "Carabineros",
  "Funcionario",
  "Operador",
];

const TableCodeGreen = async ({ page }: Props) => {
  const { codeGreen, currentPage, totalPages } = await getCodeGreen({
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
            {codeGreen.map((code) => (
              <tr key={code.id}>
                <td className="px-3.5 py-2">
                  {new Date(code.createdAt).toLocaleString()}
                </td>
                <td className="px-3.5 py-2">{code.location}</td>
                <td className="px-3.5 py-2">{code.event}</td>
                <td className="px-3.5 py-2">
                  {code.police === true ? "Si" : "No"}
                </td>
                <td className="px-3.5 py-2">{code.informant}</td>
                <td className="px-3.5 py-2">{code.operator}</td>
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

export default TableCodeGreen;
