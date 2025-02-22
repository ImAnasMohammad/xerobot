"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function InstagramCodeHandler() {
    const searchParams = useSearchParams();
    const code = searchParams.get("code");

    useEffect(() => {
        if (code) {
            console.log(code)
            window.localStorage.setItem('instagram_auth_code',code);
            // window.close();
        }
    }, [code]);

    return code ? <p>Please wait...</p> : null;
}
