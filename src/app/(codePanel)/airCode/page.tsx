import { Suspense } from "react";
import { Title } from "@/components/ui/Title";
import { TableSkeleton } from "@/components/skeleton/TableSkeleton";
import TableCodeAir from "@/codePanel/components/table/TableCodeAir";

interface Props {
  searchParams: {
    page?: string;
    take?: string;
  };
}

export default function AirCodePage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const take = searchParams.take ? parseInt(searchParams.take) : 5;

  return (
    <div>
      <Title title="Código Aéreo" />

      <Suspense fallback={<TableSkeleton />}>
        <TableCodeAir page={page} take={take} />
      </Suspense>
    </div>
  );
}
