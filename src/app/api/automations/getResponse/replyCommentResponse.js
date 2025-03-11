import connectDB from "@/components/connections/db.connection";
import ReplyComment from "@/models/AutomationResponses/instagram/comment/ReplyComment";


const getReplyCommentResponse = async (automationId) => {
    const error = (status, message) => {
        return { success: false, status, message };
    };

    try {

        if(!automationId)return error(400, "Required automation ID.");

        const connect = await connectDB();
        if (!connect?.success) return { ...connect};

        const getAutomationRes = await ReplyComment.find({automationId});
        
        if(getAutomationRes?.length >0){
            return { success: true, commentReply: getAutomationRes[0] };
        }
        return {success:false}

    }catch (error) {
        return { success: false, message: error.message };
    }
}

export default getReplyCommentResponse;