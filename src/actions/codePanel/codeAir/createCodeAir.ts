"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import z from "zod";
import { auth } from "@/auth.config";

const codeAirShema = z.object({
  createdAt: z.coerce.date(),
  location: z.string().min(2),
  emergencyDetails: z.string().nullable(),
  operator: z.string().min(2),
  informant: z.string().min(2),
});

type Props = z.infer<typeof codeAirShema>;

export const createCodeAir = async (codeAirData: Props) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      error: "Debes iniciar sesión",
    };
  }

  const codeAirParsed = codeAirShema.safeParse(codeAirData);

  if (!codeAirParsed.success) {
    return {
      ok: false,
      message: `Código aéreo no válido: ${codeAirParsed.error.message}`,
    };
  }

  const { createdAt, emergencyDetails, operator, informant, location } =
    codeAirParsed.data;

  try {
    await prisma.codeAir.create({
      data: {
        createdAt: new Date(createdAt),
        emergencyDetails: emergencyDetails
          ? emergencyDetails.toLocaleLowerCase()
          : null,
        informant: informant.toLocaleLowerCase(),
        operator: operator,
        location: location.toLocaleLowerCase(),
      },
    });

    revalidatePath("/codeAir");
    return {
      ok: true,
      message: "Código aéreo creado",
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "Error al crear el código aéreo",
    };
  }
};
