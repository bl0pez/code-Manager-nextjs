"use server";

import prisma from "@/lib/prisma";

export const getOperators = async () => {
  const operators = await prisma.operator.findMany({
    orderBy: {
      fullName: "asc",
    },
  });

  return {
    operators,
  };
};
