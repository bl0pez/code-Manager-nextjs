"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { Role } from "@prisma/client";

export const changeUserRole = async (userId: string, role: string) => {
  const session = await auth();

  if (session?.user.role !== Role.admin) {
    return {
      ok: false,
      message: "Debes ser administrador para realizar esta acción",
    };
  }

  try {
    const validRoles: Role[] = ["admin", "user", "operator"];

    if (!validRoles.includes(role as Role)) {
      return {
        ok: false,
        message: "El rol no es válido",
      };
    }

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: role as Role,
      },
    });

    revalidatePath("/admin/users");

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Ocurrió un error al cambiar el rol del usuario",
    };
  }
};
