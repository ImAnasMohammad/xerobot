'use client'
import PageHeading from '@/components/custom/PageHeading'
import { useColorModeValue } from '@/components/ui/color-mode'
import useColors from '@/hooks/useColors'
import { Box, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { GalleryHorizontalEnd, MessageCircle, Send, Zap, Link2 } from 'lucide-react'
import { usePathname } from 'next/navigation' 

const page = () => {
  const router = usePathname();
  const id  = router.split('/').pop().toLocaleLowerCase();
  const commentAutomationUrl = (label) => `/dashboard/automations/create/comment/${label}/${id}`
  const messageAutomationUrl = (label) => `/dashboard/automations/create/message/${id}`
  const commentAutomations =[
    {
      heading:'Auto-reply for comments',
      description:'Automatically send reply to a comment',
      isPremium:false,
      label:"reply-comment",
      href:commentAutomationUrl('reply-comment'),
      Icon:MessageCircle
    },
    {
      heading:'Auto DM via comments',
      description:'Automatically send message from comment',
      isPremium:false,
      label:"dm-comment",
      href:commentAutomationUrl('dm-comment'),
      Icon:Send
    },
    {
      heading:'Blended Reply',
      description:'Automatically send comment reply, message, link and Image from comment',
      isPremium:false,
      label:'blend-comment',
      href:commentAutomationUrl('blend-comment'),
      Icon:Zap
    }
  ]
  const storyAutomations =[
    {
      heading:'Auto DM via Story',
      description:'Automatically send text message as reply to a story',
      isPremium:false,
      label:"reply-story",
      Icon:GalleryHorizontalEnd
    },
    {
      heading:'Auto DM via story',
      description:'Automatically send text message and link as reply to a story',
      isPremium:false,
      label:"dm-comment",
      Icon:Link2
    },
    {
      heading:'Blended Reply',
      description:'Automatically send text message, link and Image as reply to a story',
      isPremium:false,
      label:'dm-reply-comment',
      Icon:Zap
    }
  ]

  const messageAutomation = [
    {
      heading:'Auto DM',
      description:'Automatically send text message, link and Image.',
      isPremium:false,
      href:messageAutomationUrl(),
      Icon:Zap
    }
  ]
  return (
    <Box px={7} py={10}>
      <PageHeading path={['Home', 'Automations', 'Select automation']}>Select Automation</PageHeading>
      <Flex as='div' gap={10} py={10} flexDirection={'column'} >
        <Section heading={'Comment Automations'} items={commentAutomations}/>
        {/* <Section heading={'Story Automations'} items={storyAutomations}/> */}
        {/* <Section heading={'Message Automations'} items={messageAutomation}/> */}
      </Flex>
    </Box>
  )
}


const Section = ({heading,items})=>{
  return <Box>
  <Text fontSize={'2xl'}>{heading}</Text>
      <Flex
        flexWrap={'wrap'}
        gap={26}
        justifyContent={'space-between'}
        mt={4}
        mx={'auto'}
      >
        {
          items?.map((type)=><Link href={type.href ?? ''} key={type.href ?? ''}>
            <Item details={type} />
          </Link>)
        }
      </Flex>
  </Box>
}


const Item = ({details:{heading,description,Icon}})=>{
  const {textUltraShadedDark} = useColors();
  return <Box
  borderRadius="md"
  boxShadow="xs"
  py={5}
  px={10}
  overflow={'hidden'}
  minW={'full'}
  width={'400px'}
  height={'full'}
  border={useColorModeValue('1px solid rgba(30,30,30,0.2)', '1px solid rgba(30,30,30,0.2)')}
  _hover={{
    border:
    useColorModeValue('1px solid rgba(150,120,120,0.2)', '1px solid rgba(170,170,170,0.9)') 
  }}
>
  <Flex justifyContent={'center'} width={'100%'} p={10} fontSize={'2xl'}>
    <Icon height="fit-content" width="70px" as={Icon}/>
  </Flex>
  <Text fontSize={'2xl'}>{heading}</Text>
  <Text fontSize={'sm'} mt={1} color={useColorModeValue('#000',textUltraShadedDark)}>{description}</Text>

</Box>
}

export default page