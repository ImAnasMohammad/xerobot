import connectDB from "@/components/connections/db.connection";
import BlendComment from "@/models/AutomationResponses/instagram/comment/BlendComment";


const getBlendCommentResponse = async (automationId) => {
    const error = (status, message) => {
        return { success: false, status, message };
    };

    try {

        if(!automationId)return error(400, "Required automation ID.");

        const connect = await connectDB();
        if (!connect?.success) return { ...connect};

        const getAutomationRes = await BlendComment.find({automationId});
        
        if(getAutomationRes?.length >0){
            return { success: true, commentBlend: getAutomationRes[0] };
        }
        return {success:false}

    }catch (error) {
        return { success: false, message: error.message };
    }
}


const covertButtons = (buttons) =>{
    return buttons.map(button =>{
        return {
            type: button.type,
            title: button.title,
            url: button.url,
        }
    })
}

export { covertButtons};

export default getBlendCommentResponse;