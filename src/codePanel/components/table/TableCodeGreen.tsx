import { getOperators } from "@/actions/codePanel/getOperatos";
import { Pagination } from "@/components/ui/Pagination";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    <div className="bg-white border shadow rounded">
      <div className="h-96 overflow-y-auto">
        <table className="w-full">
          <thead className="bg-indigo-600 text-white border-b sticky top-0 text-left">
            <tr>
              {columns.map((column) => (
                <th key={column} className="capitalize px-3.5 py-2">
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
                <td className="px-3.5 py-2">{code.event}</td>
                <td className="px-3.5 py-2">{code.location}</td>
                <td className="px-3.5 py-2">{code.informant}</td>
                <td className="px-3.5 py-2">{code.informant}</td>
                <td className="px-3.5 py-2">{code.operator}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Paginacion */}
      <div className="flex items-center justify-between p-2 flex-wrap">
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {currentPage} of {totalPages}
          </strong>
        </span>
        <Pagination totalPages={totalPages} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default TableCodeGreen;
