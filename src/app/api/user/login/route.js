import { CreateToken } from "@/utility/JWTTokenHelper";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
const bcrypt = require('bcrypt');



export const POST = async (req, res) => {
    try {
        const reqBody = await req.json();
        const prisma = new PrismaClient()
        const result = await prisma.users.findUnique({ where: { email: reqBody.email } });
        if (result === null) {
            return NextResponse.json({ status: 'Failed', message: 'Authentication error' }, { status: 404 })
        }
        else {
            const hash = result.password;
            const plain = reqBody.password;

            const match = await bcrypt.compare(plain, hash);
            if (match) {
                let token = await CreateToken(result['email'], result['id']);
                cookies().set({
                    name: 'token',
                    value: token,
                    httpOnly: true,
                    path: '/',
                })
                return NextResponse.json({ status: 'Success', data: token }, { status: 200 })
            } else {
                return NextResponse.json({ status: 'Failed', message: 'Authentication error' }, { status: 401 });
            }

        }
    } catch (error) {
        return NextResponse.json({ status: 'Failed', message: error.toString() }, { status: 401 })
    }
}