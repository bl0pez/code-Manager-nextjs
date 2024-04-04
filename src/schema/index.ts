import { Role } from "@prisma/client";
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
  location: z.string().min(3, {
    message: "Ingresa una ubicación válida",
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
  location: validations.location,
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

export const CodeRedSchema = z.object({
  createdAt: validations.createdAt,
  informant: z.string({
    invalid_type_error: "Ingresa un nombre válido",
    required_error: "Ingresa un nombre",
  }),
  location: z.string({
    invalid_type_error: "Ingresa una ubicación válida",
    required_error: "Ingresa una ubicación",
  }),
  operator: validations.operator,
  firefightersCallTime: z.string().datetime().optional(),
  COERadialCommunication: z.boolean(),
});

export interface CodeRedValues extends z.infer<typeof CodeRedSchema> {}

export const CodeAirSchema = z.object({
  createdAt: z.date({
    invalid_type_error: "Ingresa una fecha y hora válida",
    required_error: "Ingresa una fecha y hora",
  }),
  location: z.string({
    invalid_type_error: "Ingresa una ubicación válida",
    required_error: "Ingresa una ubicación",
  }),
  emergencyDetails: z.string().optional(),
  informant: z.string({
    invalid_type_error: "Ingresa un nombre válido",
    required_error: "Ingresa un nombre",
  }),
  operator: validations.operator,
});

export interface CodeAirValues extends z.infer<typeof CodeAirSchema> {}

export const CodeLeakSchema = z.object({
  createdAt: z.date(),
  informant: z.string(),
  patient_description: z
    .string({
      invalid_type_error: "Ingresa una descripción válida",
      required_error: "Ingresa una descripción",
    })
    .min(5, {
      message: "Mínimo 5 caracteres",
    }),
  operator: validations.operator,
  service: z.string().min(3, {
    message: "Ingresa un servicio válido",
  }),
});

export interface CodeLeakValues extends z.infer<typeof CodeLeakSchema> {}

export const CreateUserSchema = z.object({
  email: validations.email,
  fullName: z.string().min(3, {
    message: "Ingresa un nombre válido",
  }),
  password: validations.password,
  role: z.enum([Role.admin, Role.operator, Role.user]),
});

export interface CreateUserValues extends z.infer<typeof CreateUserSchema> {}

export const CreateOperatorSchema = z.object({
  fullName: z.string().min(3, {
    message: "Ingresa un nombre válido",
  }),
});

export interface CreateOperatorValues
  extends z.infer<typeof CreateOperatorSchema> {}
