import getCookie from "@/utils/cookies/getCookie";
import sendResponse from "@/utils/sendResponse";
import getDashboardInfo from "./getDashboardInfo";

export const GET = async (req)=>{

    const user = await getCookie(req);

    if(!user?.success){
        return sendResponse({status:400,message:"Relogin",success:false,relogin:true});
    }

    const id = user.data.payload.id;
    const accountsWithAutomationsRes = await getDashboardInfo(id);

    if(!accountsWithAutomationsRes?.success){
        return sendResponse({...accountsWithAutomationsRes})
    }
    return sendResponse({status:200,
        ...accountsWithAutomationsRes,
    })
}