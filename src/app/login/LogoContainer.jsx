'use client'
import Logo from "@/components/custom/Logo"
import { useColorModeValue } from "@/components/ui/color-mode"
import { Flex } from "@chakra-ui/react"


const LogoContainer = () => {
  return (
    <Flex as="div" display={{mdDown:'none'}} flex={'1 1 50%'} p={10} width={'full'} flexDirection={'column'} bg={useColorModeValue('#000')}>
        <Flex as={'div'} height={'100%'} flexDirection={'column'} alignItems='center' justifyContent={'center'}  >
            <Logo width={500} />
        </Flex>
    </Flex>
  )
}

export default LogoContainer