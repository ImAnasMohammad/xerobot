import { useColorModeValue } from "@/components/ui/color-mode";
import { Skeleton } from "@/components/ui/skeleton";
import { InfoTip } from "@/components/ui/toggle-tip";
import useColors from "@/hooks/useColors";
import { Flex, Text } from "@chakra-ui/react";

const Card = ({ item,p=4 }) => {
    const { name, value, icon, info, unit,helperText } = item;
    const { mainColor, textUltraShadedDark, bgUltraShadedDark } = useColors()
    return <Flex gap={10} alignItems={'center'} justifyContent={'space-between'} p={p} px={10} bgColor={bgUltraShadedDark} minW={'300px'} maxW={'400px'} width={'fit'} borderRadius={'md'}>
        <Flex as={'div'} flexDirection={'column'} gap={0}>
            <Text fontSize={'sm'} as={'div'} color={useColorModeValue('#ffff', textUltraShadedDark)}>
                {name}
                {
                    info && <InfoTip>{info}</InfoTip>
                }
            </Text>

            <Text as={'span'} fontWeight={'bold'} fontSize={'3xl'}>
                {
                    value===null ? <Skeleton h={'30px'} w={"15px"} display={'inline-block'}/>:value
                }
                {
                    unit && <Text as='span' color={useColorModeValue('#ffff', textUltraShadedDark)} fontSize={'md'} ml={1}>{unit}</Text>
                }
                {
                    helperText && <Text fontSize={'xs'} fontWeight={'medium'} color={useColorModeValue('#ffff', textUltraShadedDark)}>{helperText}</Text>
                }
            </Text>
        </Flex>
        {
            icon && <Text fontSize={'lg'} bgColor={mainColor} p={4} borderRadius={'md'}>
                {
                    icon
                }
            </Text>}
    </Flex>
}

export default Card
