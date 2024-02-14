import CreateCodeRed from "@/codePanel/components/create/CreateCodeRed";
import { ButtonOpenModal } from "@/codePanel/components/modal/ButtonOpenModal";
import Modal from "@/codePanel/components/modal/Modal";
import TableCodeRed from "@/codePanel/components/table/TableCodeRed";
import { TableSkeleton } from "@/components/skeleton/TableSkeleton";
import { Title } from "@/components/ui/Title";
import { Suspense } from "react";

interface Props {
  searchParams: {
    page?: string;
    showModal?: string;
  };
}

export default function RedCodePage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  return (
    <div>
      <Title title="Código Rojo" />

      <ButtonOpenModal />

      <Suspense fallback={<TableSkeleton />}>
        <TableCodeRed page={page} />
      </Suspense>

      {searchParams.showModal && (
        <Modal>
          <CreateCodeRed />
        </Modal>
      )}
    </div>
  );
}
