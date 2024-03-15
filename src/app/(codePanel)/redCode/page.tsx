import { Suspense } from "react";

import { Title } from "@/components/ui/Title";
import { TableSkeleton } from "@/components/skeleton/TableSkeleton";
import TableCodeRed from "@/codePanel/components/table/TableCodeRed";

interface Props {
  searchParams: {
    page?: string;
    take?: string;
  };
}

export default function RedCodePage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const take = searchParams.take ? parseInt(searchParams.take) : 5;

  return (
    <div>
      <Title title="Código Rojo" />

      <Suspense fallback={<TableSkeleton />}>
        <TableCodeRed page={page} take={take} />
      </Suspense>
    </div>
  );
}
