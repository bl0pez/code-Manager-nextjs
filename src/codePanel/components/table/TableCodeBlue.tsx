import { getCodeBlue } from "@/actions/codePanel/getCodeBlue";
import { CreateCodeBlue } from "../form/CreateCodeBlue";
import { getCodeBlueTeams } from "@/actions/codePanel/getCodeBlueTeams";
import { getOperators } from "@/actions/codePanel/getOperatos";
import { Pagination } from "@/components/ui/Pagination";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  page: number;
}

const columns = [
  "Fecha/Hora",
  "Equipo",
  "Ubicación",
  "Funcionario/a",
  "Operador",
];

const TableCodeBlue = async ({ page }: Props) => {
  const { codeBlue, currentPage, totalPages } = await getCodeBlue({
    page,
  });
  const { teams } = await getCodeBlueTeams();
  const { operatos } = await getOperators();

  return (
    <div className="bg-white border shadow rounded">
      <div className="h-96 overflow-y-auto">
        <table className="w-full border-separate border-spacing-2">
          <thead className="bg-indigo-600 text-white border-b sticky top-0 text-left">
            <tr>
              {columns.map((column) => (
                <th key={column} className="capitalize px-3.5 py-2 min-w-56">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <CreateCodeBlue teams={teams} operatos={operatos} />
            {codeBlue.map((code) => (
              <tr key={code.id}>
                <td className="px-3.5 py-2">
                  {new Date(code.createdAt).toLocaleString()}
                </td>
                <td className="px-3.5 py-2">{code.team}</td>
                <td className="px-3.5 py-2">{code.location}</td>
                <td className="px-3.5 py-2">{code.officer}</td>
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

export default TableCodeBlue;
