import { z } from "zod";

const validations = {
  email: z.string().email({
    message: "Ingresa un correo electrónico válido",
  }),
  password: z.string().min(5, {
    message: "La contraseña debe tener al menos 5 caracteres",
  }),
  operator: z.string().min(4, {
    message: "Selecciona un operador válido",
  }),
  createdAt: z.coerce.date({
    required_error: "Ingresa una fecha y hora válida",
    invalid_type_error: "Ingresa una fecha y hora válida",
  }),
};

export const LoginSchema = z.object({
  email: validations.email,
  password: validations.password,
});

export interface LoginValues extends z.infer<typeof LoginSchema> {}

export const CodeBlueSchema = z.object({
  createdAt: validations.createdAt,
  informant: z.string(),
  location: z.string(),
  operator: validations.operator,
  team: z.string().min(3, {
    message: "Selecciona un equipo válido",
  }),
});

export interface CodeBlueValues extends z.infer<typeof CodeBlueSchema> {}

export const CodeGreenSchema = z.object({
  createdAt: validations.createdAt,
  event: z.string(),
  informant: z.string(),
  location: z.string(),
  operator: validations.operator,
  police: z.boolean(),
});

export interface CodeGreenValues extends z.infer<typeof CodeGreenSchema> {}
