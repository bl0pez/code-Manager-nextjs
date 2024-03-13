import prisma from "@/lib/prisma";
import { PaginationOptions } from "./interface";
import { CodeBlueValues } from "@/schema";

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

  public static async create(values: CodeBlueValues) {
    try {
      const createCodeBlue = await prisma.codeBlue.create({
        data: {
          ...values,
        },
      });
      return createCodeBlue;
    } catch (error) {
      throw new Error("Error desconocido al crear el código verde");
    }
  }
}
