import { Suspense } from "react";

import CreateCodeAir from "@/codePanel/components/create/CreateCodeAir";
import Modal from "@/codePanel/components/modal/_Modal";
import { ButtonOpenModal } from "@/codePanel/components/modal/ButtonOpenModal";
import { TableSkeleton } from "@/components/skeleton/TableSkeleton";
import { Title } from "@/components/ui/Title";
import TableCodeAir from "@/codePanel/components/table/TableCodeAir";

interface Props {
  searchParams: {
    page?: string;
    showModal?: string;
  };
}

export default function AirCodePage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  return (
    <div>
      <Title title="Código Aéreo" />
      <ButtonOpenModal />

      <Suspense fallback={<TableSkeleton />}>
        <TableCodeAir page={page} />
      </Suspense>

      {searchParams.showModal && (
        <Modal>
          <CreateCodeAir />
        </Modal>
      )}
    </div>
  );
}
