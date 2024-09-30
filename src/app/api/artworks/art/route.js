import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
const { VerifyToken } = require("@/utility/JWTTokenHelper");

//create artwork post
export const POST = async (req, res) => {
    try {
        const reqBody = await req.json();
        const cookieStore = cookies()
        const token = cookieStore.get('token')
        const data = await VerifyToken(token.value);
        const prisma = new PrismaClient();
        const result = await prisma.artworks.create({
            data: { ...reqBody, userId: data.id }
        })
        return NextResponse.json({ satus: 'Success', data: result }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ status: 'Failed', message: 'Authentication error', error }, { status: 401 });
    }
}
//update an artwork post
export const PATCH = async (req, res) => {
    try {
        let { searchParams } = new URL(req.url);
        let id = parseInt(searchParams.get('id'));
        const reqBody = await req.json();
        const cookieStore = cookies()
        const token = cookieStore.get('token')
        const data = await VerifyToken(token.value);
        const prisma = new PrismaClient();
        const result = await prisma.artworks.update({
            data: reqBody,
            where: { id: id, userId: data.id }
        })
        return NextResponse.json({ satus: 'Success', data: result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ status: 'Failed', message: 'Authentication error', error }, { status: 401 });
    }
}
//Delete an artwork post
export const DELETE = async (req, res) => {
    try {
        let { searchParams } = new URL(req.url);
        let id = parseInt(searchParams.get('id'));
        const cookieStore = cookies()
        const token = cookieStore.get('token')
        const data = await VerifyToken(token.value);
        const prisma = new PrismaClient();
        const result = await prisma.artworks.delete({
            where: { id: id, userId: data.id }
        })
        return NextResponse.json({ satus: 'Success', message: "Data is deleted", Data: result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ status: 'Failed', message: 'Authentication error', error }, { status: 401 });
    }
}