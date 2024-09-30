
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
    try {
        const file = await req.formData();
        const image = file.get("img");
        const arrayBuffer = await image.arrayBuffer();
        const buffer = await Buffer.from(arrayBuffer);
        const basePath = "./public"
        const pathOfImage = `/uploads/${new Date().getTime() + image.name}`;
        const fullPath = basePath.concat(pathOfImage);

        writeFile(fullPath, buffer);

        return NextResponse.json({ status: "Success", path: pathOfImage }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ status: "Failed", error: error.toString() }, { status: 401 });
    }
}