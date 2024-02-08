"use server";
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import z from "zod";

const codeBlueShema = z.object({
  createdAt: z.string().min(2),
  team: z.string().min(2),
  location: z.string().min(2),
  operator: z.string().min(2),
  officer: z.string().min(2),
});

export const createCodeBlue = async (formData: FormData) => {
  const session = await auth();

  if (!session?.user) {
    return {
      error: "You must be logged in to do this",
    };
  }

  const data = Object.fromEntries(formData);
  const codeBlueParsed = codeBlueShema.safeParse(data);

  if (!codeBlueParsed.success) {
    return {
      ok: false,
      message: "Todos los campos son requeridos",
    };
  }

  const { createdAt, team, location, operator, officer } = codeBlueParsed.data;

  try {
    await prisma.codeBlue.create({
      data: {
        createdAt: new Date(createdAt),
        team: team,
        location: location,
        operator: operator,
        officer: officer,
      },
    });

    revalidatePath("/codePanel");
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
