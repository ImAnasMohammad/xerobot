import connectDB from "@/components/connections/db.connection";
import DMComment from "@/models/AutomationResponses/instagram/comment/DMComment";


const getDMCommentResponse = async (automationId) => {
    const error = (status, message) => {
        return { success: false, status, message };
    };

    try {

        if(!automationId)return error(400, "Required automation ID.");

        const connect = await connectDB();
        if (!connect?.success) return { ...connect};

        const getAutomationRes = await DMComment.find({automationId});
        
        if(getAutomationRes?.length >0){
            return { success: true, commentDM: getAutomationRes[0] };
        }
        return {success:false}

    }catch (error) {
        return { success: false, message: error.message };
    }
}

export default getDMCommentResponse;