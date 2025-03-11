import connectDB from "@/components/connections/db.connection";
import Automations from "@/models/Automation";


const saveAutomation = async (automation) => {
    const error = (status, message) => {
        return { success: false, status, message };
    };
    try {
        const {
            userId=null,
            name=null,
            type=null,
            accountId=null,
            mediaId=null,
            trigger=null
        }  = automation;

        if(!userId)return error(400, "User ID is required.");
        
        if(!type)return error(400, "Type is required.");
        
        if(!accountId)return error(400, "Account ID is required.");
        
        if(!mediaId)return error(400, "Media ID is required.");
        
        if(!trigger)return error(400, "Trigger is required.");

        if(!name)return error(400, "Name is required.");


        const connect = await connectDB();
        if (!connect?.success) {
            return { ...connect};
        }

        const checkAutomation = await Automations.findOne({type,mediaId,trigger});
        
        if (checkAutomation) {
            return error(400, "Automation already exists.");
        }

        const saveAutomation = await Automations.create({userId,name,type,accountId,mediaId,trigger});

        if (saveAutomation) {
            return { success: true, data: saveAutomation };
        }
        return error(400, "Something went wrong.");
    
    }catch (error) {
        return { success: false, message: error.message };
    }
}

export default saveAutomation;