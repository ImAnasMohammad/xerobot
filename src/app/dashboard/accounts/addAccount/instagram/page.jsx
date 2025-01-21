
'use client'
import InstagramIcon from '@/components/custom/icons/InstagramIcon'
import YoutubeIcon from '@/components/custom/icons/YoutubeIcon'
import { Button } from '@/components/ui/button'
import { useColorModeValue } from '@/components/ui/color-mode'
import useColors from '@/hooks/useColors'
import { handleInstagramLogin } from '@/utils/handleInstagramLogin'
import { Box, Flex, Text } from '@chakra-ui/react'
import {  MoveLeft } from 'lucide-react'
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

const AddAccount = () => {
    const { bgShadedDark } = useColors();
    const router = usePathname();
    const platform  = router.split('/').pop().toLocaleLowerCase();
    const handleClick = () => {
        console.log(platform)
        if(platform==='instagram'){
            const response = handleInstagramLogin();            
        }

    }
    return (
        <Flex minHeight={'100dvh'} >
            <Flex as="div" flex={'1 1 50%'} p={10} width={'full'} flexDirection={'column'} >
                <Box as={'div'}>
                    <Button variant="outline"><MoveLeft /> Back</Button>
                </Box>
                <Flex as={'div'} height={'100%'} flexDirection={'column'} alignItems='center' justifyContent={'center'}  >
                    <InstagramIcon width={300} height={300} />
                    <Text fontSize={'3xl'}>Let's get Start with new one...!</Text>
                </Flex>
            </Flex>
            <Flex
                as={'div'}
                bg={useColorModeValue('red', bgShadedDark)}
                flex={'1 0 50%'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <InstagramCard handleClick={handleClick}/>
            </Flex>
        </Flex>
    )
}

const InstagramCard = ({handleClick}) => {
    return <Flex as={'div'} gap={7} flexDirection={'column'}>
        <Text fontSize={'2xl'} as={'h1'} fontWeight={'bold'}>
            Few requirements need to connect with instagram
        </Text>
        <Box as={'div'}>
            <ul style={{ padding: '0px 0px 0px 30px', listStyleType: 'arrow' }}>
                <li>
                    <Text fontSize={'lg'} pb={'5px'}>
                        Instagram account must be business or creator account
                    </Text>
                </li>
                <li>
                    <Text fontSize={'lg'}>
                        Instagram account must be connected with facebook page
                    </Text>
                </li>
            </ul>
        </Box>
        <Box as="div" pt={3}>
            <Button onClick={handleClick}>Go to instagram</Button>
        </Box>
    </Flex>
}

export default AddAccount