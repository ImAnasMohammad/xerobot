'use client'

import { sendGet } from '@/utils/sendRequest'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const page = () => {

    const router = useRouter();
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState('');

    const logout = async()=>{
        try{
            const res = await sendGet({url:`/api/logout`});

            if(res?.success){
                router.push('/')
            }else{
                setError('Something went wrong while logging out.')
            }
        }catch(err){
            console.log(err)
            toast.error('Unable to logout.');
            setError('Something went wrong while logging out.')

        }finally{
            setLoading(false)
        }

    }

    useEffect(()=>{
        logout();
    },[])

    if(loading){
        return <div>Logging out...</div>
    }

    if(error){
        return <div>{error}</div>
    }
    
    return (
        <div></div>
    )
}

export default page