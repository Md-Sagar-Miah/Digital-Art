import { PrismaClient } from "@prisma/client";

const { NextResponse } = require("next/server")

export const GET = async (req, res) => {
    try {
        const prisma = new PrismaClient();
        const data = await prisma.artworks.findMany({
            take: 10,
            select: {
                id: true,
                title: true,
                img: true,
            },
            orderBy: {
                id: 'desc'
            }
        })
        return NextResponse.json({ status: "success", data }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ status: "failed", error: error.toString() }, { status: 401 });
    }

}