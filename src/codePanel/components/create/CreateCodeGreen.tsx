import { getOperators } from "@/actions/codePanel/getOperatos";
import { CodeGreenForm } from "../form/CodeGreenForm";

export default async function CreateCodeGreen() {
  const { operatos } = await getOperators();

  return (
    <div className="flex justify-center">
      <CodeGreenForm operatos={operatos} />
    </div>
  );
}
