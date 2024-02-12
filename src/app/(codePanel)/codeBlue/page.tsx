import { Suspense } from "react";

import Modal from "@/codePanel/components/modal/Modal";
import TableCodeBlue from "@/codePanel/components/table/TableCodeBlue";
import CreateCodeBlue from "@/codePanel/components/create/CreateCodeBlue";
import { ButtonOpenModal } from "@/codePanel/components/modal/ButtonOpenModal";
import { Title } from "@/components/ui/Title";
import { TableSkeleton } from "@/components/skeleton/TableSkeleton";

interface Props {
  searchParams: {
    page?: string;
    showModal?: string;
  };
}

export default function BlueCodePage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  return (
    <div>
      <Title title="Código Azul" />

      <ButtonOpenModal />

      <Suspense fallback={<TableSkeleton />}>
        <TableCodeBlue page={page} />
      </Suspense>

      {searchParams.showModal && (
        <Modal>
          <CreateCodeBlue />
        </Modal>
      )}
    </div>
  );
}
