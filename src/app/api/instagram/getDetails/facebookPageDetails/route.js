import sendResponse from "@/utils/sendResponse";
import fetchAccessToken from "../../auth/fetchAccessToken";
import getFacebookPageDetails from "./getFacebookPages";
import savePages from "./savePages";


export async function GET(req){
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if(!id){
        return sendResponse(404,"Invalid id");
    }

    const tokenData = await fetchAccessToken(id);

    if(!tokenData.success){
        return sendResponse(tokenData.status,tokenData.message);
    }
    const pageDetailsResponse = await getFacebookPageDetails(tokenData.accessKey);
    
    if(!pageDetailsResponse.success){
        return sendResponse(pageDetailsResponse.status,pageDetailsResponse.message);
    }

    return sendResponse(200,null,pageDetailsResponse.data)
}