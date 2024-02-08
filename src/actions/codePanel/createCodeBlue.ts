"use server";
import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

interface Props {
createdAt: Date
team: string
location: string
operator: string
officer: string
}

export const createCodeBlue = async( formData: FormData) => {

    const session = await auth();
    
    if (!session?.user) {
        return {
            error: "You must be logged in to do this"
        }
    }

    try {
        await prisma.codeBlue.create({
            data: {
                createdAt: new Date(formData.get("createdAt") as string),
                team: formData.get("team") as string,
                location: formData.get("location") as string,
                operator: formData.get("operator") as string,
                officer: formData.get("officer") as string,
            }
        })

        revalidatePath("/codePanel")
        return {
            message: "Código azul creado con éxito"
        }
        
    } catch (error) {
        return {
            message: "Error al crear el código azul"
        }
    }



}
