"use server";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getCodeAir = async ({ page = 1, take = 5 }: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  const [totalCount, codeAir] = await Promise.all([
    await prisma.codeAir.count(),
    prisma.codeAir.findMany({
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
    codeAir: codeAir,
  };
};
