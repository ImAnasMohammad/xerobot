import sendResponse from "@/utils/sendResponse";
import fetchAccessToken from "../../auth/fetchAccessToken";
import getInstagramMedia from "./getInstagramMediaDetails";


export async function GET(req){

    console.log(req.url)
    
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if(!id || id==undefined || id===null){
        console.log(id)
        return sendResponse(404,"Invalid Id");
    }
    const socialMediaAccountResponse = await fetchAccessToken(id,{accountProfile:1,accountId:true});
    
    if(!socialMediaAccountResponse?.success){
        return sendResponse(socialMediaAccountResponse?.status,socialMediaAccountResponse?.message);
    }
    const {accountId,accessKey} =socialMediaAccountResponse;


    const mediaRes = await getInstagramMedia(accountId,accessKey);

    if(!mediaRes?.success){
        return sendResponse(mediaRes?.status ?? 500,mediaRes?.message ?? "Something went wrong.");
    }

    return sendResponse(200,null,{success:true,media:mediaRes?.data})
}