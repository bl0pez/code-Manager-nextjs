import prisma from "@/lib/prisma";
import { CodeGreenValues } from "@/schema";

export class CodeGreenService {
  public static async create(values: CodeGreenValues) {
    try {
      const createCodeGreen = await prisma.codeGreen.create({
        data: {
          ...values,
        },
      });
      return createCodeGreen;
    } catch (error) {
      throw new Error("Error desconocido al crear el código verde");
    }
  }
}
