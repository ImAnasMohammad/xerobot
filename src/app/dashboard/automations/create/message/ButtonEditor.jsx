"use client"

import {useState} from 'react'

import { Button, Flex } from "@chakra-ui/react"
import {
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
} from "@/components/ui/drawer"
import useColors from "@/hooks/useColors"
import { toastError } from '@/components/custom/toast'
import { isValidURL } from '@/utils/validate'
import InputForAutomation from '../comment/components/InputForAutomation'

const ButtonEditor = ({
    content,
    handleClose,
    handleEditButton,
    handleDelete
}) => {
    if(!content){
        return
    }
    const {mainColor} = useColors();

    const [button,setButton]=useState(content?.button || {
        type:'web_url'
    });


    const handleLabel = (_,value)=>setButton({...button,label:value})
    const handleURL = (_,value)=>setButton({...button,url:value})

    const handleSave = ()=>{
        if(!button?.label){
            toastError("Invali Label");
            return;
        }

        if(button?.url && !isValidURL(button.url)){
            toastError("Invalid URL");
            return 
        }
        handleEditButton(content?.i,button)
    }
    
    return (
        <DrawerRoot open={content} size='md' placement={'start'}>
            <DrawerBackdrop onClick={handleClose} />
            <DrawerContent rounded="md">
                <DrawerHeader>
                    <DrawerTitle>Edit Button</DrawerTitle>
                </DrawerHeader>
                <DrawerBody pt={10}>
                    <Flex flexDirection={'column'} gap={10}>
                        <InputForAutomation
                            value={button?.label || ''}
                            handleValue={handleLabel}
                            heading="Button Label"
                            name="label"
                            type = "input"
                            placeholder = 'Type here...'
                        />
                        <InputForAutomation
                            value={button?.url || ''}
                            handleValue={handleURL}
                            heading="Button URL (Optional)"
                            name="url"
                            type = "input"
                            placeholder = 'Type here...'
                        />
                    </Flex>
                    
                </DrawerBody>
                <DrawerFooter>
                    <Flex w={'full'} justifyContent='space-between'>
                        <Button colorPalette="red" variant="outline" onClick={()=>handleDelete(content?.i)}>Delete</Button>
                        <Button bg={mainColor} color="#ffff" onClick={handleSave}>Save</Button>
                    </Flex>
                </DrawerFooter>
                <DrawerCloseTrigger  onClick={handleClose}/>
            </DrawerContent>
        </DrawerRoot>
    )
}


export default ButtonEditor