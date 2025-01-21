import connectDB from "@/components/connections/db.connection";
import Account from "@/models/SocialMediaAccounts";
import SocialMediaAccounts from "@/models/SocialMediaAccounts";
import sendResponse from "@/utils/sendResponse";


export async function GET(req) {
    try {
        // const { searchParams } = new URL(req.url);
        // const id = searchParams.get("id");
        // if(!id){
        //     return sendResponse(404,"Invalid id");
        // }
        await connectDB()
        const accounts = await SocialMediaAccounts.find({isCompleted:true},{accountUserName:1,accountProfile:1,platform:1});
        return sendResponse(200,null,accounts)
    } catch (error) {
        console.log(error)
        return sendResponse(500,"Something went wrong while fetching details.");
        
    }
}