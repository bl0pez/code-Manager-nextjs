import {
  ExclamationTriangleIcon,
  CheckCircledIcon,
} from "@radix-ui/react-icons";

import clsx from "clsx";

interface Props {
  type: "error" | "success";
  message: string | null;
}

export const FormAler = ({ message, type }: Props) => {
  if (!message) return null;

  return (
    <div
      className={clsx(
        "p-3 rounded-md flex items-center gap-x-2 text-sm",
        { "bg-red-100 text-red-800": type === "error" },
        { "bg-green-100 text-green-800": type === "success" }
      )}
    >
      {type === "error" ? (
        <ExclamationTriangleIcon className="w-5 h-5" />
      ) : (
        <CheckCircledIcon className="w-5 h-5" />
      )}
      <p>{message}</p>
    </div>
  );
};
