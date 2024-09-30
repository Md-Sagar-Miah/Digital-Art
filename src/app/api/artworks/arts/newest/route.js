import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export const GET = async (req, res) => {
    try {
        const prisma = new PrismaClient();
        const data = await prisma.artworks.findMany({
            take: 20,
            select: {
                id: true,
                title: true,
                img: true,
                price: true,
                users: true
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