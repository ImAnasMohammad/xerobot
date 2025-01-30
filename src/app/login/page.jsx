"use client";
import React, { useState } from "react";
import { Button, VStack, Box, Center, Text, Stack, Flex } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import useColors from "@/hooks/useColors";
import InstagramIcon from "@/components/custom/icons/InstagramIcon";
import FaceBookIcon from "@/components/custom/icons/FaceBookIcon";
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import Link from "next/link";
import LoginWithGoogle from "./GoogleLogin/LoginWithGoogle";

const LoginPage = () => {
  const { bgShadedDark } = useColors();
  const handleFacebookLogin = () => {
    console.log("Facebook login triggered");
    // Add your Facebook login functionality here
  };


  return (
    <Flex minHeight={'100dvh'} >
      <Flex as="div" flex={'1 1 50%'} p={10} width={'full'} flexDirection={'column'} >
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
        <LoginCard/>
      </Flex>
    </Flex>
  )

};

const LoginCard = () => {
  return <Flex as={'div'} gap={10} flexDirection={'column'} alignItems={'center'}>
    <Text fontSize={'3xl'} as={'h1'} fontWeight={'bold'} textTransform={'capitalize'}>
      Welcome Back to chatSync
    </Text>
    <Flex gap={5} w="300px" direction={'column'} mb={20}>
      <LoginWithGoogle/>
      {/* <FacebookLogin
        appId="611965981306653"
        autoLoad={true}
        callback={()=>{}}
        fields="name,email,picture"
        scope="public_profile,user_friends,user_actions.books"
        render={renderProps => (
          <Button onClick={renderProps.onClick}><FaceBookIcon/>continue with facebook</Button>
        )}
      /> */}
    </Flex>
    <Flex justifyContent={'space-between'} w={'100%'} flex={'1 1 auto'} >
      <Link href={''}><Text color={'blue.500'} fontSize={'xs'}>Terms of Service</Text></Link>
      <Link href={''}><Text color={'blue.500'} fontSize={'xs'}>Privacy Policcy</Text></Link>
    </Flex>
  </Flex>
}


export default LoginPage;
