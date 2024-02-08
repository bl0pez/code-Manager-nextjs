import TableCodeBlue from "@/codePanel/components/table/TableCodeBlue";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default function BlueCodePage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 py-4">Código Azul</h1>
      <TableCodeBlue page={page} />
    </div>
  );
}
