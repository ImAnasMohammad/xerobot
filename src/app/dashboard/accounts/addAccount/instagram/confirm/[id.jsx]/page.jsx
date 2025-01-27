'use client'

import ProfileSkeleton from '@/components/custom/ProfileSkeleton'

import { Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { usePathname, useRouter } from 'next/navigation';
import Heading from '../../Heading';
import ProfileCard from '../../ProfileCard';



const page = () => {
    const router = usePathname();
    const redirect = useRouter()
    const id  = router.split('/').pop().toLocaleLowerCase();
    const [name,setName]=useState('');
    const [img,setImg]=useState(null);
    const [err,setErr]=useState(null);
    const [loading,setLoading]=useState(true);
    const [btnLoading,setBtnLoading] = useState(false);


    const getDetails = async ()=>{
        try{
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/socialAccounts?id=${id}`);
            const {data,message=null} = res.data;
            console.log(data)
            if(message===null){
                setImg(data.profilePicture);
                setName(data.name);
                setLoading(false);    
            }else{
                setErr(message);
                setLoading(false);
            }
        }catch(error){
            setErr(error.message);
            setLoading(false);
        }finally{
            if(err){
                toast.error(err)
            }
        }
    }


    useEffect(()=>{
        getDetails()
    },[]);

    const handleClick = ()=>{
        setBtnLoading(true)
        redirect.push(`/dashboard/accounts/addAccount/instagram/selectpages/${id}`);
    }
    return (
        <Flex
            flexDirection={'column'}
            alignItems={'center'}
            py={20}
            minHeight={'60vh'}
            gap={5}
        >
            <Heading/>
            {
                !loading && !err ? <ProfileCard loading={btnLoading} img={img} name={name} handleClick={handleClick}/>:<ProfileSkeleton/>
            }
        </Flex>
    )
}

export default page;