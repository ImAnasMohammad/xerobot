import { Button } from '@/components/ui/button';
import { useColorModeValue } from '@/components/ui/color-mode';
import useColors from '@/hooks/useColors';
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import CommmentReply from './components/CommmentReply';
import DirectReply from './components/DirectReply';
import LinkReply from './components/LinkReply';
import InputForAutomation from './components/InputForAutomation';

const AutomationResponse = ({ setAutomationData, automationData, handleSubmit, loading }) => {
  const { bgShadedDark } = useColors();

  const tempTriggers = ['Link','DM','Send','Join','Details'];

  const handleValue = (name, value) => {
    let tempData = { ...automationData };
    tempData[name] = value
    setAutomationData(tempData);
  }
  return (
    <Flex
      as={'div'}
      flex={1}
      height={'100%'}
      py={5}
      px={5}
      pr={10}
      border={`1px solid ${useColorModeValue('#0000', bgShadedDark)}`}
      overflow={'auto'}
      maxWidth={'600px'}
      flexDirection={'column'}
      gap={10}
    >
      <PoliteRemidnerMessage/>
      <Box>
          <InputForAutomation
            heading={'Enter Automation name'}
            name="name"
            value={automationData['name']}
            handleValue={handleValue}
            placeholder='Enter your name here...'
            disabled={loading}
            type='input'
          />
        </Box>
      <Flex  flexDir={'column'} gap={5}>
        <Box>
          <InputForAutomation
            heading={'Enter Trigger'}
            name="trigger"
            value={automationData['trigger']}
            handleValue={handleValue}
            placeholder='Enter your trigger here...'
            disabled={loading}
            type='input'
          />
        </Box>
        <Flex gap={5}>
          {
            tempTriggers.map(item=><Button
              variant='outline'
              style={{borderRadius:'10px'}}
              onClick={()=>handleValue('trigger',item)}
              key={item}
            >
              {item}
            </Button>)
          }
        </Flex>
      </Flex>
      <Flex pt={5} flexDir={'column'} gap={10}>
        <Text fontSize={'lg'}>They’ll receive the DM including links</Text>
        <Flex flexDir={'column'} gap={7}>
          {/* <ImageReply value={automationData['imageUrl']} handleValue={handleValue} loading={loading}/> */}
          <CommmentReply value={automationData['commentReply']} handleValue={handleValue} loading={loading}/>
          <DirectReply value={automationData['message']} handleValue={handleValue} loading={loading}/>
          <LinkReply url={automationData['url']} title={automationData['title']} handleValue={handleValue} loading={loading} />
        </Flex>
        {/* <Box as={'div'} >
          <SwitchForAutomation
            value={automationData?.askToFollow}
            heading={'Ask to Follow to receive the link'}
            handleValue={handleValue}
            name={'askToFollow'}
            disabled={loading}
          />
          {
            automationData?.askToFollow && <InputForAutomation value={automationData['initialMessage']} handleValue={handleValue} name="initialMessage" heading={"Initial message they'll get"} disabled={loading}/>
          }
        </Box> */}
      </Flex>
      
      <ButtonSection loading={loading} handleSubmit={handleSubmit}/>
    </Flex>
  )
}


const PoliteRemidnerMessage = ()=>{
  const {textUltraShadedDark} = useColors();
  return <Box>
    <Text fontSize={'md'} fontWeight={'bold'}>✨ Friendly Reminder:</Text>
    <Text fontSize={'sm'} mt={2} color={useColorModeValue('red',textUltraShadedDark)}>
      Please ensure that your messages are polite, respectful, and professional. 🙏
      Also, kindly review and comply with Instagram’s Privacy Policy & Community Guidelines to ensure a seamless experience. ✅
      Happy Automating! 🚀
    </Text>
  </Box>
}

const ButtonSection = ({loading,handleSubmit})=>{
  return<Flex width={'100%'} justifyContent={'space-between'}>
  <Button fontSize={'md'} style={{ letterSpacing: '.5px' }} width={'90px'} variant='outline' disabled={loading} >Back</Button>
  <Button
    fontSize={'md'}
    style={{ letterSpacing: '.5px' }}
    loading={loading}
    disabled={loading}
    onClick={handleSubmit}
  >Set to live</Button>
</Flex>
}
export default AutomationResponse;