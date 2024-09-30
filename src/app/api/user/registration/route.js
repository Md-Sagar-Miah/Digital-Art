import { PrismaClient } from "@prisma/client";
const { NextResponse } = require("next/server");
const bcrypt = require('bcrypt');

//User Registration
export const POST = async (req, res) => {
    try {
        const reqBody = await req.json();
        reqBody.otp = '0';
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(reqBody.password, saltRounds);
        const prisma = new PrismaClient();
        const result = await prisma.users.create({
            data: { ...reqBody, password: hashPassword }
        })
        return NextResponse.json({ status: 'Success', data: result }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ status: 'Failed', data: error.toString() }, { status: 401 });
    }
}