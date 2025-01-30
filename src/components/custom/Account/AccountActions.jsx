import useColors from '@/hooks/useColors';
import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { IoSync } from "react-icons/io5";
import { IoCaretForward } from "react-icons/io5";
import { IoIosPause } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";




const AccountActions = ({
    pause=true,
    handleRemove,
    handlePause,
    handleResume,
    handleRegenerate
}) => {
    return (
        <Flex gap={5}>

            {
                pause ? 
                <CustomButtom onClick={handleResume} Icon={IoCaretForward} title={'Resume Automation'}/>:
                <CustomButtom onClick={handlePause} Icon={IoIosPause} title={'Pause Automation'}/>
            }
            
            <CustomButtom onClick={handleRegenerate} Icon={IoSync} title={'Regenarate Your Permissions'}/>
            <CustomButtom onClick={handleRemove} Icon={MdOutlineDeleteOutline} title={'Remove Account'} textColor={'red'}/>
            
        </Flex>
    )
}

const CustomButtom = ({title='Action',textColor=null,Icon,...props})=>{
    const {mainColor} = useColors();
    const color = textColor===null?'#ffff':textColor; 
    return <Button height={'fit-content'} width={'fit-content'} bg={'transparent'} color={color} {...props} _hover={{
        color:mainColor
    }} >
        <abbr title={title}>
            <Icon/>
        </abbr>
    </Button>
}

export default AccountActions