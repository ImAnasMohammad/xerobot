"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function InstagramCodeHandler() {
    const searchParams = useSearchParams();
    const code = searchParams.get("code");

    useEffect(() => {
        if (code) {
            window.opener?.postMessage({ code }, window.location.origin);
            setTimeout(() => {
                window.close();
            }, 1500);
        }
    }, [code]);

    return code ? <p>Code: <b>{code}</b></p> : null;
}
