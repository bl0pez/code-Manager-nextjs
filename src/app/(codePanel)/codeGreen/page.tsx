import { Suspense } from "react";

import { TableCodeGreen } from "@/components/codePanel/table/TableCodeGreen";
import { TableSkeleton } from "@/components/skeleton/TableSkeleton";
import { Title } from "@/components/ui/Title";

interface Props {
  searchParams: {
    page?: string;
    take?: string;
  };
}

export default function CodeGreenPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const take = searchParams.take ? parseInt(searchParams.take) : 5;

  return (
    <div>
      <Title title="Código Verde" />

      <Suspense fallback={<TableSkeleton />}>
        <TableCodeGreen page={page} take={take} />
      </Suspense>
    </div>
  );
}
