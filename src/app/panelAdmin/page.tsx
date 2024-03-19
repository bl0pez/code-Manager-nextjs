import { Suspense } from "react";
import { Modal } from "@/components/Modal";
import { Users } from "@/components/adminPanel/table/Users";
import { CreateUserForm } from "@/components/adminPanel/user/CreateUserForm";
import { TableSkeleton } from "@/components/skeleton/TableSkeleton";

interface Props {
  searchParams: {
    page?: string;
    take?: string;
  };
}

export default function UsersPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const take = searchParams.take ? parseInt(searchParams.take) : 5;

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

      <Suspense fallback={<TableSkeleton />}>
        <Users page={page} take={take} />
      </Suspense>
    </>
  );
}
