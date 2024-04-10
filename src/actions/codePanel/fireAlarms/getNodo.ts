"use server";
import prisma from "@/lib/prisma";

export const getNodoAndTypeDevice = async () => {
  const [nodos, typeDevices] = await Promise.all([
    prisma.nodo.findMany(),
    prisma.typeDevice.findMany(),
  ]);

  return {
    nodos,
    typeDevices,
  };
};
