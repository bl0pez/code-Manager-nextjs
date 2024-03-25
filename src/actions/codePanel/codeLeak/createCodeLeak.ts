"use server";
import { revalidatePath } from "next/cache";
import { isRoleValid } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CodeLeakSchema, CodeLeakValues } from "@/schema";

export const createCodeLeak = async (codeLeakData: CodeLeakValues) => {
  const isRoleInvalid = await isRoleValid();

  if (!isRoleInvalid) {
    return {
      error: "No tienes permisos para realizar esta acción",
    };
  }

  const validatedFields = CodeLeakSchema.safeParse(codeLeakData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors[0].message,
    };
  }

  try {
    await prisma.codeLeak.create({
      data: codeLeakData,
    });

    revalidatePath("/codeLeak");
    return {
      success: "Código de fuga creado correctamente",
    };
  } catch (error: any) {
    return {
      error: error.message || "Error al crear el código de fuga",
    };
  }
};
