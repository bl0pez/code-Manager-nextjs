"use server";
import prisma from "@/lib/prisma";

export const getAllCodeAir = async () => {
  const codeAir = await prisma.codeAir.findMany();

  const codeAirMapped = codeAir.map((item) => ({
    "Fecha/Hora": new Date(item.createdAt).toLocaleString(),
    "Lugar del evento": item.location,
    "Detalle de la emergencia": item.emergencyDetails,
    "Funcionario que informa": item.informant,
    Operador: item.operator,
  }));

  return codeAirMapped;
};
