import connectDB from "@/components/connections/db.connection";
import Automations from "@/models/Automation";
import SocialMediaAccounts from "@/models/SocialMediaAccounts";
import User from "@/models/User";
import getCookie from "@/utils/cookies/getCookie";
import sendResponse from "@/utils/sendResponse";

/**
 * 
 * @param {object} req 
 * @returns {object}
 */
const handleGet = async (req) => {
    const { searchParams } = new URL(req.url);
    let search = searchParams.get("search");

    const user = await getCookie(req);

    if(!user?.success){
      return sendResponse({status:403,message:'Please relogin.',relogin:true,success:false});
    }

    const userId = user?.data?.payload?.id;

    let query = { userId };

    if (search) {
        query = {
            $or: [
                { name: { $regex: search, $options: "i" } },
                { trigger: { $regex: search, $options: "i" } },
                { commentReply: { $regex: search, $options: "i" } },
                { direactMessage: { $regex: search, $options: "i" } },
                { initialMessage: { $regex: search, $options: "i" } },
            ],
        };
    }

    try {
        
        await connectDB();
        const automations = await Automations.find(query);
        return sendResponse({ success:true,automations })
    } catch (err) {
        console.log(err)
        return sendResponse({ success:false,message: 'Internal server error' })
    }
}


const getByMediaId = async (mediaId) => {
    if (!mediaId) {
        return {
            success: false,
            message: "Invalid media Id",
            status:400
        }
    }
    try {
        await connectDB();
        const automations = await Automations.find({ mediaId })
        .populate({
            path: 'accountId', 
            model: SocialMediaAccounts,
            select:'_id accessKey platform'
        })
        .populate({
            path: 'userId',
            model: User,
            select:'activePlan isActive'
        });
        if (automations?.length <= 0) {
            return {
                success: false,
                message: 'No Automation found on this media',
                status:404
            }
        }
        return {
            success: true,
            automations
        }
    } catch (err) {
        return {
            success: false,
            message: err?.message || 'Something went wrong',
            status:500
        }
    }
}

export {getByMediaId}
export default handleGet