"use server";
import { revalidatePath } from "next/cache";

import { isRoleValid } from "@/lib/auth";
import { CodeGreenService } from "@/services/codeGreen.service";
import { CodeGreenSchema, CodeGreenValues } from "@/schema";

export const createCodeGreen = async (codeGreenData: CodeGreenValues) => {
  const roleValid = await isRoleValid();

  if (roleValid) {
    return {
      error: roleValid.error,
    };
  }

  const validatedFields = CodeGreenSchema.safeParse(codeGreenData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors[0].message,
    };
  }

  try {
    await CodeGreenService.create(validatedFields.data);
    revalidatePath("/codeGreen");
    return {
      success: "Código verde creado correctamente",
    };
  } catch (error) {
    return {
      error: "Error desconocido al crear el código verde",
    };
  }
};
