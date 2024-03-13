"use server";
import { CodeBlueService } from "@/services/codeBlue.service";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getCodeBlue = async ({
  page = 1,
  take = 5,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  return await CodeBlueService.findAllCodeBlue({ page, take });
};
