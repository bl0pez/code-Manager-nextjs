import { getOperators } from "@/actions/codePanel/getOperatos";
import { CreateCodeGreen } from "@/codePanel/components/form/CreateCodeGreen";
import TableCodeGreen from "@/codePanel/components/table/TableCodeGreen";
import { Title } from "@/components/ui/Title";
import clsx from "clsx";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function CodeGreenPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { operatos } = await getOperators();

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2">
        <Title title="Código Verde" />
        <CreateCodeGreen operatos={operatos} />
      </div>
      <TableCodeGreen page={page} />
    </div>
  );
}
