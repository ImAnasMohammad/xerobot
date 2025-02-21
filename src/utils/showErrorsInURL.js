<<<<<<< HEAD
'use client'
=======
"use client";
>>>>>>> 86068ddb48c5a8ca71fb0f356939dd192900a408

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Suspense } from "react";

const ShowErrors = ({ query = "error", display = true }) => {
    const searchParams = useSearchParams();
    const data = searchParams.get(query);

    useEffect(() => {
        if (display && data) {
            toast.error(data);
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
