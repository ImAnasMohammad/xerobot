import Heading from '@/app/dashboard/accounts/addAccount/instagram/Heading'
import PostSkeleton from '@/components/custom/PostSkeleton'
import { useColorModeValue } from '@/components/ui/color-mode'
import useColors from '@/hooks/useColors'
import { sendGet } from '@/utils/sendRequest'
import { Box, SimpleGrid, Text,Image } from '@chakra-ui/react'

import { Check } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const SelectMedia = ({selectedPost,handleSelectPost,id}) => {
    const { bgShadedDark } = useColors();
    return <Box
        as={'div'}
        flex={1}
        height={'100%'}
        border={`1px solid ${useColorModeValue('#0000', bgShadedDark)}`}
        py={5}
        px={5}
        pr={10}
        overflow={'auto'}
        maxWidth={'500px'}
    >
        <Heading
            heading='Select Post'
            subHeading='Select your post which you want to automate.'
            headingStyles={{ width:'100%' }}
            subHeadingStyles={{ width:'100%' }}
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


const MyPosts = ({handleSelectPost,selectedPost,id})=>{

    const [posts,setPosts]=useState();
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null)
    const arr = [1,2,4,5,6,7];
    const getPosts = async()=>{
        setLoading(true);
        const res = await sendGet({ url: `/api/instagram/getDetails/instagramMedia?id=${id}` });

        console.log(res)
        
        if (res?.success) {
            console.log(res);
            setPosts([...res.media]);
        }
        if(!res?.success){
            toast.error(res?.message || 'Something went wrong');
            setError(res?.message || 'Something went wrong');
        }
        setLoading(false);
        
    }

    useEffect(()=>{
        getPosts();
    },[])
    
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
                    loading ? arr.map(post=><PostSkeleton key={post} height={'70px'} width='107px'/>):
                    !error && posts?.map(post=><Post key={post?.id} post={post} handleSelectPost={handleSelectPost} isSelected={selectedPost?.id==post?.id} />)
                }
        </SimpleGrid>
    </Box>
}


const Post = ({post,handleSelectPost,isSelected})=>{
    const {thumbnail_url,media_url}  = post;
    return <Box
    position="relative"
    cursor={!isSelected && 'pointer'}
    onClick={() => !isSelected && handleSelectPost(post)}
    borderWidth={'1.5px'}
    borderRadius="md"
    overflow="hidden"
    p={3}
  >
    <Box
        position="absolute"
        top={0}
        right={0}
        bottom={0}
        left={0}
        bg="rgba(0, 0, 0, 0.6)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        transition={'0.5s all'}
        opacity={isSelected?1:0}

    >
        <Check w={8} h={8}/>
    </Box>
    <Image
      src={thumbnail_url ?? media_url}
      alt={post.caption}
      objectFit="cover"
      h="60px"
      w='100%'
    />   
    </Box>
}
export default SelectMedia