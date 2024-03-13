"use server";
import { revalidatePath } from "next/cache";
import { CodeBlueSchema, CodeBlueValues } from "@/schema";
import { isRoleValid } from "@/lib/auth";

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
    revalidatePath("/codeBlue");
    return {
      success: "Código azul creado correctamente",
    };
  } catch (error) {
    return {
      error: "Error desconocido al crear el código azul",
    };
  }
};
