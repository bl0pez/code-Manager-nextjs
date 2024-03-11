import prisma from "@/lib/prisma";

export class UserService {
  public static async findUserById(id: string) {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  public static async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }
}
