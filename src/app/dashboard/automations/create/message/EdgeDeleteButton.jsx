import { Button } from '@/components/ui/button'
import { Box } from '@chakra-ui/react'
import React from 'react'

const EdgeDeleteButton = ({data}) => {

    const top = data?.top || 0;
    const left = data?.left || 0;
    return (
        <Box position={'absolute'} opacity={ top } transitionDuration={'5s'} transitionProperty={'opacity'} top={`${top}px`} left={left} zIndex={1}>
            <Button>Edit</Button>
            <Button>Delete</Button>
        </Box>
    )
}

export default EdgeDeleteButton