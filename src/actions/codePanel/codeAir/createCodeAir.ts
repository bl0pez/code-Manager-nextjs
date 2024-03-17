"use server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/auth";
import { CodeAirSchema, CodeAirValues } from "@/schema";
import prisma from "@/lib/prisma";

export const createCodeAir = async (codeAirData: CodeAirValues) => {
  const isRoleValid = await isAdmin();

  if (!isRoleValid) {
    return {
      error: "No tienes permisos para realizar esta acción",
    };
  }

  const validatedFields = CodeAirSchema.safeParse(codeAirData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors[0].message,
    };
  }

  try {
    await prisma.codeAir.create({
      data: codeAirData,
    });

    revalidatePath("/codeAir");
    return {
      success: "Código aéreo creado correctamente",
    };
  } catch (error: any) {
    return {
      error: error.message || "Error al crear el código aereo",
    };
  }
};
