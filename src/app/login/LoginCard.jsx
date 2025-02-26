'use client'

import { useColorModeValue } from "@/components/ui/color-mode"
import LoginWithGoogle from "./GoogleLogin/LoginWithGoogle"
import { Flex, Text } from "@chakra-ui/react"
import useColors from "@/hooks/useColors"
import Link from "next/link"

export default function LoginCard(){
    const {bgShadedDark,textDark,textLight} = useColors()
    return <Flex
        as={'div'}
        bg={useColorModeValue('',bgShadedDark)}
        flex={'1 0 50%'}
        justifyContent={'center'}
        alignItems={'center'}
    >
        <Flex as={'div'} gap={10} flexDirection={'column'} alignItems={'center'}>
            <Text color={useColorModeValue(textLight,textDark)} fontSize={'3xl'} as={'h1'} fontWeight={'bold'} textTransform={'capitalize'}>
                Welcome Back to Xerobyte
            </Text>
            <Flex gap={5} w="300px" direction={'column'} mb={20}>
                <LoginWithGoogle/>
            </Flex>
            <Flex justifyContent={'space-between'} w={'100%'} flex={'1 1 auto'} >
                <Link href={'/terms'}><Text color={'blue.500'} fontSize={'xs'}>Terms of Service</Text></Link>
                <Link href={'/policy'}><Text color={'blue.500'} fontSize={'xs'}>Privacy Policcy</Text></Link>
            </Flex>
        </Flex>     
    </Flex> 
}