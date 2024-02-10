"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import z from "zod";
import { auth } from "@/auth.config";

const codeBlueShema = z.object({
  createdAt: z.string().min(2),
  team: z.string().min(2),
  location: z.string().min(2),
  operator: z.string().min(2),
  informant: z.string().min(2),
});

type Props = z.infer<typeof codeBlueShema>;

export const createCodeBlue = async (codeBlueData: Props) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      error: "Debes iniciar sesión",
    };
  }

  const codeBlueParsed = codeBlueShema.safeParse(codeBlueData);

  if (!codeBlueParsed.success) {
    return {
      ok: false,
      message: "Todos los campos son requeridos",
    };
  }

  const { createdAt, team, location, operator, informant } =
    codeBlueParsed.data;

  try {
    await prisma.codeBlue.create({
      data: {
        createdAt: new Date(createdAt),
        team: team,
        location: location.toLocaleLowerCase(),
        operator: operator,
        informant: informant.toLocaleLowerCase(),
      },
    });

    revalidatePath("/codeBlue");
    return {
      ok: true,
      message: "Código azul creado con éxito",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error al crear el código azul",
    };
  }
};
