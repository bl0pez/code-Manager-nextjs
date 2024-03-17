import { Suspense } from "react";

import { Title } from "@/components/ui/Title";
import { TableSkeleton } from "@/components/skeleton/TableSkeleton";
import { TableCodeBlue } from "@/components/codePanel/table/TableCodeBlue";

interface Props {
  searchParams: {
    page?: string;
    take?: string;
  };
}

export default function BlueCodePage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const take = searchParams.take ? parseInt(searchParams.take) : 5;

  return (
    <div>
      <Title title="Código Azul" />

      <Suspense fallback={<TableSkeleton />}>
        <TableCodeBlue page={page} take={take} />
      </Suspense>
    </div>
  );
}
