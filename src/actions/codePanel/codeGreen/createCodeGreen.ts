"use server";
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import z from "zod";

const codeGreenShema = z.object({
  createdAt: z.string().min(2),
  location: z.string().min(2),
  event: z.string().min(2),
  police: z.coerce.boolean(),
  informant: z.string().min(2),
  operator: z.string().min(2),
});

export const createCodeGreen = async (
  prevState: string | undefined,
  formData: FormData
) => {
  const data = Object.fromEntries(formData);

  const codeGreenParsed = codeGreenShema.safeParse(data);

  const session = await auth();
  if (!session?.user) return "Debes iniciar sesión para hacer esto";

  if (!codeGreenParsed.success) return "Todos los campos son requeridos";

  const { createdAt, event, informant, location, operator, police } =
    codeGreenParsed.data;

  try {
    await prisma.codeGreen.create({
      data: {
        createdAt: new Date(createdAt),
        location: location,
        event: event,
        informant: informant,
        police: police,
        operator: operator,
      },
    });

    revalidatePath("/codeGreen");
    return "Código verde creado correctamente";
  } catch (error) {
    return "Error al crear el código verde";
  }

  // const session = await auth();

  // if (!session?.user) {
  //   return {
  //     error: "You must be logged in to do this",
  //   };
  // }

  // const data = Object.fromEntries(formData);
  // const codeGreenParsed = codeGreenShema.safeParse(data);

  // if (!codeGreenParsed.success) {
  //   return {
  //     ok: false,
  //     message: "Todos los campos son requeridos",
  //   };
  // }

  // const { createdAt, event, informant, location, operator, police } =
  //   codeGreenParsed.data;

  // try {
  //   await prisma.codeGreen.create({
  //     data: {
  //       createdAt: new Date(createdAt),
  //       location: location,
  //       event: event,
  //       informant: informant,
  //       police: police,
  //       operator: operator,
  //     },
  //   });

  //   revalidatePath("/codeGreen");
  //   return {
  //     ok: true,
  //     message: "Código verde creado correctamente",
  //   };
  // } catch (error) {
  //   return {
  //     ok: false,
  //     message: "Error al crear el código verde",
  //   };
  // }
};
