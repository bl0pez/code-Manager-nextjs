import { getOperatorsWhitPagination } from "@/actions/adminPanel/operators/getOperatorsWhitPagination";
import { MainTable } from "@/components/MainTable";
import { Pagination } from "@/components/Pagination";
import { TableCell, TableRow } from "@/components/ui/table";
import { OperatorStatusToggle } from "../operators/OperatorStatusToggle";

interface Props {
  page: number;
  take: number;
}

export const Operators = async ({ page, take }: Props) => {
  const { currentPage, nextPage, operators, prevPage, totalPages } =
    await getOperatorsWhitPagination({ page, take });

  return (
    <>
      <MainTable totalPages={totalPages} columns={["ID", "Nombre", "Activo"]}>
        {operators.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.fullName}</TableCell>
            <TableCell>
              <OperatorStatusToggle id={item.id} value={item.isActive} />
            </TableCell>
          </TableRow>
        ))}
      </MainTable>

      <Pagination
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
        totalPages={totalPages}
      />
    </>
  );
};
