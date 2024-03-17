import { createPagination } from "@/lib/createPagination";
import prisma from "@/lib/prisma";
import { PaginationOptions } from "@/services/interface";

export const getCodeBlueWhitPagination = async ({
  page = 1,
  take = 0,
}: PaginationOptions) => {
  const [codeBlue, count] = await Promise.all([
    await prisma.codeBlue.findMany({
      take,
      skip: (page - 1) * take,
      orderBy: {
        createdAt: "desc",
      },
    }),
    await prisma.codeBlue.count(),
  ]);

  const { currentPage, nextPage, prevPage, totalPages } = createPagination({
    page,
    take,
    count,
  });

  return {
    currentPage: currentPage,
    totalPages: totalPages,
    codeBlue,
    nextPage,
    prevPage,
  };
};
