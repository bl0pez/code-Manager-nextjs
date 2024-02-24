"use server";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getUsers = async ({ page = 1, take = 5 }: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  const [totalCount, user] = await Promise.all([
    await prisma.user.count(),
    prisma.user.findMany({
      take: take,
      skip: (page - 1) * take,
      orderBy: {
        fullName: "asc",
      },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / take);

  return {
    currentPage: page,
    totalPages: totalPages,
    users: user,
  };
};
