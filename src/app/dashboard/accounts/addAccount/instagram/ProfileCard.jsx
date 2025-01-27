import { Button } from '@/components/ui/button'
import {  Flex,Text } from '@chakra-ui/react'
import React from 'react'

const ProfileCard = ({name,img,handleClick,btnLabel="Continue",loading=false,disabled=false,button=true}) => {
  return (
    <Flex gap={5} flexDir={'column'} alignItems={"center"} width={'200px'} as={'div'}>
        <img
            style={{
                borderRadius:'50%'
            }}
            src={img}
            alt={name}
            height={100}
            width={100}
        />  
        <Text fontSize={'xl'} as={'p'}>{name}</Text>
        {
          button && <Button width="100%" disabled={disabled} onClick={handleClick} loading={loading}>{btnLabel}</Button>
        }
    </Flex>
  )
}

export default ProfileCard