"use client";
import { changeUserRole } from "@/actions/adminPanel/user/changeUserRole";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormStatus } from "@/hooks/useFormStatus";
import { Role } from "@prisma/client";
import { toast } from "react-toastify";

interface Props {
  userId: string;
  role: Role;
}

export const UserChangeRole = ({ role, userId }: Props) => {
  const { isPending, startTransition } = useFormStatus();

  const handleChange = (role: Role) => {
    startTransition(async () => {
      const resp = await changeUserRole({ role, userId });

      if (resp?.error) {
        toast.error(resp.error);
      }
    });
  };

  return (
    <Select
      name="role"
      value={role}
      onValueChange={handleChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-[110px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.values(Role).map((role) => (
          <SelectItem key={role} value={role}>
            {role}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
