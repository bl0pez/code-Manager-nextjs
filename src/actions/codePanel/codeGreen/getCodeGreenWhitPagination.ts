"use server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { createPagination } from "@/lib/createPagination";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getCodeGreenWhitPagination = async ({
  page = 1,
  take = 5,
}: PaginationOptions) => {
  try {
    const [codeGreen, count] = await Promise.all([
      await prisma.codeGreen.findMany({
        take,
        skip: (page - 1) * take,
        orderBy: {
          createdAt: "desc",
        },
      }),
      await prisma.codeGreen.count(),
    ]);

    const { currentPage, nextPage, prevPage, totalPages } = createPagination({
      page,
      take,
      count,
    });

    return {
      currentPage: currentPage,
      totalPages: totalPages,
      codeGreen: codeGreen,
      nextPage,
      prevPage,
    };
  } catch (error) {
    redirect("/codeGreen");
  }
};
