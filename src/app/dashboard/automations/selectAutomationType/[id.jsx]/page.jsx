'use client'
import PageHeading from '@/components/custom/PageHeading'
import { useColorModeValue } from '@/components/ui/color-mode'
import useColors from '@/hooks/useColors'
import { Box, Button, Flex, GridItem, Icon, SimpleGrid, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { MessageCircle, Send, Zap } from 'lucide-react'
import { usePathname } from 'next/navigation'

const page = () => {
  const router = usePathname();
  const id  = router.split('/').pop().toLocaleLowerCase();
  const data =[
    {
      heading:'Auto DM via comments',
      description:'Automatically send direct messages from comments.',
      isPremium:false,
      label:"dm-comment",
      Icon:Send
    },
    {
      heading:'Auto-reply for comments',
      description:'Automatically send reply for a comment',
      isPremium:false,
      label:"reply-comment",
      Icon:MessageCircle
    },
    {
      heading:'Blended Reply',
      description:'Automatically send reply and direct messages from comment',
      isPremium:false,
      label:'dm-reply-comment',
      Icon:Zap
    }
  ]
  return (
    <Box px={7} py={10}>
      <PageHeading path={['Home', 'Automations', 'Select automation']}>Select Automation</PageHeading>
      <SimpleGrid
        columns={{ base: 1, sm: 1, md: 1,lg:3 }}
        gap={4}
        py={10}
        justifyItems={'center'}
      >
        {
          data?.map((type)=><Link href={`/dashboard/automations/createAutomation/${type.label}/${id}`} key={type?.label ?? ''}>
            <Item details={type} />
          </Link>)
        }
      </SimpleGrid>
    </Box>
  )
}


const Item = ({details:{heading,description,Icon}})=>{
  const {textUltraShadedDark} = useColors();
  return <GridItem
  borderRadius="md"
  boxShadow="xs"
  py={5}
  px={10}
  width={'fit-content'}
  overflow={'hidden'}
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

</GridItem>
}

export default page