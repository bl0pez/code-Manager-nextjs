'use server';

import prisma from "@/lib/prisma";

export const getCodeBlueTeams = async() => {
    const teams = await prisma.team.findMany()

  return {
    teams
  }

}
