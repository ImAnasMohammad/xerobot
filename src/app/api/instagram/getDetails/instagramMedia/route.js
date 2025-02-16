import sendResponse from "@/utils/sendResponse";
import fetchAccessToken from "../../../socialAccounts/fetchAccessToken";
import { sendGet } from "@/app/api/utils/sendRequest";
import { updateResetPermissions } from "@/app/api/socialAccounts/accounts/handlePut";


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
    const { accountId, accessKey,_id } = socialMediaAccountResponse;
    
    const url = `${process.env.NEXT_PUBLIC_GRAPH_INSTAGRAM_URL}/${accountId}/media`;
    const params = {
        access_token:accessKey,
        fields: "fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp",
    };

    const mediaRes = await sendGet({ url, params });

    if(!mediaRes?.success){
        if(mediaRes?.accessTokenExpired){
            await updateResetPermissions(_id,true);
        }

        return sendResponse({...mediaRes});
    }

    return sendResponse({success:true,media:mediaRes?.data})
}