import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server"

export const GET = async (req, res) => {
    try {
        let { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        const prisma = new PrismaClient();
        const data = await prisma.artworks.findMany({
            where: {
                category: category
            },
            select: {
                id: true,
                title: true,
                price: true,
                img: true,
                category: true,
                users: true
            },
            orderBy: {
                id: 'desc'
            }
        })
        return NextResponse.json({ status: 'Success', data }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ status: 'failed', error: error.toString() }, { status: 401 })
    }
}