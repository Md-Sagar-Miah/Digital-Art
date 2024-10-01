import { NextResponse } from "next/server";

export const POST = async (req, res) => {
    try {
        const { searchParams } = new URL(req.url);
        const tranId = searchParams.get("tran_id")
        const userId = searchParams.get("userId")
        const artId = searchParams.get("artId")
        const ammount = searchParams.get("ammount")
        return NextResponse.redirect(new URL(`${process.env.BASE_URL}/artworks/buy/success?tranId=${tranId}&artId=${artId}&userId=${userId}&ammount=${ammount}`, req.url), { status: 303 })

    } catch (error) {
        return NextResponse.redirect(new URL(`${process.env.BASE_URL}/artworks/buy/failed?tranId=${tranId}&artId=${artId}&userId=${userId}`, req.url), { status: 303 })
    }

}