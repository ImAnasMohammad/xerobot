import { success } from "../webhookResponse";



const handleMessage = (data)=>{
    console.log("handle Message",data);
    return success();
}

export default handleMessage;