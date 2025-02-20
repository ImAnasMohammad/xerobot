'use client';

import CustomDailog from '@/components/custom/dailog/CustomDailog';
import { Box } from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import AutomationAccounts from './AutomationAccounts';
import { useRouter } from 'next/navigation';
import HeadingWithSearch from '../HeadingWithSearch';
import AutomationTable from './AutomationTable';
import SeoMeta from '@/components/custom/SEOMeta';

const page = () => {
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const router = useRouter();

    const handleNext = () => {
        if (selectedAccountId !== null || selectedAccountId !== '') {
            router.push(`/dashboard/automations/selectAutomationType/${selectedAccountId}`);
        }
    };

    const handleSelect = (id) => setSelectedAccountId(id);
    const handleCloseAccountDailog = () => setOpen(false);
    const metaData = {
        description:"Manage and automate your workflows with ease on XeroBot. Create, track, and optimize your automations effortlessly.",
        keywords:"automation, workflow automation, chatbot, XeroBot, automation tools",
        url: "https://yourwebsite.com/dashboard/automations",
        image: "https://yourwebsite.com/og-image.jpg",
    }

    return (
        <>
            <SeoMeta title={'My Automations - XeroBot'} metaData={metaData}/>
            <Box px={7} py={10}>
                <HeadingWithSearch
                    handleClick={() => setOpen(true)}
                    btnLabel={
                        <>
                            <Plus />Create Automation
                        </>
                    }
                    search={search}
                    setSearch={setSearch}
                    path={['Home', 'Automations']}
                    heading={'My Automations'}
                />
                <AutomationTable search={search} handleOpen={() => setOpen(true)} />
                <CustomDailog
                    open={open}
                    setOpen={setOpen}
                    heading={'Select Account'}
                    buttonLabel={'Next'}
                    disabled={selectedAccountId === null}
                    handleClick={handleNext}
                    handleClose={handleCloseAccountDailog}
                    description={'Select Account Which you want to automate.'}
                >
                    <AutomationAccounts
                        selectedAccountId={selectedAccountId}
                        handleClick={handleSelect}
                    />
                </CustomDailog>
            </Box>
        </>
    );
};

export default page;
