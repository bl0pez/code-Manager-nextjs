import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { authConfig } from "./auth.config";
import { comparePassword } from "./lib/passwordEncryption";
import { LoginSchema } from "./schema";
import { UserService } from "./services/user.service";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = LoginSchema.safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        const user = await UserService.findUserByEmail(email);

        if (!user) return null;

        const passwordsMatch = await comparePassword(password, user.password);

        if (!passwordsMatch) return null;

        const { password: _, ...userWithoutPassword } = user;

        return userWithoutPassword;
      },
    }),
  ],
});
