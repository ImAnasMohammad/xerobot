'use client'
import { Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Heading from '../../../Heading'
import { usePathname } from 'next/navigation'
import ProfileCard from '../../../ProfileCard'
import ProfileSkeleton from '@/components/custom/ProfileSkeleton'
import axios from 'axios'
import { toast } from 'react-toastify'
import confetti from 'canvas-confetti'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const page = () => {
  const [instagramDetails,setInstagramDetails] = useState({});
  const [btnLoading,setBtnLoading] = useState(false)
  const [disabled,setDisabled] = useState(false);
  const [connected,setConnected] = useState(false);
  const [err,setErr] = useState(null);
  const [loading,setLoading] = useState(true);
  let router = usePathname()
  router = router.split('/');
  const pageId  = router[router.length-1].toLocaleLowerCase();
  const id  = router[router.length-2].toLocaleLowerCase();

  const getInstagramDetails = async ()=>{
    try{
      const res = await axios.get(`/api/instagram/getDetails/instagramDetails?id=${id}&pageId=${pageId}`);
      if(res?.data){
        setInstagramDetails(res?.data?.data);
      }
    }catch(err){
      setErr(err?.response?.data ?? "Something went wrong.")
    }finally{
      setLoading(false);
    }
  }

  const handleClick = async()=>{

    try{
      setBtnLoading(true)
      setDisabled(true);
      const res = await axios.post(`/api/instagram/addAccount`,{
        pageId,
        id,
        ...instagramDetails
      },);

      if(res?.data?.data?.success===true){
        toast.success(res?.data?.data?.message);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        setConnected(true)
      }else{
        toast.error(res?.data?.message)
      }

    }catch(err){
      console.log(err)
      toast.error(err.message);
    }finally{
      setBtnLoading(false)
      setDisabled(false)
    }

  }
  useEffect(()=>{
    getInstagramDetails()
  },[])
  return (
    <Flex
        flexDirection={'column'}
        alignItems={'center'}
        py={20}
        minHeight={'60vh'}
        gap={5}
    >
        <Heading heading='We got it' subHeading='We Found This instagram account.'/>
        {
          !loading && !err ? <ProfileCard
            img={instagramDetails?.profilePicture}
            name={instagramDetails?.accountUserName}
            handleClick={handleClick}
            btnLabel={connected ? "connected":"connect"}
            loading={btnLoading}
            disabled={disabled || connected}
          />:<ProfileSkeleton/>
        }
        {
          connected && <Link href={'/dashboard/accounts'}><Button variant="Ghost">Go to accounts</Button></Link>
        }
    </Flex>
  )
}

export default page