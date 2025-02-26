'use client'

import PageHeading from '@/components/custom/PageHeading';
import { Box, Flex } from '@chakra-ui/react';

import { Check, User, Workflow } from 'lucide-react';
import { sendGet } from '@/utils/sendRequest';
import { useEffect, useState } from 'react';
import InstagramActivity from './InstagramActivity';
import Card from './Card';
import { toastError } from '@/components/custom/toast';
import SeoMeta from '@/components/custom/SEOMeta';




const page = () => {

  const metaData = {
    description: "Manage and automate your workflows with ease on XeroBot. Create, track, and optimize your automations effortlessly.",
    keywords: "automation, workflow automation, chatbot, XeroBot, automation tools, AI-driven automation, task automation, business workflow, smart automation tools",
    url: "https://yourwebsite.com/dashboard/automations",
    image: "https://yourwebsite.com/og-image.jpg",
  };


    const [connectedAccounts,setConnectedAccounts] = useState(null);
    const [totalAutomations,setTotalAutomations] = useState(null);
    const [averageSccessRate,setAverageSuccessRate] = useState(null);
    const [accounts,setAccounts] = useState([]);


  const getData = async ()=>{
    const res = await sendGet({url:`/api/dashboard`});

    if(!res?.success){
      toastError(res?.message || "Something went wrong.");
    }
    
    const {accountsWithAutomations=[]} = res;


    setConnectedAccounts(accountsWithAutomations?.length || 0);

    let tempTotalAutomations = 0;


    let totalReceivedCount = 0;
    let totalRespondedCount = 0;
    let tempAccounts = [];

    accountsWithAutomations.map(accountsWithAutomation=>{
        tempTotalAutomations += accountsWithAutomation?.automations?.length;
        let accountRespondCount = 0;
        let accountReceivedCount = 0;
        
        accountsWithAutomation?.automations?.map(item=>{
          accountReceivedCount+=(item?.receivedCount || 0);
          accountRespondCount+=(item?.respondedCount || 0);
        })
        
        tempAccounts.push({
          avatar:accountsWithAutomation?.accountProfile || '',
          name:accountsWithAutomation?.accountUserName || '',
          value:accountsWithAutomation?.accountUserName || '',
          successRate:(Math.floor((accountRespondCount*100)/accountReceivedCount) || 0)
        })

        totalReceivedCount+=accountReceivedCount;
        totalRespondedCount+=accountRespondCount;
    })
    setTotalAutomations(tempTotalAutomations);
    setAverageSuccessRate(Math.floor(((totalRespondedCount*100)/totalReceivedCount) || 0))
    setAccounts([...tempAccounts])
  }

  useEffect(()=>{
    getData()
  },[])

  const items = [
    {
      name:"Connected Accounts",
      value:connectedAccounts,
      icon:<User size={'30px'}/>
    },
    {
      name:"Total Automations",
      value:totalAutomations,
      icon:<Workflow size={'30px'}/>
    },
    {
      name:"Average Success Rate",
      value:averageSccessRate,
      icon:<Check size={'30px'}/>,
      unit:"%"
    }
  ]


  return (
  <>
    <SeoMeta title={'Dashboard - Xerobot'}/>
    <Box px={7} py={10}>
      <PageHeading path={[]}>Hey, There</PageHeading>
      <Flex gap={4} flexWrap={'wrap'} py={10}>
        {
          items.map(item=><Card key={item.name} item={item} boxShadow='xs' />)
        }
      </Flex>
      <InstagramActivity accounts={accounts} averageSccessRate={averageSccessRate}/>
    </Box>
  </>
  )
}



export default page