"use server";
import { revalidatePath } from "next/cache";
import { Role } from "@prisma/client";
import { updateUser } from "@/data/adminPanel/user/updateUser";
import { isAdmin } from "@/lib/auth";

interface Props {
  role: Role;
  userId: string;
}

export const changeUserRole = async ({ role, userId }: Props) => {
  const isRoleValid = await isAdmin();

  if (!isRoleValid) {
    return {
      error: "No tienes permisos para realizar esta acción",
    };
  }

  const user = await updateUser({
    userId,
    data: {
      role,
    },
  });

  if (!user) {
    return {
      error: "Error al actualizar el rol del usuario",
    };
  }

  return revalidatePath("/adminPanel");
};
