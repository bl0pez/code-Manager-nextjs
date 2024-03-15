"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const changeUserIsActive = async (userId: string, isActive: string) => {
  try {
    const newIsActive = isActive === "true" ? true : false;

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isActive: newIsActive,
      },
    });

    revalidatePath("/admin/users");

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Ocurrió un error al cambiar el estado del usuario",
    };
  }
};
