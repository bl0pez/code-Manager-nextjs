"use client";
import { changeOperatorStatus } from "@/actions/adminPanel/operators/changeOperatorStatus";
import { Switch } from "@/components/ui/switch";
import { useFormStatus } from "@/hooks/useFormStatus";
import { toast } from "react-toastify";

interface Props {
  id: string;
  value: boolean;
}

export const OperatorStatusToggle = ({ value, id }: Props) => {
  const { isPending, startTransition } = useFormStatus();

  const handleChange = () => {
    startTransition(async () => {
      const update = await changeOperatorStatus({ id, value: !value });

      if (update?.error) {
        toast.error(update.error);
      }
    });
  };

  return (
    <Switch
      checked={value}
      onCheckedChange={handleChange}
      disabled={isPending}
    />
  );
};
