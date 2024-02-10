"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import z from "zod";
import { auth } from "@/auth.config";

const codeGreenShema = z.object({
  createdAt: z.coerce.date(),
  location: z.string().min(2),
  event: z.string().min(2),
  police: z.boolean(),
  informant: z.string().min(2),
  operator: z.string().min(2),
});

type Props = z.infer<typeof codeGreenShema>;

export const createCodeGreen = async (codeGreenData: Props) => {
  const session = await auth();
  if (!session?.user) {
    return {
      ok: false,
      error: "Debes iniciar sesión",
    };
  }

  const codeGreenParsed = codeGreenShema.safeParse(codeGreenData);

  if (!codeGreenParsed.success) {
    return {
      ok: false,
      message: "Todos los campos son requeridos",
    };
  }

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
    return {
      ok: true,
      message: "Código verde creado correctamente",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error al crear el código verde",
    };
  }
};
