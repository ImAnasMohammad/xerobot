import { Button } from '@chakra-ui/react'
import React from 'react'

const LoginButton = ({children,...attr}) => {
    return (
        <Button
            width="full"
            colorScheme="blue"
            bg={'#ffff'}
            border={'1px solid rgba(0,0,0,0.1)'}
            color={'#000'}
            py={5}
            fontSize={18}
            display={'flex'}
            justifyContent={'center'}
            textAlign={'center'}
            _hover={{ bg: 'rgba(150,150,150,0.1)' }}
            {...attr}
        >
            {
                children
            }
        </Button>
    )
}

export default LoginButton