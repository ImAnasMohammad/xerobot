import { Box, Text, VStack, Input, Icon } from "@chakra-ui/react";
import { Handle, Position } from "reactflow";
import { FaInstagram } from "react-icons/fa";
import useColors from "@/hooks/useColors";
import InstagramIcon from "@/components/custom/icons/InstagramIcon";
import { useColorModeValue } from "@/components/ui/color-mode";

const MessageNode = ({ data }) => {

    const {textShadedDark} = useColors()
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
            <Box display="flex" alignItems="center" gap={2} mb={2}>
                <InstagramIcon height={20} width={20}/>
                <Text fontWeight="bold" fontSize="md" color={useColorModeValue('#000','#000')}>Send Message</Text>
            </Box>
            <Box bg="gray.100" borderRadius="md" p={2} mb={2}>
                <Text fontSize="sm" color={useColorModeValue('#000','#000')}>{data.message || "Enter message..."}</Text>
            </Box>
            <VStack spacing={2}>
                {data.options?.map((option, index) => (
                    <Box
                        key={index}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        bg="white"
                        border="1px solid"
                        borderColor="gray.300"
                        borderRadius="md"
                        p={2}
                        w="full"
                    >
                        <Text fontSize="sm">{option}</Text>
                        <Handle type="source" position={Position.Right} id={`handle-${index}`} style={{ background: "#0d9488" }} />
                    </Box>
                ))}
            </VStack>

            <Handle type="source" position={Position.Top} style={{ background: "red" }} />
            {/* <Handle type="source" position={Position.Right} style={{ background: "#0d9488" }} /> */}
            {/* <Handle type="target" position={Position.Left} style={{ background: "#0d9488" }} />
            <Handle type="target" position={Position.Left} style={{ background: "#0d9488" }} /> */}
        </Box>
    );
};

export default MessageNode;
