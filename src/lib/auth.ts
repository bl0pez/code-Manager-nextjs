import { auth } from "@/auth";
import { Role } from "@prisma/client";

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user.role;
};

export const isRoleValid = async () => {
  const role = await currentRole();
  if (role === Role.user) {
    return {
      error: "No tienes permisos para realizar esta acción",
    };
  }
};
