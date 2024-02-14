import { CodeAirForm } from "../form/CodeAirForm";
import { getOperators } from "@/actions/codePanel/getOperatos";

export default async function CreateCodeAir() {
  const { operatos } = await getOperators();

  return (
    <div className="flex justify-center">
      <CodeAirForm operators={operatos} />
    </div>
  );
}
