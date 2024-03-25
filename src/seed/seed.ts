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
  codeBlue: SeedCodeBlue[];
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
  codeBlue: [
    {
      createdAt: new Date("2024-01-15T00:00:00.000Z"),
      location: "Urgencia",
      operator: "Bryan Lopez",
      team: "Urgencia",
      informant: "Jhon Doe",
    },

    {
      createdAt: new Date("2024-02-10T00:00:00.000Z"),
      location: "Urgencia",
      operator: "Ignacio Huerta",
      team: "Urgencia",
      informant: "Jhon Doe",
    },

    {
      createdAt: new Date("2024-03-05T00:00:00.000Z"),
      location: "Cirugia 4 piso",
      operator: "Alexander Leiton",
      team: "Uci",
      informant: "Jhon Doe",
    },

    {
      createdAt: new Date("2024-01-22T00:00:00.000Z"),
      location: "Urgencia",
      operator: "Bryan Lopez",
      team: "Urgencia",
      informant: "Jhon Doe",
    },

    {
      createdAt: new Date("2024-02-20T00:00:00.000Z"),
      location: "Urgencia",
      operator: "Ignacio Huerta",
      team: "Urgencia",
      informant: "Jhon Doe",
    },

    {
      createdAt: new Date("2024-03-12T00:00:00.000Z"),
      location: "Medicina",
      operator: "Alexander Leiton",
      team: "Uci",
      informant: "Jhon Doe",
    },
  ],
};
