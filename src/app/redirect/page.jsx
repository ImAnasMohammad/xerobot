"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function InstagramRedirect() {
    const searchParams = useSearchParams();
    const code = searchParams.get("code");

    useEffect(() => {
        if (code) {
            // Send the code to the main window
            window.opener?.postMessage({ code }, window.location.origin);

            // Close the popup window
            setTimeout(() => {
                window.close();
            }, 1500);
        }
    }, [code]);

    return (
        <div style={{ textAlign: "center", marginTop: "20vh", fontSize: "20px" }}>
            <p>Redirecting to our callback page...</p>
            {code && <p>Code: <b>{code}</b></p>}
        </div>
    );
}
