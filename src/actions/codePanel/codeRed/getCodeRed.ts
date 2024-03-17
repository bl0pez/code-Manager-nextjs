"use server";
import { redirect } from "next/navigation";
import { getCodeRedWhitPagination } from "@/data/codePanel/codeRed/getCodeRedWhitPagination";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getCodeRed = async ({ page = 1, take = 5 }: PaginationOptions) => {
  const codeRed = await getCodeRedWhitPagination({ page, take });

  if (!codeRed) {
    redirect("/codeRed");
  }

  return codeRed;
};
