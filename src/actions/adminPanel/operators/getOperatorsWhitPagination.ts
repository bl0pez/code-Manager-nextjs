"use server";
import prisma from "@/lib/prisma";
import { createPagination } from "@/lib/createPagination";
import { PaginationOptions } from "@/services/interface";

export const getOperatorsWhitPagination = async ({
  page = 1,
  take = 0,
}: PaginationOptions) => {
  const [operators, count] = await Promise.all([
    await prisma.operator.findMany({
      take,
      skip: (page - 1) * take,
    }),
    await prisma.operator.count(),
  ]);

  const { currentPage, nextPage, prevPage, totalPages } = createPagination({
    page,
    take,
    count,
  });

  return {
    currentPage,
    totalPages,
    operators,
    nextPage,
    prevPage,
  };
};
