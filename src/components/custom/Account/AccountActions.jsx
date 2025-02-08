import useColors from '@/hooks/useColors';
import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { IoSync } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";
import CustomButtom from '../CustomButton';




const AccountActions = ({
    handleRemove,
    handleRegenerate
}) => {
    return (
        <Flex gap={5} alignContent={'center'} justifyContent={'center'}>
            <CustomButtom onClick={handleRegenerate} Icon={IoSync} title={'Regenarate Your Permissions'}/>
            <CustomButtom onClick={handleRemove} Icon={MdOutlineDeleteOutline} title={'Remove Account'} textColor={'red'}/>
        </Flex>
    )
}

export default AccountActions