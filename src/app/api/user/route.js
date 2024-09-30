import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
    try {
        const { searchParams } = new URL(req.url);
        const id = parseInt(searchParams.get('id'));
        const prisma = new PrismaClient();
        const data = await prisma.users.findUnique({
            where: { id: id },
            select: {
                firstName: true,
                lastName: true,
                img: true,
                email: true,
                mobile: true,
                bio: true,
                artworks: true,
                createdAt: true,
                updatedAt: true
            }
        })
        return NextResponse.json({ status: 'Success', data }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ status: 'Failed', message: 'Authentication error', error: error.toString() }, { status: 401 })
    }
}