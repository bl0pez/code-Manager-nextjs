import prisma from "@/lib/prisma";
import { PaginationOptions } from "./interface";

export class CodeBlueService {
  public static async findAllCodeBlue({
    page = 1,
    take = 5,
  }: PaginationOptions) {
    const [count, codeBlue] = await Promise.all([
      prisma.codeBlue.count({}),
      prisma.codeBlue.findMany({
        take: take,
        skip: (page - 1) * take,
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    return {
      totalPages: Math.ceil(count / take),
      codeBlue: codeBlue,
      currentPage: page,
    };
  }
}
