import { getUsers } from "@/actions/adminPanel/user/getUsers";
import { MainTable } from "@/components/MainTable";
import { Modal } from "@/components/Modal";
import { Pagination } from "@/components/Pagination";
import { CreateUserForm } from "@/components/adminPanel/user/CreateUserForm";
import { UserChangeRole } from "@/components/adminPanel/user/UserChangeRole";
import { UserStatusToggle } from "@/components/adminPanel/user/UserStatusToggle";
import { Switch } from "@/components/ui/switch";
import { TableCell, TableRow } from "@/components/ui/table";
interface Props {
  searchParams: {
    page?: string;
    take?: string;
  };
}

export default async function UsersPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const take = searchParams.take ? parseInt(searchParams.take) : 5;

  const { currentPage, totalPages, users, nextPage, prevPage } = await getUsers(
    {
      page,
      take,
    }
  );

  return (
    <>
      <div className="flex gap-2 mb-2">
        <Modal
          title="Crear Usuario"
          subtitle="Complete el formulario para crear un nuevo usuario."
        >
          <CreateUserForm />
        </Modal>
      </div>

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
}
