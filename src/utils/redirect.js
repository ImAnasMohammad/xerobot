// middleware.js
import { NextResponse } from 'next/server';

function redirect(req,path) {

    return NextResponse.redirect(new URL(path, req.url));
}

export default redirect;
