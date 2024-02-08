"use server";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getCodeGreen = async ({
  page = 1,
  take = 5,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  const [totalCount, codeGreen] = await Promise.all([
    await prisma.codeGreen.count(),
    prisma.codeGreen.findMany({
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
    codeGreen: codeGreen,
  };
};
