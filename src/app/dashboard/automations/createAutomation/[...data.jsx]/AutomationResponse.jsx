import { Button } from '@/components/ui/button';
import { useColorModeValue } from '@/components/ui/color-mode';
import useColors from '@/hooks/useColors';
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import InputForAutomation, { SwitchForAutomation } from './InputForAutomation';

const AutomationResponse = ({ setAutomationData, automationData, handleSubmit, loading }) => {
  const { bgShadedDark } = useColors();

  const tempTriggers = ['Link','DM','Send','Join','Details'];

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
        <Button fontSize={'md'} style={{ letterSpacing: '.5px' }} width={'90px'} variant='outline' disabled={loading} >Back</Button>
        <Button
          fontSize={'md'}
          style={{ letterSpacing: '.5px' }}
          loading={loading}
          disabled={loading}
          onClick={handleSubmit}
        >Set to live</Button>
      </Flex>
      <Flex pt={14} flexDir={'column'} gap={5}>
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
            name="direactMessage"
            value={automationData['direactMessage']}
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