"use server";

import { isAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CreateOperatorSchema, CreateOperatorValues } from "@/schema";
import { revalidatePath } from "next/cache";

export const createOperator = async (value: CreateOperatorValues) => {
  const isRoleValid = await isAdmin();

  if (!isRoleValid) {
    return {
      error: "No tienes permisos para realizar esta acción",
    };
  }

  const validatedFields = CreateOperatorSchema.safeParse(value);

  if (!validatedFields.success) {
    console.log(validatedFields.error.errors);

    return {
      error: validatedFields.error.errors[0].message,
    };
  }

  try {
    await prisma.operator.create({
      data: {
        fullName: validatedFields.data.fullName,
      },
    });

    revalidatePath("/adminPanel/operators");
    return {
      success: "Operador creado correctamente",
    };
  } catch (error) {
    return {
      error: "Error desconocido al crear el operador",
    };
  }
};
