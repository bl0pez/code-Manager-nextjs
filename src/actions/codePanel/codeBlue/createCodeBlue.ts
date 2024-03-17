"use server";
import { revalidatePath } from "next/cache";
import { CodeBlueSchema, CodeBlueValues } from "@/schema";
import { isRoleValid } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const createCodeBlue = async (codeBlueVelues: CodeBlueValues) => {
  const roleValid = await isRoleValid();

  if (roleValid) {
    return {
      error: roleValid.error,
    };
  }

  const validatedFields = CodeBlueSchema.safeParse(codeBlueVelues);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors[0].message,
    };
  }

  try {
    await prisma.codeBlue.create({
      data: codeBlueVelues,
    });

    revalidatePath("/codePanel/codeBlue");
    return {
      success: "Código azul creado correctamente",
    };
  } catch (error: any) {
    return {
      error: error.message || "Error al crear el código azul",
    };
  }
};
