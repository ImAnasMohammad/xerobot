'use client'

import { Flex } from '@chakra-ui/react';
import React from 'react'
import SelectMedia from './SelectMedia';
import AutomationResponse from './AutomationResponse';

const Main = ({children}) => {

  return (
    <Flex
      as={'div'}
      height={'100%'}
      width={'95%'}
      gap={4}
      px={0}
      py={10}
      margin={'auto'}
      justifyContent={'center'}
    >
      <Flex
        as={'div'}
        height={'100%'}
        width={'95%'}
        gap={4}
        px={0}
        py={10}
        margin={'auto'}
        justifyContent={'center'}
        overflow={'hidden'}
      >
        {
            children
        }

      </Flex>
    </Flex>
  )
}

export default Main