import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
    try {
        const { searchParams } = new URL(req.url);
        const userId = parseInt(searchParams.get('userId'));
        const prisma = new PrismaClient();
        const data = await prisma.transaction.findMany({
            select: {
                artworks: {
                    select: {
                        id: true,
                        title: true,
                        img: true,
                        price: true,
                        users: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                img: true,
                            }
                        },
                    }
                }
            },
            where: {
                userId: userId
            }
        })
        return NextResponse.json({ status: "success", data }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ status: "failed", error: error.toString() }, { status: 400 })
    }
}