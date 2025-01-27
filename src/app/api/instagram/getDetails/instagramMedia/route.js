import sendResponse from "@/utils/sendResponse";
import fetchAccessToken from "../../../socialAccounts/fetchAccessToken";
import getInstagramMedia from "./getInstagramMediaDetails";


export async function GET(req){
    
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if(!id || id==undefined || id===null){
        return sendResponse({status:404,message:"Invalid Id"});
    }
    const socialMediaAccountResponse = await fetchAccessToken(id,{accountProfile:1,accountId:true});
    
    if(!socialMediaAccountResponse?.success){
        const {status,message} = socialMediaAccountResponse
        return sendResponse({status,message});
    }
    const {accountId,accessKey} =socialMediaAccountResponse;


    const mediaRes = await getInstagramMedia(accountId,accessKey);

    if(!mediaRes?.success){
        const {status,message} = mediaRes
        return sendResponse({status,message});
    }

    return sendResponse({data:mediaRes?.data})
}