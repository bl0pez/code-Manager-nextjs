import { getCodeBlue } from "@/actions/codePanel/getCodeBlue";
import { CreateCodeBlue } from "../form/CreateCodeBlue";
import { getCodeBlueTeams } from "@/actions/codePanel/getCodeBlueTeams";
import { getOperators } from "@/actions/codePanel/getOperatos";

const columns = ["Fecha/Hora", "Equipo", "Ubicación", "Oficial", "Operador"];

const TableCodeBlue = async () => {
  const { codeBlue, currentPage, totalPages } = await getCodeBlue({});
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
      <div className="flex items-center justify-end mt-2 gap-2 p-2">
        {/* <button
          onClick={() => {
            previousPage();
          }}
          disabled={getCanPreviousPage()}
          className="p-1 px-2 disabled:opacity-30"
        >
          {"<"}
        </button>
        <button
          onClick={() => {
            nextPage();
          }}
          disabled={!getCanNextPage()}
          className="p-1 px-2 disabled:opacity-30"
        >
          {">"}
        </button> */}

        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {currentPage} of {totalPages}
          </strong>
        </span>

        {/* <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {getState().pagination.pageIndex} of {getPageCount()}
          </strong>
        </span>
        <select
          value={getState().pagination.pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          className="p-2 bg-transparent"
        >
          {[10, 20, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select> */}
      </div>
    </div>
  );
};

export default TableCodeBlue;
