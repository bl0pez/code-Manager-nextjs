import CreateCodeBlue from "@/codePanel/components/create/CreateCodeBlue";
import TableCodeBlue from "@/codePanel/components/table/TableCodeBlue";
import { Title } from "@/components/ui/Title";
import { Suspense } from "react";

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

      <div className="flex gap-4 flex-wrap">
        <Suspense fallback={<div>Loading...</div>}>
          <CreateCodeBlue />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <TableCodeBlue page={page} />
        </Suspense>
      </div>
    </div>
  );
}
