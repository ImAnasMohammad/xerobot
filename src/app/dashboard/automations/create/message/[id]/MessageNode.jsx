import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { Handle, Position } from "reactflow";
import useColors from "@/hooks/useColors";
import InstagramIcon from "@/components/custom/icons/InstagramIcon";
import { useColorModeValue } from "@/components/ui/color-mode";
import { generateUniqueId } from "../EditNodeDrawer";

const MessageNode = ({ data }) => {
    const { textShadedDark,mainColor } = useColors();

    return (
        <Box
            bg={textShadedDark}
            border="2px solid"
            borderColor="green.400"
            borderRadius="lg"
            p={4}
            boxShadow="md"
            minW="250px"
            position="relative"
        >
            {/* Header */}
            <Box display="flex" alignItems="center" gap={2} mb={1}>
                <InstagramIcon height={20} width={20} />
                <Text fontWeight="bold" fontSize="md" color={useColorModeValue('#000', '#000')}>
                    Send Message
                </Text>
            </Box>

            {/* Message Box */}
            <Box bg="gray.100" borderRadius="md" p={2} mb={2}>
                <Text fontSize="sm" color={useColorModeValue('#000', '#000')}>
                    {data.message || "Enter message..."}
                </Text>
            </Box>

            {/* Buttons */}
            <VStack spacing={2} position="relative">
                {data.buttons?.map((button, index) => (
                    <ButtonNode key={index} data={button} index={index} />
                ))}
            </VStack>
            <Handle type="target" position={Position.Left} isConnectable={true} style={{background:mainColor}} id={generateUniqueId()}/>

        </Box>
    );
};

const ButtonNode = ({ data, index }) => {
    const { mainColor } = useColors();
    const {id} = data;

    return (
        <Flex
            bg="gray.100"
            borderRadius="md"
            border="1px solid"
            borderColor={mainColor}
            width="full"
            py={2}
            justifyContent="center"
            alignItems="center"
            position="relative"
        >
            <Text fontSize="xs" color={useColorModeValue('#000', '#000')}>
                {data.label}
            </Text>

            {
                !data.url &&
                <Handle
                    type="source"
                    position={Position.Right}
                    id={`${id}`}
                    style={{
                        background: mainColor,
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        right: "-6px", 
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                    isConnectable={true}
                />
            }
        </Flex>
    );
};

export default MessageNode;
