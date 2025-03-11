"use client"

import {useState} from 'react'

import { Button, Flex, Text } from "@chakra-ui/react"
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
import ButtonEditor from './ButtonEditor'
import CustomButtom from '@/components/custom/CustomButton'
import { MdDeleteOutline, MdOutlineDeleteOutline } from 'react-icons/md'
import { LiaEdit } from 'react-icons/lia'
import { toastError } from '@/components/custom/toast'
import { IoOpenOutline } from 'react-icons/io5'
import InputForAutomation from '../comment/components/InputForAutomation'

export const generateUniqueId = () => `button-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

const EditNodeDrawer = ({
    content,
    handleClose,
    handleEditNode,
    handleDeleteNode
}) => {
    if(!content){
        return
    }
    const {data=null,id=null} = content;
    const {mainColor,textUltraShadedDark} = useColors();
    const [message,setMessage] = useState(data.message);
    const [buttons,setButtons] = useState(data.buttons || []);
    const [editButtonIndex,setEditButtonIndex] = useState(null);

    const handleOpenButtonEdit = (data)=>setEditButtonIndex(data);
    const handleCloseButtonEdit = ()=>setEditButtonIndex(null);


    const handleEditButton = (index,button)=>{
        setButtons([...buttons?.map((item,i)=>i===index?button:item)])
        handleCloseButtonEdit()
    }
    const handleDeleteButton= (ind)=>{
        setButtons([...buttons?.filter((_,i)=>i!==ind)]);
        handleCloseButtonEdit()
    }

    const handleMessage = (_,value)=>setMessage(value);


    const handleAddButton = ()=>{
        setButtons(prev=>[...prev,{
            label:`Button -${buttons?.length+1 || 0}`,
            url:'',
            type:'web_url',
            id:generateUniqueId()
        }])
    }

    const handleSave = ()=>{
        if(!message){
            toastError("Invalid Message");
            return;
        }
        handleEditNode({...content,data:{message,buttons}})

    }

    const handleDelete = ()=>handleDeleteNode(id);

    const openInNewTab = (url) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };
    
    return (
        <>
        <ButtonEditor
            content={editButtonIndex}
            handleClose={handleCloseButtonEdit}
            handleEditButton={handleEditButton}
            handleDelete={handleDeleteButton}
        />
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
                            buttons?.map((button,i)=><Flex gap={1} justifyContent={'center'} alignItems={'center'} key={button?.label+i || 'Button'+i}>
                                    <Button flex={'1 1 auto'} variant="outline" onClick={()=>handleOpenButtonEdit({button,i})}>
                                        {button?.label || 'Button'+1}
                                    </Button>
                                    {
                                        button?.url && <CustomButtom onClick={()=>openInNewTab(button?.url)} Icon={IoOpenOutline} title={'Open Link'} textColor={mainColor}/>
                                    }
                                    <CustomButtom onClick={()=>handleOpenButtonEdit({button,i})} Icon={LiaEdit} title={'Edit Button'} textColor={mainColor}/>
                                    <CustomButtom onClick={()=>handleDeleteButton(i)} Icon={MdOutlineDeleteOutline} title={'Delete Button'} textColor={'red'}/>
                            </Flex>)
                        }
                        <Button bg={mainColor} color="#ffff" onClick={handleAddButton}>Add Button</Button>
                    </Flex>
                </DrawerBody>
                <DrawerFooter>
                    <Flex w={'full'} justifyContent='space-between'>
                        <Button colorPalette="red" variant="outline" onClick={handleDelete}> <MdDeleteOutline />Delete</Button>
                        <Button bg={mainColor} color="#ffff" onClick={handleSave}>Save</Button>
                    </Flex>
                </DrawerFooter>
                <DrawerCloseTrigger  onClick={handleClose}/>
            </DrawerContent>
        </DrawerRoot>
        </>
    )
}


export default EditNodeDrawer