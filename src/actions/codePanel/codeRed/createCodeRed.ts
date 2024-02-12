"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import z from "zod";
import { auth } from "@/auth.config";

const codeRedShema = z.object({
  createdAt: z.coerce.date(),
  location: z.string().min(2),
  informant: z.string().min(2),
  operator: z.string().min(2),
  firefightersCallTime: z.coerce.date().nullable().optional(),
  COERadialCommunication: z.boolean(),
});

type Props = z.infer<typeof codeRedShema>;

export const createCodeRed = async (codeRedData: Props) => {
  const session = await auth();
  if (!session?.user) {
    return {
      ok: false,
      error: "Debes iniciar sesión",
    };
  }

  const codeRedParsed = codeRedShema.safeParse(codeRedData);

  if (!codeRedParsed.success) {
    return {
      ok: false,
      message: "Todos los campos son requeridos",
    };
  }

  const {
    createdAt,
    location,
    informant,
    operator,
    firefightersCallTime,
    COERadialCommunication,
  } = codeRedParsed.data;

  try {
    await prisma.codeRed.create({
      data: {
        createdAt: new Date(createdAt),
        location: location,
        informant: informant,
        operator: operator,
        firefightersCallTime: firefightersCallTime,
        COERadialCommunication: COERadialCommunication,
      },
    });

    revalidatePath("/codeRed");
    return {
      ok: true,
      message: "Código rojo creado correctamente",
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "Error al crear el código rojo",
    };
  }
};
