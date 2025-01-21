import SocialMediaAccounts from "@/models/SocialMediaAccounts";
import sendResponse from "@/utils/sendResponse";
import fetchAccessToken from "../auth/fetchAccessToken";


export async function POST(req){


    const body = await req.json();


    const {
        id,
        pageId,
        accountId,
        accountUserName,
        accountName,
        profilePicture
    } = body;

    if(
        !id ||
        !pageId ||
        !accountId ||
        !accountUserName ||
        !accountName ||
        !profilePicture
    ){
        return sendResponse(404,"Invalid Fields.")
    }
    
    try{
        const update = await SocialMediaAccounts.findByIdAndUpdate(id,{
            accountId,
            accountUserName,
            accountName,
            profilePicture,
            isCompleted:true,
            streamId:pageId
        })
        if(!update){
            return sendResponse(500,"Something went wrong.")
        }
        
        const accessTokenRes = await fetchAccessToken(id);
        
        if(!accessTokenRes?.success){
            return sendResponse(500,"Something went wrong.");
        }
        
        return sendResponse(200,null,{success:true,message:'successfylly account linked'});
        
    }catch(err){

        console.log(err)

        if(err?.keyPattern?.accountId){
            return sendResponse(200,null,{success:true,message:'"Account already linked"'});
        }

        return sendResponse(500,err?.message ?? "Something went wrong.");
    }

}