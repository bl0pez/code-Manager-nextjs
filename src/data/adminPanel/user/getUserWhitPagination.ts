import prisma from "@/lib/prisma";
import { createPagination } from "@/lib/createPagination";
import { PaginationOptions } from "@/interfaces/interface";

export const getUserWhitPagination = async ({
  page = 1,
  take = 0,
}: PaginationOptions) => {
  const [users, count] = await Promise.all([
    await prisma.user.findMany({
      take,
      skip: (page - 1) * take,
    }),
    await prisma.user.count(),
  ]);

  const { currentPage, nextPage, prevPage, totalPages } = createPagination({
    page,
    take,
    count,
  });

  return {
    currentPage,
    totalPages,
    users,
    nextPage,
    prevPage,
  };
};
