import { Flex } from '@chakra-ui/react'
import React from 'react'
import LoginCard from './LoginCard'
import LogoContainer from './LogoContainer'

const Main = () => {
  return (
    <Flex minHeight={'100dvh'} >
        <LogoContainer/>
        <LoginCard/>
    </Flex>
  )
}

export default Main