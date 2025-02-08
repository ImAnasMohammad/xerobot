import useColors from "@/hooks/useColors";
import { Button } from "../ui/button";

const CustomButtom = ({title='Action',textColor=null,Icon,...props})=>{
    const {mainColor} = useColors();
    const color = textColor===null?'#ffff':textColor; 
    return <Button height={'fit-content'} width={'fit-content'} bg={'transparent'} color={color} {...props} _hover={{
        color:mainColor
    }} >
        <abbr title={title}>
            <Icon/>
        </abbr>
    </Button>
}

export default CustomButtom;