"use server";
import { createPagination } from "@/lib/createPagination";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getCodeAirWhitPagination = async ({
  page = 1,
  take = 5,
}: PaginationOptions) => {
  try {
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
  } catch (error) {
    redirect("/codeAir");
  }
};
