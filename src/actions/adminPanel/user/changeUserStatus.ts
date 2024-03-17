"use server";
import { revalidatePath } from "next/cache";
import { updateUser } from "@/data/adminPanel/user/updateUser";

interface Props {
  value: boolean;
  userId: string;
}

export const changeUserStatus = async ({ userId, value }: Props) => {
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
