'use client'

import { Flex, Text } from '@chakra-ui/react';
import { redirect, usePathname } from 'next/navigation';
import React, { useState } from 'react'
import SelectMedia from './SelectMedia';
import AutomationResponse from './AutomationResponse';
import { sendPost } from '@/utils/sendRequest';
import { toastError, toastSuccess } from '@/components/custom/toast';
import { isValidURL } from '@/utils/validate';
import { automationTypes } from '@/utils/automationTypes';
import useColors from '@/hooks/useColors';

const page = () => {
  let router = usePathname().split('/');
  const id = router.pop().toLocaleLowerCase();
  const type = router.pop(2).toLocaleLowerCase();
  const {textUltraShadedDark} = useColors();

  if(!automationTypes?.includes(type)){
    return <Flex
      height={'100%'}
      alignItems={'center'}
      justifyContent={'center'}
      direction={'column'}
    >
      <Text fontSize={'6xl'}>Oops!...</Text>
      <Text fontSize={'xs'} color={textUltraShadedDark}>This kind of automation not exist</Text>
    </Flex>
  }

  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [automationData, setAutomationData] = useState({
    commentReply: '',
    title: '',
    url: '',
    message: 'Thank You for Reaching Us! 🙌✨',
    askToFollow: false,
    initialMessage: "Hi there! 👋\n\nTo access the link you're looking for, make sure to follow us first. Once you've followed, I'll send the link your way 🚀.\n\nThanks for supporting us! 💙",
    trigger: '',
    accountId: id,
    name:'Comment automation',
    imageTitle:'',
    imageSubTitile:"",
    imageDefaultAction:"",
    imageUrl:'',
    type
  });


  const handleSelectPost = (meidaId) => setSelectedPost(meidaId);

  const handleSubmit = async () => {

    const { commentReply, url, message } = automationData;
    if (!selectedPost) {
      toastError("Please Select a Post");
      return;
    }

    if (!commentReply && !url && !message) {
      toastError("Action cannot be completed");
      return;
    }

    if(url && !isValidURL(url)){
      toastError("Invalid Link");
      return;
    }

    setLoading(true);
    console.log(automationData)
    const automationDetails = await sendPost({
      url:'/api/automations',
      payload:{ ...automationData, mediaId: selectedPost?.id }
    })


    if(automationDetails?.success){
      toastSuccess("Automation set Successfully.");
      redirect('/dashboard/automations');
    }else{
      toastError(automationDetails?.message || "Something went wrong")
    }
    
    setLoading(false);

  }

  if (!id || !type || type === 'createautomation') return <div>Invalid details</div>
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
      <Flex
        as={'div'}
        height={'100%'}
        width={'95%'}
        gap={4}
        px={0}
        py={10}
        margin={'auto'}
        justifyContent={'center'}
        overflow={'hidden'}
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
    </Flex>
  )
}

export default page