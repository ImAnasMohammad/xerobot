import connectDB from "@/components/connections/db.connection";
import ReplyComment from "@/models/AutomationResponses/instagram/comment/ReplyComment";


const replyCommentResponse = async (automationId,replyData) => {
    const error = (status, message) => {
        return { success: false, status, message };
    };

    try {
        
        const {commentReply:reply=null} = replyData;


        if(!automationId)return error(400, "Unable to create automation.");

        if(!reply)return error(400, "Reply is required.");
        

        const connect = await connectDB();
        if (!connect?.success) return { ...connect};

        const saveAutomationResponse = await ReplyComment.create({automationId,reply});

        if (!saveAutomationResponse) return error(400, "Something went wrong.");

        const saveAutomation = saveAutomationResponse.toObject();


        if (saveAutomation) {
            return { success: true,status:200,message: "Automation created successfully." };
        }

        return error(400, "Something went wrong.");

    }catch (error) {
        return { success: false, message: error.message };
    }
}

export default replyCommentResponse;