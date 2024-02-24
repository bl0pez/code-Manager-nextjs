import { getUsers } from "@/actions/codePanel/admin/getUsers";
import { Table } from "@/codePanel/components/table/Table";
import { TBodyUser } from "@/codePanel/components/table/tbody/TBodyUser";

const columns = ["fullName", "email", "isActive", "role"];

interface Props {
  searchParams: {
    page: number;
  };
}

export default async function UsersPage({ searchParams }: Props) {
  const { users, currentPage, totalPages } = await getUsers({
    page: searchParams.page,
  });

  return (
    <div>
      <Table
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
      >
        {users.map((user) => (
          <TBodyUser key={user.id} user={user} />
        ))}
      </Table>
    </div>
  );
}
