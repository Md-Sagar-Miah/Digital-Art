import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
const { VerifyToken } = require("@/utility/JWTTokenHelper");
const { NextResponse } = require("next/server");
const bcrypt = require('bcrypt');

//get profile data
export const GET = async (req, res) => {
    try {
        const cookieStore = cookies()
        const token = cookieStore.get('token')
        const data = await VerifyToken(token.value);
        const prisma = new PrismaClient()
        const user = await prisma.users.findUnique({ where: { id: data.id } })
        return NextResponse.json({ status: 'Success', user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ status: 'Failed', message: 'Authentication error', error }, { status: 401 })
    }
}

//Update profile data

export const PATCH = async (req, res) => {
    try {
        const { firstName, lastName, email, img, bio, mobile } = await req.json()
        const cookieStore = cookies()
        const token = cookieStore.get('token')
        const data = await VerifyToken(token.value);
        const prisma = new PrismaClient()
        const user = await prisma.users.update({
            data: { firstName, lastName, email, img, bio, mobile },
            where: { id: data.id }
        })
        return NextResponse.json({ status: 'Success', user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ status: 'Failed', message: 'Authentication error', error }, { status: 401 })
    }
}

//update password
export const PUT = async (req, res) => {
    try {
        const reqData = await req.json()
        const cookieStore = cookies()
        const token = cookieStore.get('token')
        const data = await VerifyToken(token.value);
        const prisma = new PrismaClient()
        const user = await prisma.users.findUnique({ where: { id: data.id } });
        const match = await bcrypt.compare(reqData.oldPassword, user.password);
        if (match) {
            const saltRounds = 10;
            const hashPassword = await bcrypt.hash(reqData.newPassword, saltRounds);
            const update = await prisma.users.update({ data: { ...user, password: hashPassword }, where: { id: data.id } })
            return NextResponse.json({ status: "Success", message: "Password updated" }, { status: 200 })
        } else {
            return NextResponse.json({ status: 'Failed', message: 'Authentication error' }, { status: 401 })
        }

    } catch (error) {
        return NextResponse.json({ status: 'Failed', message: 'Authentication error', error }, { status: 401 })
    }
}

//delete profile account
export const DELETE = async (req, res) => {
    try {
        const cookieStore = cookies()
        const token = cookieStore.get('token')
        const data = await VerifyToken(token.value);
        const prisma = new PrismaClient()
        const res = await prisma.comments.deleteMany({ where: { userId: data.id } })
        const res2 = await prisma.transaction.deleteMany({ where: { userId: data.id } })
        const res3 = await prisma.artworks.deleteMany({ where: { userId: data.id } })
        const user = await prisma.users.delete({ where: { id: data.id } })
        cookies().delete('token')
        return NextResponse.json({ status: 'Success', message: 'User Profile Deleted' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ status: 'Failed', message: 'Authentication error', error }, { status: 401 })
    }
}