import prisma from "@/lib/prisma";
import { createPagination } from "@/lib/createPagination";
import { PaginationOptions } from "@/services/interface";

export const getCodeRedWhitPagination = async ({
  page = 1,
  take = 0,
}: PaginationOptions) => {
  const [codeRed, count] = await Promise.all([
    await prisma.codeRed.findMany({
      take,
      skip: (page - 1) * take,
      orderBy: {
        createdAt: "desc",
      },
    }),
    await prisma.codeRed.count(),
  ]);

  const { currentPage, nextPage, prevPage, totalPages } = createPagination({
    page,
    take,
    count,
  });

  return {
    currentPage,
    totalPages,
    codeRed,
    nextPage,
    prevPage,
  };
};
