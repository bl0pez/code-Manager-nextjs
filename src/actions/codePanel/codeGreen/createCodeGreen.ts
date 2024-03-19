"use server";
import { revalidatePath } from "next/cache";

import { isRoleValid } from "@/lib/auth";
import { CodeGreenSchema, CodeGreenValues } from "@/schema";
import prisma from "@/lib/prisma";

export const createCodeGreen = async (codeGreenData: CodeGreenValues) => {
  const isRoleInvalid = await isRoleValid();

  if (!isRoleInvalid) {
    return {
      error: "No tienes permisos para realizar esta acción",
    };
  }

  const validatedFields = CodeGreenSchema.safeParse(codeGreenData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors[0].message,
    };
  }

  try {
    await prisma.codeGreen.create({
      data: codeGreenData,
    });

    revalidatePath("/codeGreen");
    return {
      success: "Código verde creado correctamente",
    };
  } catch (error: any) {
    return {
      error: error.message || "Error al crear el código verde",
    };
  }
};
