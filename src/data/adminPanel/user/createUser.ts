import prisma from "@/lib/prisma";
import { CreateUserValues } from "@/schema";

export const createUser = async (newUser: CreateUserValues) => {
  try {
    const user = await prisma.user.create({
      data: newUser,
    });

    return user;
  } catch (error) {
    return null;
  }
};
