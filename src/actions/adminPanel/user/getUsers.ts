"use server";
import { PaginationOptions } from "@/services/interface";
import { getUserWhitPagination } from "@/data/adminPanel/user/getUserWhitPagination";

export const getUsers = async ({ page, take }: PaginationOptions) => {
  const users = await getUserWhitPagination({ page, take });
  return users;
};
