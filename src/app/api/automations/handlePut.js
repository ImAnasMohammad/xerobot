import connectDB from "@/components/connections/db.connection";
import Automations from "@/models/Automation";
import getCookie from "@/utils/cookies/getCookie";
import sendResponse from "@/utils/sendResponse";

/**
 * 
 * @param {object} req 
 * @returns {object}
 */

const handlePut = async (req) => {

    const {searchParams} = new URL(req.url);

    const id = searchParams.get('id');

    
    const body = await req.json();
    
    if(id && body?.type === 'STATUS'){
        return sendResponse({...await handleStatus(id)});
    }

    return sendResponse({success:true,status:200})

    
}

/**
 * 
 * @param {String - id of the automation} id 
 * @returns {Object}
 */


const handleStatus = async (id) => {
    if (!id) {
        return {
            success: false,
            message: "Invalid Id"
        }
    }
    try {
        const automation = await Automations.findById(id);

        if (!automation) {
            return {
                success: false,
                message: "Automation not found",
                status: 404
            }
        }

        automation.isLive = !automation.isLive;

        await automation.save();

        return {
            success: true,
            message: "Status Updated"
        }
    } catch (error) {
        return {
            success: false,
            message: error?.message || 'Something went wrong',
            status: 500
        }
    }
}


/**
 * 
 * @param {string} mediaId 
 * @param {Number} type 1 for { respondedCount: 1 } and 0 for receivedCount
 * @returns {Object} 
 * 
 */
const incrementCount = async (mediaId, type = 1) => {
    
    let obj = {}

    if (type === 1) {
        obj['respondedCount'] = 1;
    } else {
        obj['receivedCount'] = 1;
    }
    try {
        const updatedAutomation = await Automations.findOneAndUpdate(
            { mediaId },
            { $inc:obj  },
            { new: true }
        );

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
};



export { incrementCount };

export default handlePut;