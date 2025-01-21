'use client'
import AccountTable from '@/components/custom/Account/AccountsTable'
import AccountDailog from '@/components/custom/dailog/AccountsDailog'
import PageHeading from '@/components/custom/PageHeading'
import SearchInput from '@/components/custom/SearchInput'
import useColors from '@/hooks/useColors'
import { Box, Button, Flex } from '@chakra-ui/react'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import AutomationAccounts from './AutomationAccounts'
import { useRouter } from 'next/navigation'

const page = () => {
    const [search,setSearch]=useState('');
    const {mainColor,textDark} = useColors();
    const [open,setOpen] = useState(false);
    const [selectedAccountId,setSelectedAccountId] = useState(null);
    const router = useRouter();

    const handleNext = ()=>{
      if(selectedAccountId !==null || selectedAccountId!=='')router.push(`/dashboard/automations/selectAutomationType/${selectedAccountId}`)
    }


    const handleSelect = (id)=> setSelectedAccountId(id);

    const handleCloseAccountDailog = ()=>setOpen(false);
  return (
    <Box px={7} py={10}>
        <PageHeading path={['Home','Automations']}>My Automations</PageHeading>
        <Flex py={10} gap={7}>
          <SearchInput placeholder='Search Automation' seach={search} setSearch={setSearch}/>
          <Button bg={mainColor} color={textDark} fontSize={'md'} fontWeight={'lighter'} onClick={()=>setOpen(true)}>
            <Plus />Create Automation
          </Button>
        </Flex>
        <AccountTable/>
        <AccountDailog 
          open={open} 
          setOpen={setOpen} 
          heading={'Select Account'}
          buttonLabel={'Next'}
          disabled={selectedAccountId===null}
          handleClick={handleNext}
          handleClose={handleCloseAccountDailog}
          description={'Select Account Which you want to automate.'}
          
        >
          <AutomationAccounts
            selectedAccountId={selectedAccountId}
            handleClick={handleSelect}
          />
        </AccountDailog>
    </Box>
  )
}

export default page