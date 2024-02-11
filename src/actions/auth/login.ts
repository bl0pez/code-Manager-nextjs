"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth.config";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

type Props = z.infer<typeof loginSchema>;

export async function authenticate(loginData: Props) {
  const loginParsed = loginSchema.safeParse(loginData);

  if (!loginParsed.success) {
    return {
      ok: false,
      message: "Todos los campos son requeridos y el correo debe ser válido",
    };
  }

  try {
    await signIn("credentials", {
      ...loginParsed.data,
      redirect: false,
    });
    
    return {
      ok: true,
      message: "Inicio de sesión exitoso",
    };
  } catch (error) {

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            ok: false,
            message: "Credenciales inválidas",
          };
        default:
          return {
            ok: false,
            message: "Error desconocido",
          };
      }
    }

    return {
      ok: false,
      message: "Error desconocido",
    };
  }
}
