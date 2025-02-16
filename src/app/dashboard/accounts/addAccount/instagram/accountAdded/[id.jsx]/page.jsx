'use client'
import { Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Heading from '../../Heading'
import { usePathname } from 'next/navigation'
import ProfileCard from '@/app/dashboard/accounts/addAccount/instagram/ProfileCard' 
import ProfileSkeleton from '@/components/custom/ProfileSkeleton'
import axios from 'axios'
import confetti from 'canvas-confetti'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { toastError, toastSuccess } from '@/components/custom/toast'

const page = () => {
    const router = usePathname();
    const id  = router.split('/').pop().toLocaleLowerCase();
    const [name,setName]=useState('');
    const [img,setImg]=useState(null);
    const [err,setErr]=useState(null);
    const [loading,setLoading]=useState(true);

    const getDetails = async ()=>{
        try{
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/socialAccounts?id=${id}`);
            const {data,message=null} = res.data;
            if(message===null){
                setImg(data.accountProfile);
                setName(data.accountUserName);
                setLoading(false);
                toastSuccess("Account successfully linked");
                confetti({
                  particleCount: 100,
                  spread: 70,
                  origin: { y: 0.6 }
                });   
            }else{
                setErr(message);
            }
        }catch(error){
            setErr(error.message);
        }finally{
            if(err){
                setLoading(false);
                toastError(err)
            }
        }
    }

    
    useEffect(() => {
        getDetails()
    }, [])
    return (
        <Flex
            flexDirection={'column'}
            alignItems={'center'}
            py={20}
            minHeight={'60vh'}
            gap={5}
        >
            <Heading heading={!loading && !err ? 'Account Linked':''} subHeading={!loading && !err ? 'Your Account has been linked successfully':''} />
            {
                !loading && !err ? <ProfileCard
                    img={img}
                    name={name}
                    button={false}
                /> : <ProfileSkeleton />
            }
            {
                !loading && !err && <Link href={'/dashboard/automations'} ><Button mt={5} width={'300px'}>Go to automations</Button></Link>
            }
        </Flex>
    )
}

export default page