"use server";
import { revalidatePath } from "next/cache";
import { isRoleValid } from "@/lib/auth";
import { CodeRedSchema, CodeRedValues } from "@/schema";
import { CodeRedService } from "@/services/codeRed.service";

export const createCodeRed = async (codeRedData: CodeRedValues) => {
  const roleValid = await isRoleValid();

  if (roleValid) {
    return {
      error: roleValid.error,
    };
  }

  const validatedFields = CodeRedSchema.safeParse(codeRedData);

  if (!validatedFields.success) {
    console.log(validatedFields.error.errors);

    return {
      error: validatedFields.error.errors[0].message,
    };
  }

  try {
    await CodeRedService.create(validatedFields.data);
    revalidatePath("/codeRed");
    return {
      success: "Código rojo creado correctamente",
    };
  } catch (error) {
    return {
      error: "Error desconocido al crear el código rojo",
    };
  }
};
