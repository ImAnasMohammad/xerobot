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
import LinkReply from '../../components/LinkReply';
import { isValidURL } from '@/utils/validate';
import CommmentReply from '../../components/CommmentReply';


const page = ({params}) => {

    const [loading, setLoading] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const handleSelectPost = (meidaId) => setSelectedPost(meidaId);
    const {id} = useParams();

    const [automation,setAutomation] = useState({
        message: '',
        trigger: '',
        title:'',
        url:'',
        accountId: id,
        name:'Comment automation',
        type:'blend-comment',
        commentReply:'',
    });

    const handleValue = (name, value) => {
        let tempData = { ...automation };
        tempData[name] = value
        setAutomation({...tempData});
    }

    const handleValidate = async()=>{
        if(!automation.url && isValidURL(automation.url)){
          toastError("Please enter a valid URL");
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
                    <Text fontSize={'lg'}>They’ll receive this link and message in their DM with comment reply</Text>
                    <Flex flexDir={'column'} gap={7}>
                      <CommmentReply
                        handleValue={handleValue}
                        value={automation.commentReply}
                        loading={loading}
                      />
                      <DirectReply
                        handleValue={handleValue}
                        value={automation.message}
                        loading={loading}
                      />
                      <LinkReply
                        handleValue={handleValue}
                        loading={loading}
                        title={automation.title}
                        url={automation.url}
                      />
                    </Flex>
                </Flex>
            </AutomationResponse>
        </Main>
    )
}

export default page