import Heading from '@/app/dashboard/accounts/addAccount/instagram/Heading'
import PostSkeleton from '@/components/custom/PostSkeleton'
import { toastError } from '@/components/custom/toast'
import { useColorModeValue } from '@/components/ui/color-mode'
import useColors from '@/hooks/useColors'
import { sendGet } from '@/utils/sendRequest'
import { Box, SimpleGrid, Text, Image } from '@chakra-ui/react'

import { Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';

const SelectMedia = ({ selectedPost, handleSelectPost, id }) => {
    const { bgShadedDark, bgLight } = useColors();
    return <Box
        as={'div'}
        flex={1}
        height={'100%'}
        border={`1px solid ${useColorModeValue(bgLight, bgShadedDark)}`}
        py={5}
        px={5}
        pr={10}
        overflow={'auto'}
        maxWidth={'500px'}
    >
        <Heading
            heading='Select Post'
            subHeading='Select your post which you want to automate.'
            headingStyles={{ width: '100%' }}
            subHeadingStyles={{ width: '100%' }}
        />
        <Box mt={10}>
            <MyPosts
                handleSelectPost={handleSelectPost}
                selectedPost={selectedPost}
                id={id}
            />
        </Box>
    </Box>
}


const MyPosts = ({ handleSelectPost, selectedPost, id }) => {

    const [posts, setPosts] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const arr = [1, 2, 4, 5, 6, 7];
    const router = useRouter()
    const getPosts = async () => {
        setLoading(true);
        const res = await sendGet({ url: `/api/instagram/getDetails/instagramMedia?id=${id}` });

        if (res?.success) {
            console.log(res);
            setPosts([...res.media]);
        }
        if (!res?.success) {
            toastError(res?.message || 'Something went wrong');
            setError(res?.message || 'Something went wrong');
            if (res?.accessTokenExpired) {
                router.push('/dashboard/accounts')
            }
        }
        setLoading(false);

    }

    useEffect(() => {
        getPosts();
    }, [])

    return <Box>
        <Box>
            <Text fontSize={'md'} >My Posts</Text>
            {error && <Text color={'red.500'} fontSize={'sm'} mt={1} textTransform={'capitalize'} >{error}</Text>}
        </Box>
        <SimpleGrid
            columns={{ base: 2, sm: 2, md: 3, lg: 3 }}
            spacing={4}
            py={5}
            gap={5}
        >
            {
                loading ? arr.map(post => <PostSkeleton key={post} height={'70px'} width='107px' />) :
                    !error && posts?.map(post => <Post key={post?.id} post={post} handleSelectPost={handleSelectPost} isSelected={selectedPost?.id == post?.id} />)
            }
        </SimpleGrid>
    </Box>
}


const Post = ({ post, handleSelectPost, isSelected }) => {
    const { thumbnail_url, media_url } = post;
    const {whiteBgLight} = useColors();
    return <Box
        position="relative"
        cursor={!isSelected && 'pointer'}
        onClick={() => !isSelected && handleSelectPost(post)}
        borderWidth={'1.5px'}
        borderRadius="md"
        overflow="hidden"
        aspectRatio={'1 / 1'}
    >
        <Box
            position="absolute"
            top={0}
            right={0}
            bottom={0}
            left={0}
            bg={useColorModeValue('rgba(0,0,0,0.1)', "rgba(0, 0, 0, 0.6)")}
            display="flex"
            alignItems="center"
            justifyContent="center"
            transition={'0.5s all'}
            opacity={isSelected ? 1 : 0}

        >
            <Check w={8} h={8} color={useColorModeValue(whiteBgLight)} />
        </Box>
        <Image
            src={thumbnail_url ?? media_url}
            alt={post.caption}
            objectFit="cover"
            w='100%'
        />
    </Box>
}
export default SelectMedia