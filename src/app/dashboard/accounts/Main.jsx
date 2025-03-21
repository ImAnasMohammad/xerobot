'use client';

import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import AccountTable from '@/components/custom/Account/AccountsTable';
import CustomDailog from '@/components/custom/dailog/CustomDailog';
import AccountsTypes from '@/components/custom/Account/AccountsTypes';
import HeadingWithSearch from '../HeadingWithSearch';
import ShowErrors from '@/utils/showErrorsInURL';
import handleInstagramLogin from '@/utils/handleInstagramLogin';

const Main = () => {
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedAccountType, setSelectedAccountType] = useState('');
    const [accountLinkLoading, setAccountLinkLoading] = useState(false);

    const handleCloseAccountDailog = () => {
        setAccountLinkLoading(false);
        setSelectedAccountType('');
        setOpen(false);
    };

    const handleLinkClick = async () => {
        if (typeof handleInstagramLogin === 'function') {
            handleInstagramLogin();
        } else {
            console.error("handleInstagramLogin is not a function. Check the import.");
        }
    };

    return (
        <Box px={7} py={10}>
            <ShowErrors />
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
    );
};

export default Main;
