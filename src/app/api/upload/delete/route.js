import { NextResponse } from 'next/server';

const fs = require('fs');

export const POST = async (req, res) => {
    try {
        const { path } = await req.json();
        const fullPath = "./public".concat(path);
        // Remove the file
        fs.unlink(fullPath, (err) => {
            if (err) {
                console.error(`Error removing file: ${err}`);
                return;
            }
        });
        return NextResponse.json({ satatus: "Success" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ satatus: "failed" }, { status: 401 });
    }
}