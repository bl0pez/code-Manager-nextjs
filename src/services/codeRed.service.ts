import prisma from "@/lib/prisma";
import { PaginationOptions } from "./interface";
import { CodeRedValues } from "@/schema";

export class CodeRedService {
  public static async findAll({ page = 1, take = 5 }: PaginationOptions) {
    const [count, codeRed] = await Promise.all([
      prisma.codeRed.count({}),
      prisma.codeRed.findMany({
        take: take,
        skip: (page - 1) * take,
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    return {
      totalPages: Math.ceil(count / take),
      codeRed: codeRed,
      currentPage: page,
    };
  }

  public static async create(values: CodeRedValues) {
    try {
      const createCodeRed = await prisma.codeRed.create({
        data: {
          ...values,
        },
      });
      return createCodeRed;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
