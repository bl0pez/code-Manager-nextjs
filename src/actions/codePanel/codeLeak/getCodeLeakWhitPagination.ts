"use server";
import prisma from "@/lib/prisma";
import { createPagination } from "@/lib/createPagination";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getCodeLeakWhitPagination = async ({
  page = 1,
  take = 5,
}: PaginationOptions) => {
  const [codeLeak, count] = await Promise.all([
    await prisma.codeLeak.findMany({
      take,
      skip: (page - 1) * take,
      orderBy: {
        createdAt: "desc",
      },
    }),
    await prisma.codeLeak.count(),
  ]);

  const { currentPage, nextPage, prevPage, totalPages } = createPagination({
    page,
    take,
    count,
  });

  return {
    currentPage,
    totalPages,
    codeLeak,
    nextPage,
    prevPage,
  };
};
