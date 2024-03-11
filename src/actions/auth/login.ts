"use server";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { LoginValues } from "@/schema";

export const login = async (values: LoginValues) => {
  const formData = new FormData();
  formData.append("email", values.email);
  formData.append("password", values.password);
  try {
    await signIn("credentials", Object.fromEntries(formData));
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Credenciales incorrectas",
          };
        default:
          return { error: "Error desconocido" };
      }
    }

    throw error;
  }
};
