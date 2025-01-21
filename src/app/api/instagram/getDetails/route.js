import connectDB from "@/components/connections/db.connection";
import SocialMediaAccounts from "@/models/SocialMediaAccounts";
import sendResponse from "@/utils/sendResponse";


export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if(!id){
            return sendResponse(404,"Invalid id");
        }
        await connectDB()
        const account = await SocialMediaAccounts.findById(id);
        return sendResponse(200,null,{
            name:account.accountUserName,
            profilePicture:account.accountProfile
        })
    } catch (error) {
        console.log(error)
        return sendResponse(500,"Something went wrong while fetching details.");
        
    }
}