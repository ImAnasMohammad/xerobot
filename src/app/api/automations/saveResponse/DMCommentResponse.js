import connectDB from "@/components/connections/db.connection";
import DMComment from "@/models/AutomationResponses/instagram/comment/DMComment";


const DMCommentResponse = async (automationId,dmData) => {
    const error = (status, message) => {
        return { success: false, status, message };
    };

    try {

        const {message:dm=null} = dmData;


        if(!automationId)return error(400, "Unable to create automation.");

        if(!dm)return error(400, "Message is required.");
        

        const connect = await connectDB();

        if (!connect?.success) return { ...connect};

        const saveAutomationResponse = await DMComment.create({automationId,dm});

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

export default DMCommentResponse;