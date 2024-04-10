"use server";
import { isRoleValid } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CreateDeviceSchema, CreateDeviceValues } from "@/schema";
import { revalidatePath } from "next/cache";

export const createDevice = async (value: CreateDeviceValues) => {
  const isRoleInvalid = await isRoleValid();

  if (!isRoleInvalid) {
    return {
      error: "No tienes permisos para realizar esta acción",
    };
  }

  const validatedFields = CreateDeviceSchema.safeParse(value);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors[0].message,
    };
  }

  try {
    await prisma.device.create({
      data: {
        lazo: validatedFields.data.lazo.toLocaleUpperCase(),
        location: validatedFields.data.location,
        nodoId: validatedFields.data.nodoId,
        typeDeviceId: validatedFields.data.typeDeviceId,
        deviceId: validatedFields.data.deviceId.toLocaleUpperCase(),
      },
    });

    revalidatePath("/adminPanel/firePanel");

    return {
      success: "Dispositivo creado correctamente",
    };
  } catch (error) {
    return {
      error: "Error al crear el dispositivo",
    };
  }
};
