"use server";
import { createUser } from "@/data/adminPanel/user/createUser";
import { CreateUserSchema, CreateUserValues } from "@/schema";
import { findUserByEmail } from "@/data/adminPanel/user/findUserByEmail";
import { isAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const newUser = async (user: CreateUserValues) => {
  const isRoleValid = await isAdmin();

  if (!isRoleValid) {
    return {
      error: "No tienes permisos para realizar esta acción",
    };
  }

  const userExists = await findUserByEmail(user.email);

  if (userExists) {
    return {
      error: "Correo electrónico ya registrado",
    };
  }

  const validatedFields = CreateUserSchema.safeParse(user);

  if (!validatedFields.success) {
    console.log(validatedFields.error.errors);

    return {
      error: validatedFields.error.errors[0].message,
    };
  }

  const newUser = await createUser(validatedFields.data);

  if (!newUser) {
    return {
      error: "Error desconocido al crear el usuario",
    };
  }

  revalidatePath("/adminPanel");
  return {
    success: "Usuario creado correctamente",
  };
};
