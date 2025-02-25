
"use client";

import { toastError, toastSuccess } from "@/components/custom/toast";

import { useEffect } from "react";

const ShowErrors = ({ query = "error",success=false }) => {
    
    useEffect(()=>{
        const url = new URL(window.location.href);
        const data = url.searchParams.get(query);
        if(data){
            success ? toastSuccess(data) : toastError(data)
        }
    },[])

    return <></>;
};

export default ShowErrors;
