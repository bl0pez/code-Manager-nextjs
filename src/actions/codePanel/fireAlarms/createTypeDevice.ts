"use server";
import { isRoleValid } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { CreateTypeDeviceSchema, CreateTypeDeviceValues } from "@/schema/index";

export const createTypeDevice = async (value: CreateTypeDeviceValues) => {
  const isRoleInvalid = await isRoleValid();

  if (!isRoleInvalid) {
    return {
      error: "No tienes permisos para realizar esta acción",
    };
  }

  const validatedFields = CreateTypeDeviceSchema.safeParse(value);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors[0].message,
    };
  }

  const { data } = validatedFields;

  try {
    await prisma.typeDevice.create({
      data,
    });

    revalidatePath("/adminPanel/firePanel");

    return {
      success: "Tipo de dispositivo creado correctamente",
    };
  } catch (error) {
    return {
      error: "Error desconocido al crear el tipo de dispositivo",
    };
  }
};
