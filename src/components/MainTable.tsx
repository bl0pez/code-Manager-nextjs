import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "./Pagination";

interface Props {
  children: React.ReactNode;
  columns: string[];
  totalPages: number;
}

export const MainTable = ({ children, columns, totalPages }: Props) => {
  return (
    <>
      <Table className="bg-background">
        <TableHeader className="bg-primary ">
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {totalPages > 0 ? (
            children
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No hay datos
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination totalPages={totalPages} />
    </>
  );
};
