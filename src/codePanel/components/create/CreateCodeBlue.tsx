import { getCodeBlueTeams } from "@/actions/codePanel/getCodeBlueTeams";
import { CodeBlueForm } from "../form/CodeBlueForm";
import { getOperators } from "@/actions/codePanel/getOperatos";

export default async function CreateCodeBlue() {
  const { teams } = await getCodeBlueTeams();
  const { operatos } = await getOperators();

  return (
    <div className="flex justify-center">
      <CodeBlueForm operatos={operatos} teams={teams} />
    </div>
  );
}
