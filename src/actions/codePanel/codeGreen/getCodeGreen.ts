"use server";
import { redirect } from "next/navigation";
import { getCodeGreenWhitPagination } from "@/data/codePanel/codeGreen/getCodeGreenWhitPagination";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getCodeGreen = async ({
  page = 1,
  take = 5,
}: PaginationOptions) => {
  const codeGreen = await getCodeGreenWhitPagination({ page, take });

  if (!codeGreen) {
    redirect("/codeGreen");
  }

  return codeGreen;
};
