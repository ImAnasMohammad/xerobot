import CustomSelect from "@/components/custom/CustomSelect";
import Card from "./Card";
import { Flex, Text } from "@chakra-ui/react";
import useColors from "@/hooks/useColors";
import { useState } from "react";

const InstagramActivity = ({averageSccessRate,accounts}) => {
    const { bgUltraShadedDark } = useColors();
    const defaultValue = {
        name:'All',
        avatar:'',
        value:'all',
        successRate:null
    }
    const [selectedAccount,setSelectedAccount] = useState(defaultValue);

    const handleChange = (e)=>{
        console.log(e.target.value)
    }
    return <Flex as={'div'} gap={10} direction='column' justifyContent={'space-between'} pt={4} px={10} bgColor={bgUltraShadedDark} width={'fit'} borderRadius={'md'}>
        <Flex justifyContent={'space-between'} gap={20}>
            <Text fontSize={'2xl'}>Instagram Activity</Text>
            <div>
                <CustomSelect
                    onChange={handleChange}
                    items={accounts}
                    selectedItem={selectedAccount}
                />
            </div>
        </Flex>
        <Flex pb={5} flexWrap={'wrap'} gapY={20} justifyContent={'center'}>
            <Card item={{
                name: 'Comments',
                value:selectedAccount?.successRate ?? averageSccessRate,
                unit: '%',
                info: "Comments Success rate"
            }} p={0} />
            <Card item={{
                name: 'Messages',
                value: 0,
                unit: '%',
                info: "Message Success rate",
                helperText:'This is not supported yet.'
            }} p={0} />
            <Card item={{
                name: 'Mentions',
                value: 0,
                unit: '%',
                info: "Mentions Success rate",
                helperText:'This is not supported yet.'
            }} p={0} />
        </Flex>
    </Flex>
}


export default InstagramActivity