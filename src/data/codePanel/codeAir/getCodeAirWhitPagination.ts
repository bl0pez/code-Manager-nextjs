import prisma from "@/lib/prisma";
import { createPagination } from "@/lib/createPagination";
import { PaginationOptions } from "@/interfaces/interface";

export const getCodeAirWhitPagination = async ({
  page = 1,
  take = 0,
}: PaginationOptions) => {
  const [codeAir, count] = await Promise.all([
    await prisma.codeAir.findMany({
      take,
      skip: (page - 1) * take,
      orderBy: {
        createdAt: "desc",
      },
    }),
    await prisma.codeAir.count(),
  ]);

  const { currentPage, nextPage, prevPage, totalPages } = createPagination({
    page,
    take,
    count,
  });

  return {
    currentPage,
    totalPages,
    codeAir,
    nextPage,
    prevPage,
  };
};
