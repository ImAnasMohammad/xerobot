import { Skeleton } from '@chakra-ui/react'
import React from 'react'

const PostSkeleton = ({height='100%',width='100%'}) => {
  return <Skeleton height={height} width={width} />
}

export default PostSkeleton