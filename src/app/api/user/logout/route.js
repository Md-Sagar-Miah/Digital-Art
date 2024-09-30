import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export const GET = (req, res) => {
    try {
        cookies().delete('token');
        return NextResponse.json({ status: 'Success', message: 'Logout successful' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ status: 'Failed', message: 'Authentication error', error }, { status: 401 })
    }
}