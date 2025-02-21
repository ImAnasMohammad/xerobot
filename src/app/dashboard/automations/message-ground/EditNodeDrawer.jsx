"use client"

import {useState} from 'react'

import { Button, DrawerContext, Flex, Text } from "@chakra-ui/react"
import {
    DrawerActionTrigger,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import useColors from "@/hooks/useColors"
import InputForAutomation from "../createAutomation/[...data.jsx]/components/InputForAutomation"

const EditNodeDrawer = ({ content, handleClose }) => {
    if(!content){
        return
    }
    const {data=null} = content;
    const {mainColor,textUltraShadedDark} = useColors();
    const [message,setMessage] = useState(data.message);
    const [buttons,setButtons] = useState(data.options || []);

    const handleMessage = (_,value)=>setMessage(value);

    const handleAddButton = ()=>{
        setButtons(prev=>[...prev,{
            label:`Option-${buttons?.length+1 || 0}`,
            url:''
        }])
    }

    const handleSave = ()=>{

    }

    const handleDelete = ()=>{

    }
    
    return (
        <DrawerRoot open={content} size='md'>
            <DrawerBackdrop onClick={handleClose} />
            <DrawerContent rounded="md">
                <DrawerHeader>
                    <DrawerTitle>Edit Message</DrawerTitle>
                </DrawerHeader>
                <DrawerBody pt={10}>
                    <InputForAutomation
                        value={message}
                        handleValue={handleMessage}
                        heading="Message"
                        name="message"
                        type = "textarea"
                        placeholder = 'Type here...'
                        marginTop='10px'
                    />
                    <Text
                        fontSize={'md'}
                        color={textUltraShadedDark}
                        pb={2}
                        marginTop={10}
                        marginBottom={2}
                    >
                        Buttons
                    </Text>
                    <Flex flexDirection="column" gap={4}>
                        {
                            buttons?.map(button=><Button variant="outline" key={button?.label || 'Button'}>{button?.label || 'Button'}</Button>)
                        }
                        <Button bg={mainColor} color="#ffff" onClick={handleAddButton}>Add Button</Button>
                    </Flex>
                </DrawerBody>
                <DrawerFooter>
                    <Flex w={'full'} justifyContent='space-between'>
                        <Button colorPalette="red" variant="outline">
                            Delete
                        </Button>
                        <Button bg={mainColor} color="#ffff">Save</Button>
                    </Flex>
                </DrawerFooter>
                <DrawerCloseTrigger  onClick={handleClose}/>
            </DrawerContent>
        </DrawerRoot>
    )
}


export default EditNodeDrawer