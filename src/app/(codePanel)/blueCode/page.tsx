import TableCodeBlue from "@/codePanel/components/table/TableCodeBlue";
import { Title } from "@/components/ui/Title";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default function BlueCodePage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <div>
      <Title title="Código Azul" />
      <TableCodeBlue page={page} />
    </div>
  );
}
