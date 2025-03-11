

import connectDB from "@/components/connections/db.connection";
import BlendComment from "@/models/AutomationResponses/instagram/comment/BlendComment";

const blendCommentResponse = async (automationId,blendData) => {
    const error = (status, message) => {
        return { success: false, status, message };
    };

    try {

        const   {
            message:dm=null,
            title='',
            url=null,
            commentReply:reply=null,
        } = blendData;

        if(!automationId)return error(400, "Unable to create automation.");

        if(!dm)return error(400, "Message is required.");

        if(!reply)return error(400, "Reply message is required.");

        if(!url)return error(400, "Url is required.");

        const buttons = [{title : title || url,url}];
        

        const connect = await connectDB();

        if (!connect?.success) return { ...connect};

        const saveAutomationResponse = await BlendComment.create({automationId,dm,reply,buttons});

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

export default blendCommentResponse;