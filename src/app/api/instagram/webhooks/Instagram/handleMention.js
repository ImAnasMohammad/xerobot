import { success } from "../webhookResponse";

const handleMention = (data)=>{
    console.log("handle Mention",data)
    return success()
}

export default handleMention;