'use client'

import { Box, Flex } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import SelectMedia from './SelectMedia';
import AutomationResponse from './AutomationResponse';
import { toast } from 'react-toastify';
import axios from 'axios';

const page = () => {
  let router = usePathname().split('/');
  const id = router.pop().toLocaleLowerCase();
  const type = router.pop(2).toLocaleLowerCase();
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [automationData, setAutomationData] = useState({
    commentReply: '',
    label: '',
    url: '',
    direactMessage: 'Thank You for Reaching Us! 🙌✨',
    askToFollow: false,
    initialMessage: "Hi there! 👋\n\nTo access the link you're looking for, make sure to follow us first. Once you've followed, I'll send the link your way 🚀.\n\nThanks for supporting us! 💙",
    trigger: '',
    accountId: id
  });


  const handleSelectPost = (meidaId) => setSelectedPost(meidaId);

  const handleSubmit = async () => {

    const { commentReply, url, direactMessage } = automationData;
    if (!selectedPost) {
      toast.error("Please Select a Post");
      return;
    }

    if (!commentReply && !url && !direactMessage) {
      toast.error("Action cannot be completed");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post('/api/automations', { ...automationData, mediaId: selectedPost?.id }, {
        headers: {
          "Content-Type": 'application/form-data'
        }
      });

      if (res?.data?.success) {
        toast.success('Your automation is set to live');
      } else {
        toast.error(res?.data?.message || 'Something went wrong')
      }
    } catch (err) {
      toast.error(err?.response?.message || err?.message || 'Something went wrong')
    } finally {
      setLoading(false);
    }

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