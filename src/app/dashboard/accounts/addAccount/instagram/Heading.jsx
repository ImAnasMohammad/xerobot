'use client'

import { useColorModeValue } from '@/components/ui/color-mode'
import useColors from '@/hooks/useColors'
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Heading = ({
    heading="Confirm It's You",
    subHeading="Make Sure It's Your Account",
    headingStyles={},
    subHeadingStyles={}
}) => {
    const {textUltraShadedDark} = useColors();
  return (
    <Flex flexDir={'column'} alignItems={'center'} gap={1}>
        <Text
            as={'h1'}
            fontSize={'4xl'}
            style={headingStyles}
        >
            {
                heading
            }
        </Text>
        <Text
            color={useColorModeValue('red',textUltraShadedDark)}
            style={subHeadingStyles}
        >
            {
                subHeading
            }
        </Text>
    </Flex>
  )
}

export default Heading