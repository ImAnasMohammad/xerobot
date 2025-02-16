import { useState } from "react"
import {  useColorModeValue } from "../ui/color-mode";
import { ChevronDown } from "lucide-react";
import { Box } from "@chakra-ui/react";
import useColors from "@/hooks/useColors";


const CustomSelect = ()=>{
    const [open,setOpen]= useState(false);


    return <div style={{position:'relative'}}>
        <button
            onFocus={()=>setOpen(true)}
            onBlur={()=>setOpen(false)}
            onClick={()=>setOpen(prev=>!prev)}
            style={{
                minWidth:'200px',
                backgroundColor:useColorModeValue('#ffff','black'),
                padding:'10px',
                display:'flex'
            }}
        >
            <div style={{width:'150px',textAlign:'left'}}>
                All
            </div>
            {/* <div style={{width:'50px',textAlign:'right'}}>
                <ChevronDown />
            </div> */}
        </button>
        {/* {
            open && <Items/>
        } */}
    </div>
}


const Items = ()=>{
    const {textUltraShadedDark,textShadedDark,bgShadedDark,bgDark} = useColors()
    return <Box
        backgroundColor={bgDark  }
        width={'100%'}
        mt={1}
        position={'absolute'}
        p={2}
        zIndex={2}
    >
        <ul>
            <li>
                <Box style={{padding:'10px',cursor:'pointer'}} _hover={{bgColor:bgShadedDark}}>
                    hello
                </Box>
            </li>
            <li>
                <Box style={{padding:'10px',cursor:'pointer'}} _hover={{bgColor:bgShadedDark}}>
                    hello
                </Box>
            </li>
        </ul>
    </Box>
}
export default CustomSelect