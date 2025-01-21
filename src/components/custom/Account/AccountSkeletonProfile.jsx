import { SkeletonCircle } from '@/components/ui/skeleton'
import { Flex, HStack, Skeleton } from '@chakra-ui/react'
import React from 'react'

const AccountSkeletonProfile = (
    {
        id,
        circleRadius=20,
        lineHeight=5,
        gap=4,
        lineWidth="100%",
        direction='row',
        alignItems="flex-start",
        justifyContent="flex-start",
    }) => {
  return (
    <Flex
        key={id}
        gap={gap}
        direction={direction}
        alignItems={alignItems}
        justifyContent={justifyContent}
    >
        <SkeletonCircle size={circleRadius} />
        <Skeleton height={lineHeight} width={lineWidth} />
    </Flex>
  )
}

export default AccountSkeletonProfile