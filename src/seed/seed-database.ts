import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  await prisma.user.deleteMany();
  await prisma.operator.deleteMany();
  await prisma.team.deleteMany();

  const { users, operators, teams } = initialData;

  await prisma.user.createMany({
    data: users,
  });

  await prisma.operator.createMany({
    data: operators,
  });

  await prisma.team.createMany({
    data: teams,
  });

  console.log("Seed ejecutado correctamente");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
