import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
    try {
        const { searchParams } = new URL(req.url);
        const tranId = searchParams.get("tran_id")
        const userId = parseInt(searchParams.get("userId"))
        const artId = parseInt(searchParams.get("artId"))
        const amount = parseFloat(searchParams.get("amount"))
        const prisma = new PrismaClient();
        const result = await prisma.transaction.create({
            data: {
                tranId,
                userId,
                artId,
                amount,
            }
        })

        return NextResponse.redirect(new URL(`${process.env.BASE_URL}/artworks/buy/success?tranId=${tranId}&artId=${artId}&userId=${userId}&amount=${amount}`, req.url), { status: 303 })

    } catch (error) {
        return NextResponse.redirect(new URL(`${process.env.BASE_URL}/artworks/buy/failed?tranId=${tranId}&artId=${artId}&userId=${userId}&amount=${amount}`, req.url), { status: 303 })
    }

}