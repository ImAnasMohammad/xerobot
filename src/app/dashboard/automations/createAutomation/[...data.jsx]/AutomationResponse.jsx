import { Button } from '@/components/ui/button';
import { useColorModeValue } from '@/components/ui/color-mode';
import useColors from '@/hooks/useColors';
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import InputForAutomation, { SwitchForAutomation } from './InputForAutomation';

const AutomationResponse = ({ setAutomationData, automationData, handleSubmit, loading }) => {
  const { bgShadedDark } = useColors();

  const handleValue = (name, value) => {
    let tempData = { ...automationData };
    tempData[name] = value
    setAutomationData(tempData);
  }
  return (
    <Box
      as={'div'}
      flex={1}
      height={'100%'}
      py={5}
      px={5}
      pr={10}
      border={`1px solid ${useColorModeValue('#0000', bgShadedDark)}`}
      overflow={'auto'}
      maxWidth={'600px'}
    >
      <Flex width={'100%'} justifyContent={'space-between'}>
        <Button fontSize={'md'} style={{ letterSpacing: '.5px' }} width={'90px'} variant='outline'>Back</Button>
        <Button
          fontSize={'md'}
          style={{ letterSpacing: '.5px' }}
          width={'90px'}
          loading={loading}
          disabled={loading}
          onClick={handleSubmit}
        >Live</Button>
      </Flex>
      <Flex pt={14} flexDir={'column'} gap={10}>
        <Text fontSize={'lg'}>They’ll receive the DM including links</Text>
        <Flex flexDir={'column'} gap={7}>
          <InputForAutomation
            heading={'Enter Comment Reply'}
            name="commentReply"
            value={automationData['commentReply']}
            handleValue={handleValue}
            placeholder='Enter your reply here...'
            disabled={loading}
            type='input'
          />
          <InputForAutomation
            heading={'Enter Direct Message'}
            name="message"
            value={automationData['message']}
            handleValue={handleValue}
            placeholder='Enter your message here...'
            disabled={loading}
          />
          <InputForAutomation
            heading={'Enter link'}
            name="url"
            value={automationData['url']}
            handleValue={handleValue}
            type='input'
            disabled={loading}
          // placeholder='Enter your link'
          />
          <InputForAutomation
            heading={'Enter Link Label'}
            name="label"
            value={automationData['label']}
            handleValue={handleValue}
            type='input'
            disabled={loading}
          // placeholder='Enter your Link label...'
          />
        </Flex>
        <Box as={'div'} >
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
        </Box>
      </Flex>
    </Box>
  )
}

export default AutomationResponse;