
"use client";

import { toastError } from "@/components/custom/toast";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Suspense } from "react";

const ShowErrors = ({ query = "error", display = true }) => {
    const searchParams = useSearchParams();
    const data = searchParams.get(query);
    useEffect(() => {
        if (display && data) {
            toastError(data);
        }
    }, [data]);

    return null; // This component doesn't need to render anything
};

const ShowErrorsWithSuspense = (props) => (
    <Suspense fallback={null}>
        <ShowErrors {...props} />
    </Suspense>
);

export default ShowErrorsWithSuspense;
