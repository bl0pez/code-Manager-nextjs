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
  return role !== Role.user;
};

export const isAdmin = async () => {
  const role = await currentRole();
  return role === Role.admin;
};
