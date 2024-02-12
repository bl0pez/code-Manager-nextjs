import { Suspense } from "react";

import CreateCodeGreen from "@/codePanel/components/create/CreateCodeGreen";
import Modal from "@/codePanel/components/modal/Modal";
import TableCodeGreen from "@/codePanel/components/table/TableCodeGreen";

import { ButtonOpenModal } from "@/codePanel/components/modal/ButtonOpenModal";
import { TableSkeleton } from "@/components/skeleton/TableSkeleton";
import { Title } from "@/components/ui/Title";

interface Props {
  searchParams: {
    page?: string;
    showModal?: string;
  };
}

export default function CodeGreenPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <div>
      <Title title="Código Verde" />

      <ButtonOpenModal />

      <Suspense fallback={<TableSkeleton />}>
        <TableCodeGreen page={page} />
      </Suspense>

      {searchParams.showModal && (
        <Modal>
          <CreateCodeGreen />
        </Modal>
      )}
    </div>
  );
}
