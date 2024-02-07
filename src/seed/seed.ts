import bcryptjs from "bcryptjs";

interface SeedUser {
  email: string;
  password: string;
  fullName: string;
  isActive: boolean;
  role: "admin" | "operator" | "user";
}

interface SeedData {
  users: SeedUser[];
}

export const initialData: SeedData = {
  users: [
    {
      email: "prueba@gmail.com",
      password: bcryptjs.hashSync("123456"),
      fullName: "Prueba",
      isActive: true,
      role: "admin",
    },
    {
      email: "prueba1@gmail.com",
      password: bcryptjs.hashSync("123456"),
      fullName: "Prueba1",
      isActive: true,
      role: "operator",
    },
    {
      email: "prueba2@gmail.com",
      password: bcryptjs.hashSync("123456"),
      fullName: "Prueba2",
      isActive: true,
      role: "user",
    },
  ],
};
