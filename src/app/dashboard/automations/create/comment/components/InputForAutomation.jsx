import { useColorModeValue } from "@/components/ui/color-mode";
import { Switch } from "@/components/ui/switch";
import useColors from "@/hooks/useColors";
import { Box, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const InputForAutomation = ({ value, handleValue, heading, name, type = "textarea", placeholder = 'Type here...',...attr }) => {
    const { textUltraShadedDark } = useColors();
    return <Box>
        <Text
            fontSize={'md'}
            color={useColorModeValue('#ffff', textUltraShadedDark)}
            pb={2}
        >
            {
                heading
            }
        </Text>
        {
            type === 'textarea' ? <Textarea
                value={value}
                onChange={(e) => handleValue(name, e.target.value)}
                rows={8}
                resize={'none'}
                p={5}
                fontSize={'md'}
                placeholder={placeholder}
                {...attr}
            /> : <Input
                value={value}
                onChange={(e) => handleValue(name, e.target.value)}
                placeholder={placeholder}
                {...attr}
            />
        }
    </Box>
}


const SwitchForAutomation = ({ name, value, handleValue, heading,...attr }) => {
    return <Flex width={'100%'} justifyContent={'space-between'}>
        <Text fontSize={'lg'}>{heading}</Text>
        <Switch
            onChange={() => handleValue(name, !value)}
            value={value}
            {...attr}
        />
    </Flex>
}
export {SwitchForAutomation};
export default dynamic(() => Promise.resolve(InputForAutomation), { ssr: false });