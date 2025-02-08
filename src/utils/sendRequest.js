import axios from "axios";
/**
 * 
 * @param {Object} error
 * 
 */

const handleError = (error) => {
    console.log(error)
    if (error.response) {
        if(error.response?.status===404){
            return {
                message: "Unable to find the Page you looking for",
                success: false
            }
        }
        return {
            ...error.response?.data || 'Something went wrong.',
            success: false
        };
    }
    return {
        success: false,
        message: "Something went wrong"
    }
    
}



/**
 * 
 * @param {Object} {url,payload,accessToken,type,contentType} 
 * @returns {Object}
 */
const   sendPost = async ({url,payload={},accessToken,type="Bearer",contentType='application/json'}) => {
    
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
            ...response?.data
        }
    } catch (error) {
        return handleError(error);
    }
}


/**
 * 
 * @param {Object} {url,params,accessToken,type} 
 * @returns {Object}
 */

const sendGet = async ({url,params={},accessToken,type="Bearer"}) => {
    
    const headers = {}

    if(accessToken){
        if(type==="Bearer"){
            headers['Authorization']=`Bearer ${accessToken}`
        }
    }
    try {
        const response = await axios.get(url, {params}, {headers});
        return {
            ...response?.data
        }
    } catch (error) {
        return handleError(error);
    }
}


/**
 * 
 * @param {Object} {url,body,accessToken,type} 
 * @returns {Object}
 */

const sendPut = async ({url,body={},accessToken,type="Bearer"}) => {
    
    const headers = {}

    if(accessToken){
        if(type==="Bearer"){
            headers['Authorization']=`Bearer ${accessToken}`
        }
    }
    try {
        const response = await axios.put(url,body, {headers});
        return {
            ...response?.data
        }
    } catch (error) {
        return handleError(error);
    }
}

/**
 * 
 * @param {Object} {url,params,accessToken,type} 
 * @returns {Object}
 */

const sendDelete = async ({url,params={},accessToken,type="Bearer"}) => {
    
    const headers = {}

    if(accessToken){
        if(type==="Bearer"){
            headers['Authorization']=`Bearer ${accessToken}`
        }
    }
    try {
        const response = await axios.delete(url, {params}, {headers});
        return {
            ...response?.data,
            success:true
        }
    } catch (error) {
        return handleError(error)
    }
}
export {sendPost,sendGet,sendDelete,sendPut};