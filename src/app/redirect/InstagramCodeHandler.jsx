"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function InstagramCodeHandler() {
    const searchParams = useSearchParams();
    const code = searchParams.get("code");

    useEffect(() => {
        if (code) {
            window.location.href=`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/instagram/auth/callback?code=${code}`
        }
    }, [code]);

    return code ? <p>Please wait...</p> : null;
}
