import { NextResponse } from "next/server";

export const POST = async (req, res) => {
    try {
        const { searchParams } = new URL(req.url);
        const tranId = searchParams.get("tran_id")
        const userId = searchParams.get("userId")
        const artId = searchParams.get("artId")
        const amount = searchParams.get("amount")
        return NextResponse.redirect(new URL(`${process.env.BASE_URL}/artworks/buy/cancel?tranId=${tranId}&artId=${artId}&userId=${userId}&amount=${amount}`, req.url), { status: 303 })

    } catch (error) {
        return NextResponse.redirect(new URL(`${process.env.BASE_URL}/artworks/buy/cancel?tranId=${tranId}&artId=${artId}&userId=${userId}&amount=${amount}`, req.url), { status: 303 })
    }

}