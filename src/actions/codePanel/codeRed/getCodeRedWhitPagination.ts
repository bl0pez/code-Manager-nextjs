"use server";
import { createPagination } from "@/lib/createPagination";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getCodeRedWhitPagination = async ({
  page = 1,
  take = 5,
}: PaginationOptions) => {
  try {
    const [codeRed, count] = await Promise.all([
      await prisma.codeRed.findMany({
        take,
        skip: (page - 1) * take,
        orderBy: {
          createdAt: "desc",
        },
      }),
      await prisma.codeRed.count(),
    ]);

    const { currentPage, nextPage, prevPage, totalPages } = createPagination({
      page,
      take,
      count,
    });

    return {
      currentPage,
      totalPages,
      codeRed,
      nextPage,
      prevPage,
    };
  } catch (error) {
    redirect("/codeRed");
  }
};
