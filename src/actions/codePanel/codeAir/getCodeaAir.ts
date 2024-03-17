"use server";
import { redirect } from "next/navigation";
import { getCodeAirWhitPagination } from "@/data/codePanel/codeAir/getCodeAirWhitPagination";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getCodeAir = async ({ page = 1, take = 5 }: PaginationOptions) => {
  const codeAir = await getCodeAirWhitPagination({ page, take });

  if (!codeAir) {
    redirect("/codeAir");
  }

  return codeAir;
};
