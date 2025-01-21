import React from 'react'
import { Flex, Stack } from "@chakra-ui/react"
import { Skeleton, SkeletonCircle } from "@/components/ui/skeleton"

const ProfileSkeleton = ({circleSize=20,lineHeight=5,direction="column"}) => {
  return (
    <Flex gap="5" flexDirection={direction} as={'div'} width={'200px'} alignItems={"center"}>
      <SkeletonCircle size={circleSize} />
      <Skeleton height={lineHeight} width={'100%'} />
    </Flex>
  )
}

export default ProfileSkeleton

