import CreateCodeRed from "@/codePanel/components/create/CreateCodeRed";
import { ButtonOpenModal } from "@/codePanel/components/modal/ButtonOpenModal";
import Modal from "@/codePanel/components/modal/Modal";
import { Title } from "@/components/ui/Title";

interface Props {
  searchParams: {
    page?: string;
    showModal?: string;
  };
}

export default function RedCodePage({ searchParams }: Props) {
  return (
    <div>
      <Title title="Código Rojo" />

      <ButtonOpenModal />

      {/* <Suspense fallback={<TableSkeleton />}>
        <TableCodeGreen page={page} />
      </Suspense> */}

      {searchParams.showModal && (
        <Modal>
          <CreateCodeRed />
        </Modal>
      )}
    </div>
  );
}
