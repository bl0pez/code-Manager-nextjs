"use server";
import prisma from "@/lib/prisma";

interface Code {
  id: string;
  createdAt: Date;
}

export const getAllCode = async () => {
  const [codeAir, codeBlue, CodeGreen, codeRed] = await Promise.all([
    prisma.codeAir.findMany({
      select: {
        id: true,
        createdAt: true,
      },
    }),
    prisma.codeBlue.findMany({
      select: {
        id: true,
        createdAt: true,
      },
    }),
    prisma.codeGreen.findMany({
      select: {
        id: true,
        createdAt: true,
      },
    }),
    prisma.codeRed.findMany({
      select: {
        id: true,
        createdAt: true,
      },
    }),
  ]);

  function countDataByMonth(data: Code[]): { [month: string]: number } {
    const dataByMonth: { [month: string]: number } = {};

    // Inicializar todos los meses con un contador de 0
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    months.forEach((month) => {
      dataByMonth[month] = 0;
    });

    // Iterar sobre cada objeto en el array
    data.forEach((item) => {
      // Obtener el nombre del mes del createdAt
      const monthName = new Date(item.createdAt).toLocaleString("en-US", {
        month: "long",
      });

      // Incrementar el contador del mes correspondiente
      dataByMonth[monthName]++;
    });

    return dataByMonth;
  }

  function getValuesFromObject(obj: Record<string, any>): any[] {
    return Object.entries(obj).map(([key, value]) => {
      return value;
    });
  }

  return {
    codeAir: getValuesFromObject(countDataByMonth(codeAir)),
    codeBlue: getValuesFromObject(countDataByMonth(codeBlue)),
    CodeGreen: getValuesFromObject(countDataByMonth(CodeGreen)),
    codeRed: getValuesFromObject(countDataByMonth(codeRed)),
  };
};
