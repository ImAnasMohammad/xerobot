import connectDB from "@/components/connections/db.connection";
import Automations from "@/models/Automation";
import SocialMediaAccounts from "@/models/SocialMediaAccounts";
import getCookie from "@/utils/cookies/getCookie";
import sendResponse from "@/utils/sendResponse";

const handleGet = async (req) => {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");

    const user = await getCookie(req);

    if(!user?.success){
        return sendResponse({
            status: 403,
            message: 'Please relogin.',
            relogin: true,
            success:false
        });
    }

    const userId = user?.data?.payload?.id;

    let query = { userId };

    if (search) {
        query = {
            $or: [
                { accountName: { $regex: search, $options: "i" } },
                { accountUserName: { $regex: search, $options: "i" } },
                { platform: { $regex: search, $options: "i" } },
            ],
        };
    }

    try {
        await connectDB()
        let accounts = await SocialMediaAccounts.find(query,{
            accountName: 1,
            accountUserName: 1,
            platform: 1,
            accountProfile: 1,
            isActive:1,
            iskeyExpired:1,
        });

        accounts = await Promise.all(accounts?.map(async(acc)=>{
            const automationCount = await Automations.countDocuments({accountId:acc?._id});
            return {
                ...acc.toObject(),
                automationCount,
            }
        }))
        return sendResponse({ accounts,success:true })
    } catch (err) {
        console.log(err)
        return sendResponse({ message: 'Internal server error',success:false })
    }
}


export default handleGet