import { z } from "zod";

const validations = {
  email: z.string().email({
    message: "Ingresa un correo electrónico válido",
  }),
  password: z.string().min(5, {
    message: "La contraseña debe tener al menos 5 caracteres",
  }),
};

export const LoginSchema = z.object({
  email: validations.email,
  password: validations.password,
});

export interface LoginValues extends z.infer<typeof LoginSchema> {}
