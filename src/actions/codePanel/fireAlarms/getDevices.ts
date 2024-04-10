"use server";

import { createPagination } from "@/lib/createPagination";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
  search?: string;
  nodoId?: string;
}

export const getDevices = async ({
  nodoId,
  page = 1,
  search,
  take = 5,
}: PaginationOptions) => {
  const [devices, count] = await Promise.all([
    prisma.device.findMany({
      where: {
        AND: [
          {
            deviceId: {
              contains: search,
              mode: "insensitive",
            },
            nodoId: {
              equals: nodoId,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        nodo: true,
        typeDevice: true,
      },
      take,
      skip: (page - 1) * take,
    }),
    prisma.device.count({
      where: {
        AND: [
          {
            deviceId: {
              contains: search,
              mode: "insensitive",
            },
            nodoId: {
              equals: nodoId,
              mode: "insensitive",
            },
          },
        ],
      },
    }),
  ]);

  const { currentPage, nextPage, prevPage, totalPages } = createPagination({
    page,
    take,
    count,
  });

  return {
    currentPage,
    totalPages,
    devices,
    nextPage,
    prevPage,
  };
};
