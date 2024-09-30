import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
    try {
        const prisma = new PrismaClient();
        const data = await prisma.artworks.findMany({
            select: {
                id: true,
                title: true,
                price: true,
                img: true,
                users: true
            },
            orderBy: {
                id: 'desc'
            }

        });
        return NextResponse.json({ status: 'Success', data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ status: 'failed', error: error.toString() }, { status: 401 })
    }
}