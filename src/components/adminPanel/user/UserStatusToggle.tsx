"use client";
import { changeUserStatus } from "@/actions/adminPanel/user/changeUserStatus";
import { Switch } from "@/components/ui/switch";
import { useFormStatus } from "@/hooks/useFormStatus";
import { toast } from "react-toastify";

interface Props {
  userId: string;
  value: boolean;
}

export const UserStatusToggle = ({ value, userId }: Props) => {
  const { isPending, startTransition } = useFormStatus();

  const handleChange = () => {
    startTransition(async () => {
      const update = await changeUserStatus({ userId: userId, value: !value });

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
