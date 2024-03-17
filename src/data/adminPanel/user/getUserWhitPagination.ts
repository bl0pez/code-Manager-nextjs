import prisma from "@/lib/prisma";
import { createPagination } from "@/lib/createPagination";
import { PaginationOptions } from "@/services/interface";

export const getUserWhitPagination = async ({
  page = 1,
  take = 0,
}: PaginationOptions) => {
  try {
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
  } catch (error: any) {
    return null;
  }
};
