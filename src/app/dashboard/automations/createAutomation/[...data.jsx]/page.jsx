'use client'

import { Flex } from '@chakra-ui/react';
import { redirect, usePathname } from 'next/navigation';
import React, { useState } from 'react'
import SelectMedia from './SelectMedia';
import AutomationResponse from './AutomationResponse';
import { toast } from 'react-toastify';
import { sendPost } from '@/utils/sendRequest';

const page = () => {
  let router = usePathname().split('/');
  const id = router.pop().toLocaleLowerCase();
  const type = router.pop(2).toLocaleLowerCase();
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
    imageTitle:'Image Title',
    imageSubTitile:"Image Subtitle",
    imageDefaultAction:"https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/messaging-api/generic-template",
    imageUrl:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOQAAACUCAMAAAC0q3V+AAAAYFBMVEUAAAC1tbURERHj4+Pt7e0jIyPT09PJycm5ubm/v78qKiocHBz///9wcHDY2Nibm5uHh4eOjo5kZGQwMDD29vaVlZVbW1tOTk6lpaU8PDyrq6tGRkZ/f38JCQk1NTVTU1MnNrT2AAADgUlEQVR4nO3X23ajIBQGYA0IHvGEZ2Pe/y0HEVAn7Rq7pk168X8XrTsWy5YdDp4HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFqc5X2TBSa6VU1ftvvdtlQ3rz+s6/bL4tRyKPp8Dj5o8goFEVEUCbpFD0Z4xAm/m56FdA3JdPFhD9Lftqt4VC0jQipzJ6dsDYvv7PplOS3qJAnqrTOLjIYgCTqy5bww9lBhzOm1LBOejluSQUTateUot6roZRYkSTynzQ/k8C9Z2h5Dws0F9defo6i3kIlLT+tZ6G9JFtTUrU/XEs2oGdGZth83/UmkP0ZTar9SmVzUcFBbXRO98r1s02k0SVL73Bst1Y8oMvUfsPG/+/xVlTyF/j5ga98yGpso4a5vSbfPHtX92HpQ78TfkpykfVt3X+VXu7fllWz4pr5fFjLdERvSfVyZf8o5j8yE4k0sdx/S5PgwHnk2yZK6T2exqEJwk25GXl6vovQqTqUUhe6bnN2dUU2wLHJhIdwAVNRk2cjKO2jI4pL0ift4zSojtQ0f5AsL0re40XakzRRMDWVqUAK5T6IFCzzixkx18+GuO5qvY5+fc6z0amGS5PvraVVWJXHFMojZe62aRnx7xwNR3RpS98JVlcWeLF14qrKW9Ikax9OQBFy/EZOk8A9/nHn9XvfvSFLaqaVTa8nVJL1K5H+No+czPR/9yiT3ztDxarl6a5bpKVbr7aJ//7Ncp5cnGdP9P0bs4sSzamSaH+NBmpx9X6fzmyaeO913WWuSdF+pP11CdCSrifaHTzgtc02oQi7q5yXEjfsblhDO3SVRWY37AGybgcVEh82At+aYmdnHKv1Q8wkJw35QmwGb1fNmYPFebJa2o0mardPrvq1TBZZ8vK3Lt013JfrThkcbzcvYt3Xr7HXzbSEErH9q8+NkaC4iXWDCbdB1Z3tivomC7U16u6evyPM+1Ew86u2ZoQz1riiz603xjg16l4ZTEMQTT/WQLpR3KmzpVrcxF60KF+Y2sWpQuevmQzwdgm2SiU+qOAjq0EzYjZzXsEnfcqBshTolq5Oy+aYMkQ7ttFr7+tD8nMxnejsdJb06JR+O26U6m6sHvXpqNe5t0RSHRa8ty/lwRO7U3S9U2LQ3HeamOGwY4rks35QiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwO/1B/ziK15mszkHAAAAAElFTkSuQmCC',
  });


  const handleSelectPost = (meidaId) => setSelectedPost(meidaId);

  const handleSubmit = async () => {

    const { commentReply, url, message } = automationData;
    if (!selectedPost) {
      toast.error("Please Select a Post");
      return;
    }

    if (!commentReply && !url && !message) {
      toast.error("Action cannot be completed");
      return;
    }

    setLoading(true);
    const automationDetails = await sendPost({
      url:'/api/automations',
      payload:{ ...automationData, mediaId: selectedPost?.id }
    })


    if(automationDetails?.success){
      toast.success("Automation set Successfully.");
      redirect('/dashboard/automations');
    }else{
      toast.error(automationDetails?.message || "Something went wrong")
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