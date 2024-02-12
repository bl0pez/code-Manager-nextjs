import { getOperators } from "@/actions/codePanel/getOperatos";
import { CodeRedForm } from "../form/CodeRedForm";

export default async function CreateCodeRed() {
  const { operatos } = await getOperators();

  return (
    <div className="flex justify-center">
      <CodeRedForm operators={operatos} />
    </div>
  );
}
