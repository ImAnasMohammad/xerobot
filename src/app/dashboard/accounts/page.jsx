'use client'

import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import AccountTable from '@/components/custom/Account/AccountsTable';
import CustomDailog from '@/components/custom/dailog/CustomDailog';
import AccountsTypes from '@/components/custom/Account/AccountsTypes';
import showErrorsInUrl from '@/utils/showErrorsInURL';
import HeadingWithSearch from '../HeadingWithSearch';
import { toastError } from '@/components/custom/toast';
import instagramLogin from '@/utils/handleInstagramLogin';

const page = () => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState('');
  const [accountLinkLoading, setAccountLinkLoading] = useState(false);
  showErrorsInUrl();

  const handleCloseAccountDailog = () => {
    setAccountLinkLoading(false);
    setSelectedAccountType('')
    setOpen(false);
  }

  const handleLinkClick = async () => {
    setAccountLinkLoading(true);
    // `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=${process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID}&redirect_uri=${process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI}&response_type=code&scope=${process.env.NEXT_PUBLIC_INSTAGRAM_PERMISSIONS}`
    try {
      const code = await instagramLogin();
      console.log(code)
    } catch (error) {
      console.log(error)
      toastError("Instagram Login Failed");
    }
    // window.location.href = instagramUrl
  }

  return (
    <Box px={7} py={10}>
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
