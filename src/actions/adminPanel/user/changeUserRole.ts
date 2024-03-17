"use server";
import { revalidatePath } from "next/cache";
import { Role } from "@prisma/client";
import { updateUser } from "@/data/adminPanel/user/updateUser";

interface Props {
  role: Role;
  userId: string;
}

export const changeUserRole = async ({ role, userId }: Props) => {
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
