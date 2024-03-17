import { getUsersWithPagination } from "@/core/use-cases/users/getUsers.use-case";
import { PaginationOptions } from "@/services/interface";

export class UserService {
  public static async getUsers({ page, take }: PaginationOptions) {
    return getUsersWithPagination({ page, take });
  }
}
