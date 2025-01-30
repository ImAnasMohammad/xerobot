
import { NextResponse } from 'next/server';

export default async function createCookie({name='authToken',token,time=360},data ) {

    const response = NextResponse.json({...data});

    // Set the access token as a secure HTTP-only cookie
    response.cookies.set(name, token, {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_MODE === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: time
    })
    return response;
}