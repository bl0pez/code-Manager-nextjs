import { Suspense } from "react";
import { Modal } from "@/components/Modal";
import { Operators } from "@/components/adminPanel/table/Operators";
import { TableSkeleton } from "@/components/skeleton/TableSkeleton";
import { CreateOperatorForm } from "@/components/adminPanel/operators/CreateOperatorForm";

interface Props {
  searchParams: {
    page?: string;
    take?: string;
  };
}

export default function OperatorsPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const take = searchParams.take ? parseInt(searchParams.take) : 5;

  return (
    <>
      <div className="flex gap-2 mb-2">
        <Modal
          title="Crear Operador"
          subtitle="Complete el formulario para crear un nuevo operador"
        >
          <CreateOperatorForm />
        </Modal>
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <Operators page={page} take={take} />
      </Suspense>
    </>
  );
}
