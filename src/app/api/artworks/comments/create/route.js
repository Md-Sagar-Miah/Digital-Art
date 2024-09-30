import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { VerifyToken } from "@/utility/JWTTokenHelper";

export const POST = async (req, res) => {
    try {
        const reqBody = await req.json()
        const cookieStore = cookies()
        const token = cookieStore.get('token')
        const result = await VerifyToken(token.value);
        const prisma = new PrismaClient();
        const data = await prisma.comments.create({ data: { ...reqBody, userId: result['id'] } })
        return NextResponse.json({ status: 'Success', data }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ status: 'Failed', message: 'Authentication Error', error: error.toString() }, { status: 401 });
    }
}