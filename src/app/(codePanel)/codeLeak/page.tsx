import { TableCodeLeak } from "@/components/codePanel/table/TableCodeLeak";
import { TableSkeleton } from "@/components/skeleton/TableSkeleton";
import { Title } from "@/components/ui/Title";
import { Suspense } from "react";

interface Props {
  searchParams: {
    page?: string;
    take?: string;
  };
}

export default function LeakCodePage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const take = searchParams.take ? parseInt(searchParams.take) : 5;

  return (
    <div>
      <Title title="Código de Fuga" />

      <Suspense fallback={<TableSkeleton />}>
        <TableCodeLeak page={page} take={take} />
      </Suspense>
    </div>
  );
}
