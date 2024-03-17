import { revalidatePath } from "next/cache";
import { PaginationOptions } from "@/services/interface";
import { getUserWhitPagination } from "@/data/adminPanel/user/getUserWhitPagination";
import { isAdmin } from "@/lib/auth";

export const getUsers = async ({ page, take }: PaginationOptions) => {
  const isRoleValid = await isAdmin();

  if (!isRoleValid) {
    return {
      error: "No tienes permisos para realizar esta acción",
    };
  }

  const users = await getUserWhitPagination({ page, take });

  if (!users) {
    return revalidatePath("/adminPanel");
  }

  return users;
};
