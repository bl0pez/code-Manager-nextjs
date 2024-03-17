"use server";
import { revalidatePath } from "next/cache";
import { updateUser } from "@/data/adminPanel/user/updateUser";
import { isAdmin } from "@/lib/auth";

interface Props {
  value: boolean;
  userId: string;
}

export const changeUserStatus = async ({ userId, value }: Props) => {
  const isRoleValid = await isAdmin();

  if (!isRoleValid) {
    return {
      error: "No tienes permisos para realizar esta acción",
    };
  }

  const user = await updateUser({
    userId,
    data: {
      isActive: value,
    },
  });

  if (!user) {
    return {
      error: "Error al actualizar el estado del usuario.",
    };
  }

  return revalidatePath("/adminPanel");
};
