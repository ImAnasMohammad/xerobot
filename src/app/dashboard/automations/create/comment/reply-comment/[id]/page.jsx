'use client';
import React, { useState } from 'react'
import Main from '../../Main'
import CommmentReply from '../../components/CommmentReply'
import SelectMedia from '../../SelectMedia';
import AutomationResponse from '../../AutomationResponse';
import { useParams } from 'next/navigation';
import { Flex, Text } from '@chakra-ui/react';
import { handleSubmit } from '../../handlers';
import { toastError } from '@/components/custom/toast';


const page = ({params}) => {

    const [loading, setLoading] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const handleSelectPost = (meidaId) => setSelectedPost(meidaId);
    const {id} = useParams();

    const [automation,setAutomation] = useState({
        commentReply: '',
        trigger: '',
        accountId: id,
        name:'Comment automation',
        type:'reply-comment'
    });

    const handleValue = (name, value) => {
        let tempData = { ...automation };
        tempData[name] = value
        setAutomation({...tempData});
    }

    const handleValidate = async()=>{
        if(!automation.commentReply){
            toastError("Please enter a comment reply")
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
                    <Text fontSize={'lg'}>They’ll receive the comment reply</Text>
                    <Flex flexDir={'column'} gap={7}>
                        <CommmentReply
                            value={automation['commentReply']}
                            handleValue={handleValue}
                            loading={loading}
                        />
                    </Flex>
                </Flex>
            </AutomationResponse>
        </Main>
    )
}

export default page