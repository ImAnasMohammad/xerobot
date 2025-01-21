'use client'

import { Box, Flex } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import SelectMedia from './SelectMedia';
import AutomationResponse from './AutomationResponse';
import { toast } from 'react-toastify';

const page = () => {
  let router = usePathname().split('/');
  const id  = router.pop().toLocaleLowerCase();
  const type  = router.pop(2).toLocaleLowerCase();
  const [selectedPost,setSelectedPost]=useState(null);
  const [loading,setLoading]=useState(false);
  const [automationData,setAutomationData] = useState({
    commentReply:'',
    label:'',
    url:'',
    message:'Thank You for Reaching Us! 🙌✨',
    askToFollow:false,
    initialMessage:"Hi there! 👋\n\nTo access the link you're looking for, make sure to follow us first. Once you've followed, I'll send the link your way 🚀.\n\nThanks for supporting us! 💙",
  });


  const handleSelectPost = (meidaId)=>setSelectedPost(meidaId);

  const handleSubmit = ()=>{
    const {commentReply,url,message} =automationData;
    if(!selectedPost){
      toast.error("Please Select a Post");
      return;
    }
    
    if(!commentReply && !url && !message){
      toast.error("Action cannot be completed");
      return;
    }
    try{
      setLoading(true);
    }catch(err){

    }finally{
      setLoading(false);
    }
    console.log(automationData,selectedPost);

  }

  if(!id || !type || type==='createautomation' )return <div>Invalid details</div>
  return (
    <Flex
      as={'div'}
      height={'100%'}
      width={'95%'}
      gap={4}
      px={0}
      py={10}
      margin={'auto'}
      justifyContent={'center'}
    >
      <SelectMedia
        selectedPost={selectedPost}
        handleSelectPost={handleSelectPost}
        id={id}
      />
      <AutomationResponse
        automationData={automationData}
        setAutomationData={setAutomationData}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </Flex>
  )
}

export default page