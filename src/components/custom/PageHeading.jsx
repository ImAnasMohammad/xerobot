
'use client'
import { Flex, Text } from '@chakra-ui/react'
import React from 'react';
import useColors from '@/hooks/useColors';
import { useColorModeValue } from '../ui/color-mode';

const PageHeading = ({children,path}) => {
  const pathActual = Array.isArray(path) && path?.map((item,index)=>index==path.length-1 ? ` ${item} `:`${item} / `);
  const {textDark,textUltraShadedDark,textLight,textUltraShadedLight} = useColors();

  return (
    <Flex direction={'column'} as={'div'} style={
                  {
                    height:'fit-content',
                  }
                }
    >
      <Text fontSize={'3xl'} as={'p'} color={useColorModeValue(textLight,textDark)}>
        {
          children
        }
      </Text>
      <Text fontSize={'sm'} fontWeight={'medium'} as={'p'} color={useColorModeValue(textUltraShadedLight,textUltraShadedDark)}>
        {
          pathActual
        }
      </Text>
    </Flex>
  )
}

export default PageHeading