import { getUsers } from "@/actions/codePanel/admin/getUsers";

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

  return <div></div>;
}
