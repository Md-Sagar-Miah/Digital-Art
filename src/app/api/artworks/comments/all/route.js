import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server"

export const GET = async (req, res) => {
    try {
        const { searchParams } = new URL(req.url);
        const artId = searchParams.get('artId');
        const prisma = new PrismaClient();
        const data = await prisma.comments.findMany({
            where: {
                artId: parseInt(artId),
            },
            include: {
                users: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        img: true
                    }
                }
            },
            orderBy: {
                id: "desc"
            }
        })
        return NextResponse.json({ status: "success", data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ status: "failed", error: error.toString() }, { status: 400 })
    }
}