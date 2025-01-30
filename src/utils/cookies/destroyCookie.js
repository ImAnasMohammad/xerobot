import { NextResponse } from "next/server";

const destroyCookie = ({name='authToken',...data}) => {
    const response = NextResponse.json({...data});

    response.cookies.set(name, '', {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_MODE === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 0, // Expire immediately
    });

    return response
}

export default destroyCookie;