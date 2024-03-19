import { getUsers } from "@/actions/adminPanel/user/getUsers";
import { UserChangeRole } from "@/components/adminPanel/user/UserChangeRole";
import { UserStatusToggle } from "@/components/adminPanel/user/UserStatusToggle";
import { TableCell, TableRow } from "@/components/ui/table";
import { Pagination } from "@/components/Pagination";
import { MainTable } from "@/components/MainTable";

interface Props {
  page: number;
  take: number;
}

export const Users = async ({ page, take }: Props) => {
  const { currentPage, nextPage, prevPage, totalPages, users } = await getUsers(
    { page, take }
  );

  return (
    <>
      <MainTable
        totalPages={totalPages}
        columns={["Correo Electrónico", "Nombre", "Rol", "Activo"]}
      >
        {users.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.fullName}</TableCell>
            <TableCell>
              <UserChangeRole userId={item.id} role={item.role} />
            </TableCell>
            <TableCell>
              <UserStatusToggle userId={item.id} value={item.isActive} />
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
