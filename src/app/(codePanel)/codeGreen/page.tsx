import TableCodeGreen from "@/codePanel/components/table/TableCodeGreen";
import { Title } from "@/components/ui/Title";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default function CodeGreenPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <div>
      <Title title="Código Verde" />
      <TableCodeGreen page={page} />
    </div>
  );
}
