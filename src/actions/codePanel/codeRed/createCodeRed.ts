"use server";
import { revalidatePath } from "next/cache";
import { isRoleValid } from "@/lib/auth";
import { CodeRedSchema, CodeRedValues } from "@/schema";
import prisma from "@/lib/prisma";

export const createCodeRed = async (codeRedData: CodeRedValues) => {
  const isRoleInvalid = await isRoleValid();

  if (!isRoleInvalid) {
    return {
      error: "No tienes permisos para realizar esta acción",
    };
  }

  const validatedFields = CodeRedSchema.safeParse(codeRedData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors[0].message,
    };
  }

  try {
    await prisma.codeRed.create({
      data: codeRedData,
    });

    revalidatePath("/codeRed");
    return {
      success: "Código rojo creado correctamente",
    };
  } catch (error: any) {
    return {
      error: error.message || "Error al crear el código rojo",
    };
  }
};
