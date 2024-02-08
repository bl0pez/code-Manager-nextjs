'use server';
import prisma from "@/lib/prisma";

export const getCodeBlue = async() => {
    const codeBlue = await prisma.codeBlue.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })

  return {
    codeBlue
  }

}
