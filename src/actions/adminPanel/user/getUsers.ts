"use server";
import { PaginationOptions } from "@/interfaces/interface";
import { getUserWhitPagination } from "@/data/adminPanel/user/getUserWhitPagination";

export const getUsers = async ({ page, take }: PaginationOptions) => {
  const users = await getUserWhitPagination({ page, take });
  return users;
};
