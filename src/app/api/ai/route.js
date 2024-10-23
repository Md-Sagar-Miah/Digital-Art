import { NextResponse } from "next/server"

export const POST = async (req, res) => {
    try {
        const { question } = await req.json()
        const result = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDZpidGSop9A2fWg-3uEP666YWakqMr5cM", {
            method: "POST",
            body: JSON.stringify({ "contents": [{ "parts": [{ "text": `${question}` }] }] }),

        })
        const data = await result.json()
        return NextResponse.json({ status: "Success", answer: data.candidates[0].content.parts[0].text })
    } catch (error) {
        return NextResponse.json({}, { status: 400 })
    }
}