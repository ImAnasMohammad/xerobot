
import Automations from "@/models/Automation";
import getCookie from "@/utils/cookies/getCookie";
import sendResponse from "@/utils/sendResponse";
import saveAutomation from "./saveAutomation";
import replyCommentResponse from "./saveResponse/replyCommentResponse";
import DMCommentResponse from "./saveResponse/DMCommentResponse";
import blendCommentResponse from "./saveResponse/blendCommentResponse";

const getBodyData = async (req) => {
    try {
        return await req.json();
    } catch (error) {
        return null;
    }
}

const handlePost = async (req) => {

    const body = await getBodyData(req);


    const user = await getCookie(req);

    if (!user?.success) {
        return sendResponse({ success: false, status: 403, message: 'Please relogin.' });
    }


    const userId = user?.data?.payload?.id;

    const saveAutomationRes = await saveAutomation({ ...body, userId });

    if (!saveAutomationRes?.success) return sendResponse({ ...saveAutomationRes });

    const automation = saveAutomationRes?.data;

    if (!automation) return sendResponse({ success: false, status: 400, message: 'Something went wrong.' });

    let res = null;
    if (body.type === 'reply-comment'){
        res = await replyCommentResponse(automation?.id, body);
    }

    if(body.type === 'dm-comment'){
        res = await DMCommentResponse(automation?.id, body);
    }


    if(body.type === 'blend-comment'){
        res = await blendCommentResponse(automation?.id, body);
    }


    if(body.type === 'message-automation'){
        console.log(body)
    }



    if(res?.success){
        return sendResponse({ success: true, status: 200, message: 'Automation created successfully.' });
    }

    await Automations.findByIdAndDelete(automation?.id);
    
    if(res===null){
        return sendResponse({ success: false, status: 404, message: 'Inavlid Automtion Type' });
    }

    return sendResponse({...res});

}

export default handlePost;