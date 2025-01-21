import useColors from '@/hooks/useColors';
import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { MdLinkOff } from "react-icons/md";
import { IoSync } from "react-icons/io5";
import { IoCaretForward } from "react-icons/io5";
import { IoIosPause } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdLink } from "react-icons/md";




const AccountActions = ({
    likned=true,
    pause=true,
    handleLink,
    handleUnLink,
    handleRemove,
    handlePause,
    handleResume,
    handleRegenerate
}) => {
    return (
        <Flex gap={5}>
            {
                likned ? <>
            
                    <CustomButtom onClick={handleUnLink} Icon={MdLinkOff} title={'Unlink Your Account'}/>
                    <CustomButtom onClick={handleRegenerate} Icon={IoSync} title={'Regenarate Your Token'}/>
                    {
                        pause ? 
                        <CustomButtom onClick={handleResume} Icon={IoCaretForward} title={'Resume Automation'}/>:
                        <CustomButtom onClick={handlePause} Icon={IoIosPause} title={'Pause Automation'}/>
                    }
                </>:<>
                    <CustomButtom onClick={handleLink} Icon={MdLink} title={'Link Account'}/>
                    <CustomButtom onClick={handleRemove} Icon={MdOutlineDeleteOutline} title={'Remove Account'} textColor={'red'}/>
                </>
            }
            
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