import React from "react";
import { toast } from "react-toastify";

interface AlertMessage {
  message: string | undefined;
  type: "error" | "success";
}

export const useFormStatus = () => {
  const [isPending, startTransition] = React.useTransition();

  const setAlertMessage = ({ message, type }: AlertMessage) => {
    if (!message) return null;

    if (type === "error") {
      return toast.error(message);
    }

    toast.success(message);
  };

  return {
    isPending,
    startTransition,
    setAlertMessage,
  };
};
