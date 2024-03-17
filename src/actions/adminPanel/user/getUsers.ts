import { redirect } from "next/navigation";
import { PaginationOptions } from "@/services/interface";
import { getUserWhitPagination } from "@/data/adminPanel/user/getUserWhitPagination";

export const getUsers = async ({ page, take }: PaginationOptions) => {
  const users = await getUserWhitPagination({ page, take });

  if (!users) {
    return redirect("/adminPanel");
  }

  return users;
};
