'use client'

import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import AccountTable from '@/components/custom/Account/AccountsTable';
import CustomDailog from '@/components/custom/dailog/CustomDailog';
import AccountsTypes from '@/components/custom/Account/AccountsTypes';
import HeadingWithSearch from '../HeadingWithSearch';
import { toastError } from '@/components/custom/toast';
import instagramLogin from '@/utils/handleInstagramLogin';
import { useRouter } from 'next/navigation';
import ShowErrorsWithSuspense from '@/utils/showErrorsInURL';

const page = () => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState('');
  const [accountLinkLoading, setAccountLinkLoading] = useState(false);
  const redirect = useRouter();

  const handleCloseAccountDailog = () => {
    setAccountLinkLoading(false);
    setSelectedAccountType('')
    setOpen(false);
  }

  const handleLinkClick = async () => {
    // `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=${process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID}&redirect_uri=${process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI}&response_type=code&scope=${process.env.NEXT_PUBLIC_INSTAGRAM_PERMISSIONS}`
    try {
      setAccountLinkLoading(true);
      const code = await instagramLogin();
      console.log(code)
      redirect.push(`/api/instagram/auth/callback?code=${code}`);
      
    } catch (error) {
      toastError("Instagram Login Failed");
    }finally{
      setAccountLinkLoading(false);
    }
  }

  return (
    <Box px={7} py={10}>
      <ShowErrorsWithSuspense/>
      <HeadingWithSearch
        path={['Home', 'My Accounts']}
        heading={'My Accounts'}
        search={search}
        setSearch={setSearch}
        handleClick={() => setOpen(true)}
        btnLabel={<><Plus />Add Account</>}
        searchPlaceholder='Search Account'
      />
      <AccountTable search={search} handleOpen={() => setOpen(true)} />
      <CustomDailog
        open={open}
        setOpen={setOpen}
        heading={'Select Account type'}
        buttonLabel={selectedAccountType ? `Go to ${selectedAccountType}` : 'Next'}
        disabled={selectedAccountType === ''}
        loading={accountLinkLoading}
        handleClick={handleLinkClick}
        handleClose={handleCloseAccountDailog}
      >
        <AccountsTypes loading={accountLinkLoading} value={selectedAccountType} setValue={setSelectedAccountType} />
      </CustomDailog>
    </Box>
  )
}

export default page
