import prisma from "@/lib/prisma";
import { PaginationOptions } from "./interface";
import { CodeAirValues } from "@/schema";

export class CodeAirService {
  public static async findAllCodeAir({
    page = 1,
    take = 5,
  }: PaginationOptions) {
    const [count, codeAir] = await Promise.all([
      prisma.codeAir.count({}),
      prisma.codeAir.findMany({
        take: take,
        skip: (page - 1) * take,
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    return {
      totalPages: Math.ceil(count / take),
      codeAir: codeAir,
      currentPage: page,
    };
  }

  public static async create(values: CodeAirValues) {
    try {
      const createCodeAir = await prisma.codeAir.create({
        data: {
          ...values,
        },
      });
      return createCodeAir;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
