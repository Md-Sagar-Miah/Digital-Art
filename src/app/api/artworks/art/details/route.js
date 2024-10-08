import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
    try {
        const { searchParams } = new URL(req.url);
        const id = parseInt(searchParams.get('id'));
        const userId = parseInt(searchParams.get('userId'));
        const prisma = new PrismaClient();
        const data = await prisma.artworks.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                img: true,
                price: true,
                category: true,
                des: true,
                createdAt: true,
                users: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        img: true,
                        email: true
                    }
                },
                transaction: {
                    where: {
                        userId: userId
                    },
                }

            },

        })
        return NextResponse.json({ status: 'Success', data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ status: 'Failed', error: error.toString() })
    }
}