import { getCodeBlueTeams } from "@/actions/codePanel/getCodeBlueTeams";
import { getOperators } from "@/actions/codePanel/getOperatos";
import { CreateCodeBlue } from "@/codePanel/components/form/CreateCodeBlue";
import TableCodeBlue from "@/codePanel/components/table/TableCodeBlue";
import { Title } from "@/components/ui/Title";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function BlueCodePage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { teams } = await getCodeBlueTeams();
  const { operatos } = await getOperators();

  return (
    <div>
      <Title title="Código Azul" />

      <div className="flex gap-4 flex-wrap">
        <CreateCodeBlue operatos={operatos} teams={teams} />
        <TableCodeBlue page={page} />
      </div>
    </div>
  );
}
