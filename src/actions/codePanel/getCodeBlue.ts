"use server";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getCodeBlue = async ({
  page = 1,
  take = 10,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  const [totalCount, codeBlue] = await Promise.all([
    prisma.codeBlue.count({}),
    prisma.codeBlue.findMany({
      take: take,
      skip: (page - 1) * take,
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / take);

  return {
    currentPage: page,
    totalPages: totalPages,
    codeBlue: codeBlue,
  };
};
