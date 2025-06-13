import { Flex } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

const Logo = ({width=100,height=0}) => {

  const path = './logos/black/black-big.svg';
  return (
    <Flex>
        <Image src={path}  width={width} height={height} alt={process.env.NEXT_PUBLIC_APP_NAME ?? 'Xerobot'}/>
    </Flex>
  )
}

export default Logo