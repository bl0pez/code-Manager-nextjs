import { Suspense } from "react";
import TableCodeGreen from "@/codePanel/components/table/TableCodeGreen";
import { Title } from "@/components/ui/Title";
import CreateCodeGreen from "@/codePanel/components/create/CreateCodeGreen";

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

      <div className="flex gap-4 flex-wrap">
        <Suspense fallback={<div>Loading...</div>}>
          <CreateCodeGreen />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <TableCodeGreen page={page} />
        </Suspense>
      </div>
    </div>
  );
}
