import { useSession } from "next-auth/react";

export const useCurrentRole = () => {
  const { data: session } = useSession();
  const role = session?.user.role;

  return role;
};
