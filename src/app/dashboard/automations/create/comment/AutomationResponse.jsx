import { Button } from '@/components/ui/button';
import { useColorModeValue } from '@/components/ui/color-mode';
import useColors from '@/hooks/useColors';
import { Box, Flex, Text } from '@chakra-ui/react'
import InputForAutomation from './components/InputForAutomation';
import { useRouter } from 'next/navigation';

const AutomationResponse = ({
  name='',
  trigger='',
  handleSubmit,
  loading,
  children,
  handleValue
 }) => {
  const { bgShadedDark,bgLight } = useColors();

  const tempTriggers = ['Link','DM','Send','Join','Details'];
  

  return (
    <Flex
      as={'div'}
      flex={1}
      height={'100%'}
      py={5}
      px={5}
      pr={10}
      border={`1px solid ${useColorModeValue(bgLight, bgShadedDark)}`}
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
            value={name}
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
            value={trigger}
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
      {
        children
      }
      <ButtonSection loading={loading} handleSubmit={handleSubmit}/>
    </Flex>
  )
}


const PoliteRemidnerMessage = ()=>{
  const {textUltraShadedDark,textUltraShadedLight} = useColors();
  return <Box>
    <Text fontSize={'md'} fontWeight={'bold'}>✨ Friendly Reminder:</Text>
    <Text fontSize={'sm'} mt={2} color={useColorModeValue(textUltraShadedLight,textUltraShadedDark)}>
      Please ensure that your messages are polite, respectful, and professional. 🙏
      Also, kindly review and comply with Instagram’s Privacy Policy & Community Guidelines to ensure a seamless experience. ✅
      Happy Automating! 🚀
    </Text>
  </Box>
}

const ButtonSection = ({loading,handleSubmit})=>{
  const router = useRouter();
  return<Flex width={'100%'} justifyContent={'space-between'}>
  <Button
    fontSize={'md'}
    style={{ letterSpacing: '.5px' }}
    width={'90px'}
    variant='outline'
    disabled={loading}
    onClick={() => router.back()}
  >Back</Button>
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