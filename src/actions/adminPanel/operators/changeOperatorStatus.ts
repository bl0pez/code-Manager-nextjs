"use server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";

interface Props {
  value: boolean;
  id: string;
}

export const changeOperatorStatus = async ({ id, value }: Props) => {
  const isRoleValid = await isAdmin();

  if (!isRoleValid) {
    return {
      error: "No tienes permisos para realizar esta acción",
    };
  }

  try {
    const operator = await prisma.operator.update({
      where: {
        id,
      },
      data: {
        isActive: value,
      },
    });

    if (!operator) {
      return {
        error: "No se pudo actualizar el operador",
      };
    }

    return revalidatePath("/adminPanel/operators");
  } catch (error) {
    return {
      error: "Error al actualizar el operador",
    };
  }
};
