import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export const GET = async (req, res) => {
    try {
        const prisma = new PrismaClient();
        const data = await prisma.users.findMany({
            take: 20,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                img: true,
            },
            orderBy: {
                id: "desc"
            }
        })
        return NextResponse.json({ status: "Success", data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ status: "Failed", error: error.toString() }, { status: 401 })
    }
}