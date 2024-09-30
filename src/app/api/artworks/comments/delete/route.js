import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export const POST = async (req, res) => {
    try {
        const reqBody = await req.json()
        const prisma = new PrismaClient()
        const result = await prisma.comments.delete({
            where: {
                id: reqBody.id,
                userId: reqBody.userId,
                artId: reqBody.artId
            }
        })
        return NextResponse.json({ status: "Success", result }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ status: "Failed", error: error.toString() }, { status: 400 })
    }
}