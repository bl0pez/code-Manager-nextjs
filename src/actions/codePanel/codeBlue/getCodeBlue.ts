"use server";
import { redirect } from "next/navigation";
import { getCodeBlueWhitPagination } from "@/data/codePanel/codeBlue/getCodeBlueWhitPagination";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getCodeBlue = async ({
  page = 1,
  take = 5,
}: PaginationOptions) => {
  const codeBlue = await getCodeBlueWhitPagination({ page, take });

  if (!codeBlue) {
    redirect("/code-blue");
  }

  return codeBlue;
};
