'use server';

import prisma from "@/lib/prisma";

export const getOperators = async() => {

    const operatos = await prisma.operator.findMany({
        orderBy: {
            fullName: 'asc'
        }
    });

    return {
        operatos
    };

}