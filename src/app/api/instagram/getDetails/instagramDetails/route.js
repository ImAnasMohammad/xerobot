import sendResponse from "@/utils/sendResponse";
import fetchAccessToken from "../../../socialAccounts/fetchAccessToken";
import getInstagramDetails from "./getInstagraDetails";


export async function GET(req){
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const pageId = searchParams.get("pageId");
    if(!id || !pageId){
        return sendResponse(404,"Invalid id");
    }

    const tokenData = await fetchAccessToken(id);

    if(!tokenData.success){
        return sendResponse(tokenData.status,tokenData.message);
    }
    const instagramDetailsResponse = await getInstagramDetails(pageId,tokenData.accessKey);
    
    if(!instagramDetailsResponse.success){
        return sendResponse(instagramDetailsResponse.status,instagramDetailsResponse.message);
    }
    return sendResponse(200,null,instagramDetailsResponse.data)
}