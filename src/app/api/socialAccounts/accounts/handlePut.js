import SocialMediaAccounts from "@/models/SocialMediaAccounts";
import getCookie from "@/utils/cookies/getCookie";
import sendResponse from "@/utils/sendResponse";

/**
 * 
 * @param {Object} request 
 * @returns 
 */

export default async function handlePut(req) {

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const body = await req.json();

    if(!id){
        return sendResponse({success:false,message:"id is required",status:400})
    }


    const user = await getCookie(req);

    if (!user?.success) {
        return sendResponse({ success: false, status: 403, message: 'Please relogin.' });
    }

    if(body?.type==='STATUS') return sendResponse({...await updateStatus(id)});

    return sendResponse({success:true,status:200})
}


/**
 * 
 * @param {id - SocialMediaAccounts _id} id 
 * @returns {Object}
 */

const updateStatus = async (id) => {
    try {
        const account = await SocialMediaAccounts.findById(id);
    
        if (!account) {
            return { success: false, message: 'Account not found' };
        }

        await SocialMediaAccounts.findByIdAndUpdate(id, { $set: { isActive:!account.isActive } }, { new: true });
    
        return { success: true, message: 'isKeyExpired toggled successfully' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

/**
 * 
 * @param {_id(mongodb_id)} id 
 * @param {Boolean} iskeyExpired 
 * @returns {Object}
 */
const updateResetPermissions = async (id,iskeyExpired) => {

    if(!id){
        return {
            success: false,
            message: "id is required",
            status:400
        }
    }
    if(iskeyExpired!==true && iskeyExpired!==false){
        return {
            success: false,
            message: "iskeyExpired is required",
            status:400
        }
    }
    try {
        const updatedAutomation = await SocialMediaAccounts.findByIdAndUpdate(id, { $set: { iskeyExpired } }, { new: true });
        if (!updatedAutomation) {
            return {
                success: false,
                message: "Unable to Increment",
                status:400
            };
        }
        return {
            success: true,
        }
    } catch (error) {
        return {
            success: false,
            message: error?.message || 'Something went wrong',
            status:500
        }
    }
}




export { updateResetPermissions };