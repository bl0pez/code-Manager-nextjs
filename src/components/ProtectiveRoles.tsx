import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";

interface Props {
  roles: Role[];
  children: React.ReactNode;
}

export const ProtectiveRoles = ({ roles, children }: Props) => {
  const { data: session } = useSession();

  const isAuthorized = roles.some((role) => session?.user.role.includes(role));
  if (!isAuthorized) return null;
  return <>{children}</>;
};
