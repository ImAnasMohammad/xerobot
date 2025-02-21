'use client'

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";


const showErrorsInUrl = (query='error',display=true)=>{
    const searchParams = useSearchParams();
    const data = searchParams.get(query);

    useEffect(()=>{
        display && toast.error(data);
    },[data])

    return data;
}


export default showErrorsInUrl;