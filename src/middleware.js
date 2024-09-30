import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server'

export function middleware(req, res) {
    const tokenStorage = cookies()
    const token = tokenStorage.get("token")
    if (req.nextUrl.pathname.startsWith("/user") /*|| req.nextUrl.pathname.startsWith("/artworks/details") || req.nextUrl.pathname.startsWith("/artists/profile")*/) {
        if (token) {
            return NextResponse.next()
        } else {
            return NextResponse.redirect(`${process.env.BASE_URL}/login`)
        }
    }
    // if (req.nextUrl.pathname.startsWith("/api")) {
    //     if (token) {
    //         const reqHeaders = new Headers(req.headers);
    //         reqHeaders.set('token', token)
    //         return NextResponse.next({
    //             request: {
    //                 headers: reqHeaders,
    //             },
    //         })
    //     }
    // }

}