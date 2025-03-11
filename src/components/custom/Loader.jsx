
import {  Flex, Spinner } from '@chakra-ui/react'

const Loader = () => {
  return (
    <Flex height={'100dvw'} width={'100vw'} justify={'center'} align={'center'}>
      <Spinner size="xl" />
    </Flex>
  )
}

export default Loader