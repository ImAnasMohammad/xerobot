import { Suspense } from "react";
import InstagramCodeHandler from "./InstagramCodeHandler"; // Separate client component

export default function InstagramRedirect() {
    return (
        <div style={{ textAlign: "center", marginTop: "20vh", fontSize: "20px" }}>
            <p>Redirecting to our callback page...</p>
            <Suspense fallback={<p>Loading...</p>}>
                <InstagramCodeHandler />
            </Suspense>
        </div>
    );
}
