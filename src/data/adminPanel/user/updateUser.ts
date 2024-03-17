import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

interface Props {
  data: Partial<Omit<User, "id">>;
  userId: string;
}

export const updateUser = async ({ data, userId }: Props) => {
  try {
    const updateUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });

    return updateUser;
  } catch (error) {
    return null;
  }
};
