import { createPagination } from "@/lib/createPagination";
import prisma from "@/lib/prisma";
import { PaginationOptions } from "@/services/interface";

export const getCodeGreenWhitPagination = async ({
  page = 1,
  take = 0,
}: PaginationOptions) => {
  const [codeGreen, count] = await Promise.all([
    await prisma.codeGreen.findMany({
      take,
      skip: (page - 1) * take,
    }),
    await prisma.codeGreen.count(),
  ]);

  const { currentPage, nextPage, prevPage, totalPages } = createPagination({
    page,
    take,
    count,
  });

  return {
    currentPage: currentPage,
    totalPages: totalPages,
    codeGreen: codeGreen,
    nextPage,
    prevPage,
  };
};
