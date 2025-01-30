'use client'

import PageHeading from '@/components/custom/PageHeading';
import SearchInput from '@/components/custom/SearchInput';
import { Box, Button, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import useColors from '@/hooks/useColors';
import { Plus } from 'lucide-react';
import AccountTable from '@/components/custom/Account/AccountsTable';
import AccountDailog from '@/components/custom/dailog/AccountsDailog';
import AccountsTypes from '@/components/custom/Account/AccountsTypes';
import {handleInstagramLogin} from '@/utils/handleInstagramLogin'
import showErrorsInUrl from '@/utils/showErrorsInURL';

const page = () => {
  const {mainColor,textDark} = useColors();
  const [search,setSearch] = useState('');
  const [open,setOpen] = useState(false);
  const [selectedAccountType,setSelectedAccountType]=useState('');
  const [accountLinkLoading,setAccountLinkLoading]= useState(false);
  const urlError = showErrorsInUrl();

  const handleCloseAccountDailog = ()=>{
    setAccountLinkLoading(false);
    setSelectedAccountType('')
    setOpen(false);
  }

  const handleLinkClick = ()=>{
    setAccountLinkLoading(true);
    const instagramUrl = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=${process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID}&redirect_uri=${process.env.NEXT_PUBLIC_APP_DOMAIN}/${process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI}&response_type=code&scope=${process.env.NEXT_PUBLIC_INSTAGRAM_PERMISSIONS}`;
    window.location.href=instagramUrl
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
        <AccountTable search={search}/>
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