import { Modal } from "@/components/Modal";
import { CreateNodo } from "@/components/codePanel/create/CreateNodo";
import { DeviceForm } from "@/components/codePanel/form/DeviceForm";
import { SearchFireAlarms } from "@/components/codePanel/search/SearchFireAlarms";
import { TableFireAlarms } from "@/components/codePanel/table/TableFireAlarms";
import { Title } from "@/components/ui/Title";

import { MdAssignmentAdd } from "react-icons/md";
import { BsBuildingFillAdd } from "react-icons/bs";
import { TypeDeviceForm } from "@/components/codePanel/form/TypeDevice";
import { getNodoAndTypeDevice } from "@/actions/codePanel/fireAlarms/getNodo";

interface Props {
  searchParams: {
    page?: string;
    take?: string;
    search?: string;
    nodo?: string;
  };
}

export default async function FireAlarmsPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const take = searchParams.take ? parseInt(searchParams.take) : 5;

  const { nodos, typeDevices } = await getNodoAndTypeDevice();

  return (
    <div>
      <Title title="Detectores de Incendio" />

      <div className="flex gap-2 mb-2">
        <Modal
          title="Crear Dispositivo"
          subtitle="Complete el formulario para crear un nuevo dispositivo."
        >
          <DeviceForm nodo={nodos} typeDevices={typeDevices} />
        </Modal>
        <Modal
          title="Crear Nodo"
          subtitle="Complete el formulario para crear un nuevo nodo."
          icon={<BsBuildingFillAdd />}
        >
          <CreateNodo />
        </Modal>
        <Modal
          title="Crear tipo de dispositivo"
          subtitle="Complete el formulario para crear un nuevo tipo de dispositivo."
          icon={<MdAssignmentAdd />}
        >
          <TypeDeviceForm />
        </Modal>
      </div>
      <SearchFireAlarms nodos={nodos} />

      <TableFireAlarms
        page={page}
        take={take}
        search={searchParams.search}
        nodo={searchParams.nodo}
      />
    </div>
  );
}
