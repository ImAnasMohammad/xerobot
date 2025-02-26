import useColors from "@/hooks/useColors";
import { Button } from "../ui/button";
import { useColorModeValue } from "../ui/color-mode";

const CustomButtom = ({title='Action',textColor=null,Icon,...props})=>{
    const {mainColor,textDark,textLight} = useColors();
    const color = textColor===null?useColorModeValue(textLight,textDark):textColor; 
    return <Button height={'fit-content'} width={'fit-content'} bg={'transparent'} color={color} {...props} _hover={{
        color:mainColor
    }} >
        <abbr title={title}>
            <Icon/>
        </abbr>
    </Button>
}

export default CustomButtom;