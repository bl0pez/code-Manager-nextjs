"use server";
import { isRoleValid } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CreateNodoSchema, CreateNodoValues } from "@/schema";
import { revalidatePath } from "next/cache";

export const createNodo = async (value: CreateNodoValues) => {
  const isRoleInvalid = await isRoleValid();

  if (!isRoleInvalid) {
    return {
      error: "No tienes permisos para realizar esta acción",
    };
  }

  const validatedFields = CreateNodoSchema.safeParse(value);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors[0].message,
    };
  }

  const { data } = validatedFields;

  try {
    await prisma.nodo.create({
      data,
    });

    revalidatePath("/adminPanel/firePanel");

    return {
      success: "Nodo creado correctamente",
    };
  } catch (error) {
    return {
      error: "Error desconocido al crear el nodo",
    };
  }
};
