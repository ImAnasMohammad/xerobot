'use client'

import PageHeading from '@/components/custom/PageHeading';
import SearchInput from '@/components/custom/SearchInput';
import { Box, Button, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import useColors from '@/hooks/useColors';
import { Plus } from 'lucide-react';
import AccountProfile from '@/components/custom/Account/AccountProfile';
import AccountTable from '@/components/custom/Account/AccountsTable';
import AccountDailog from '@/components/custom/dailog/AccountsDailog';
import AccountsTypes from '@/components/custom/Account/AccountsTypes';
import {handleInstagramLogin} from '@/utils/handleInstagramLogin'

const page = () => {
  const {mainColor,textDark} = useColors();
  const [search,setSearch] = useState('');
  const [open,setOpen] = useState(false);
  const [selectedAccountType,setSelectedAccountType]=useState('');
  const [accountLinkLoading,setAccountLinkLoading]= useState(false);
  const [error,setError] = useState('');
  const [newAccount,setNewAccount] = useState(null);

  const handleCloseAccountDailog = ()=>{
    setAccountLinkLoading(false);
    setSelectedAccountType('')
    setOpen(false);
  }

  const handleLinkClick = ()=>{
    setAccountLinkLoading(true);
    if(selectedAccountType=='Instagram'){
      handleInstagramLogin(setError,setAccountLinkLoading,setNewAccount)
    }
  }
  return (
    <Box px={7} py={10}>
        <PageHeading path={['Home','My Accounts']}>My Accounts</PageHeading>
        <Flex py={10} gap={7}>
          <SearchInput placeholder='Search Accounts' seach={search} setSearch={setSearch}/>
          <Button bg={mainColor} color={textDark} fontSize={'md'} fontWeight={'lighter'} onClick={()=>setOpen(true)}>
            <Plus />Add Account
          </Button>
        </Flex>
        <AccountTable/>
        <AccountDailog 
          open={open} 
          setOpen={setOpen} 
          heading={'Select Account type'}
          buttonLabel={selectedAccountType ? `Go to ${selectedAccountType}`:'Next'}
          disabled={selectedAccountType===''}
          loading={accountLinkLoading}
          handleClick={handleLinkClick}
          handleClose={handleCloseAccountDailog}
          
        >
          <AccountsTypes loading={accountLinkLoading} value={selectedAccountType} setValue={setSelectedAccountType}/>
        </AccountDailog>
        {/* <AccountProfile/> */}
    </Box>
  )
}

export default page