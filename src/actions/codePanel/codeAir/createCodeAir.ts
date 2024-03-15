"use server";
import { revalidatePath } from "next/cache";
import { isRoleValid } from "@/lib/auth";
import { CodeAirSchema, CodeAirValues, CodeRedSchema } from "@/schema";
import { CodeAirService } from "@/services/codeAir.service";

export const createCodeAir = async (codeAirData: CodeAirValues) => {
  const roleValid = await isRoleValid();

  if (roleValid) {
    return {
      error: roleValid.error,
    };
  }

  const validatedFields = CodeAirSchema.safeParse(codeAirData);

  if (!validatedFields.success) {
    console.log(validatedFields.error.errors);

    return {
      error: validatedFields.error.errors[0].message,
    };
  }

  try {
    await CodeAirService.create(validatedFields.data);
    revalidatePath("/codeAir");
    return {
      success: "Código rojo creado correctamente",
    };
  } catch (error) {
    return {
      error: "Error desconocido al crear el código rojo",
    };
  }
};
