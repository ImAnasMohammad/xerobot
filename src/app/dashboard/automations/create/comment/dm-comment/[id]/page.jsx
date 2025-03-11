'use client';
import React, { useState } from 'react'
import Main from '../../Main'
import SelectMedia from '../../SelectMedia';
import AutomationResponse from '../../AutomationResponse';
import { useParams } from 'next/navigation';
import { Flex, Text } from '@chakra-ui/react';
import { handleSubmit } from '../../handlers';
import { toastError } from '@/components/custom/toast';
import DirectReply from '../../components/DirectReply';


const page = ({params}) => {

    const [loading, setLoading] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const handleSelectPost = (meidaId) => setSelectedPost(meidaId);
    const {id} = useParams();

    const [automation,setAutomation] = useState({
        message: '',
        trigger: '',
        accountId: id,
        name:'Comment automation',
        type:'dm-comment',
    });

    const handleValue = (name, value) => {
        let tempData = { ...automation };
        tempData[name] = value
        setAutomation({...tempData});
    }

    const handleValidate = async()=>{
        if(!automation.message){
            toastError("Please enter a message");
            return;
        }
        setLoading(true);
        await handleSubmit(automation,selectedPost);
        setLoading(false);
    }
    

    return (
        <Main>
            <SelectMedia selectedPost={selectedPost} handleSelectPost={handleSelectPost} id={id}/>
            <AutomationResponse
                automationData={automation}
                setAutomationData={setAutomation}
                handleSubmit={handleValidate}
                loading={loading}
                handleValue={handleValue}
                name={automation['name']}
                trigger={automation['trigger']}
            >
                <Flex pt={5} flexDir={'column'} gap={10}>
                    <Text fontSize={'lg'}>They’ll receive this link and the message in their DM</Text>
                    <Flex flexDir={'column'} gap={7}>
                        <DirectReply
                          handleValue={handleValue}
                          value={automation.message}
                          loading={loading}
                        />
                    </Flex>
                </Flex>
            </AutomationResponse>
        </Main>
    )
}

export default page