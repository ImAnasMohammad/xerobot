import { success } from "../webhookResponse";

const handleComment = (data)=>{
    console.log("handle comment",data);
    return success();
}

export default handleComment;