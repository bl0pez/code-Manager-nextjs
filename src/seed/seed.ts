import { CodeBlue } from "@prisma/client";
import bcryptjs from "bcryptjs";

interface SeedUser {
  email: string;
  password: string;
  fullName: string;
  isActive: boolean;
  role: "admin" | "operator" | "user";
}

interface SeedOperator {
  fullName: string;
}

interface SeedTeam {
  title: string;
}

type SeedCodeBlue = Omit<CodeBlue, "id">;

interface SeedData {
  users: SeedUser[];
  operators: SeedOperator[];
  teams: SeedTeam[];
}

export const initialData: SeedData = {
  users: [
    {
      email: "prueba@gmail.com",
      password: bcryptjs.hashSync("12345678"),
      fullName: "Prueba",
      isActive: true,
      role: "admin",
    },
    {
      email: "prueba1@gmail.com",
      password: bcryptjs.hashSync("12345678"),
      fullName: "Prueba1",
      isActive: true,
      role: "operator",
    },
    {
      email: "prueba2@gmail.com",
      password: bcryptjs.hashSync("12345678"),
      fullName: "Prueba2",
      isActive: true,
      role: "user",
    },
  ],
  operators: [
    {
      fullName: "Bryan Lopez",
    },
    {
      fullName: "Ignacio Huerta",
    },
    {
      fullName: "Alexander Leiton",
    },
  ],
  teams: [
    {
      title: "Urgencia",
    },
    {
      title: "Uci",
    },
    {
      title: "Uci Pediatrica",
    },
  ],
};
