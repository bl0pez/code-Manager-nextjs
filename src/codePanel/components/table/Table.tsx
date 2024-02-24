import { Pagination } from "@/components/ui/Pagination";

interface Props {
  children: React.ReactNode;
  columns: string[];
  currentPage: number;
  totalPages: number;
}

export const Table = ({
  children,
  columns,
  currentPage,
  totalPages,
}: Props) => {
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
          <tbody>{children}</tbody>
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
