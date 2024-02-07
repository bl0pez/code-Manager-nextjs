import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      fullName: string;
      role: string;
      isActive: boolean;
    } & DefaultSession["user"];
  }
}
