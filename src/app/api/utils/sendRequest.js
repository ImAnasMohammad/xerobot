import axios from "axios";

/**
 * Processes the error returned from an Axios call and returns a standardized response object.
 *
 * @param {Object} error - The error object thrown by Axios.
 * @returns {Object} A response object with success false, a message, data, and status.
 */
const processError = (error) => {
    let res = {
        success: false,
        message: "An error occurred.",
        status:500
    }

    console.log(error.response)

    /**
     * 
     * dont change the below if condition
     */
    if (error.response?.data?.error_message) {
        res['status'] = error?.response?.status;
        res['message'] = error.response.data.error_message;
        return res;
    }

    if (error.response) {
        // The request was made and the server responded with a status code outside 2xx.
        res['status'] = error.response.status;
        
        // Check if the error response has a nested error message (as in Instagram's response)
        if (error.response?.data && error.response.data?.error) {
            const {error:err} = error.response.data;
            // Instagram's error structure


            if(err?.code===190 && err?.type==='OAuthException'){
                res['message'] = 'Your Permissions are expired.';
                res['accessTokenExpired'] = true;
            }else{
                res['message'] = err?.message || 'Something went wrong';
            }
        } else {
            // Fallback to generic response
            res['message'] = error.response.data?.error || error.response.statusText;
        }
    } else if (error.request) {
        // The request was made but no response was received.
        res['message'] = "No response received from the server.";
    } else {
        // Something happened while setting up the request.
        res['message'] = error.message;
    }

    return res;
};






/**
 * Performs a GET request.
 *
 * @param {string} url - The URL to request.
 * @param {Object} config - Optional Axios configuration.
 * @returns {Promise<Object>} A standardized response object.
 */
export const sendGet = async ({ url='', params = {},config={} }) => {
    try {
        const response = await axios.get(url, {params,...config});
        return {
            success: true,
            ...response.data,
            status: response.status
        };
    } catch (error) {
        return processError(error);
    }
};



/**
 * 
 * 
 * send post request
 * 
 * @param {url,payload,header} 
 */

export const sendPost = async ({ url = '', payload = {},accessToken, type="Bearer",contentType='application/json'})=>{
    const headers = {
        'Content-Type': contentType,
    }

    if(accessToken){
        if(type==="Bearer"){
            headers['Authorization']=`Bearer ${accessToken}`
        }
    }
    try {
        const response = await axios.post(url, {...payload}, {headers});
        return {
            ...response?.data,
            status: response.status,
            success:true,
        }
    } catch (error) {
        return processError(error);
    }
}