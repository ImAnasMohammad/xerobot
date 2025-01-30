import axios from "axios";


const sendPost = async ({url,payload,accessToken,type="Bearer",contentType='application/json'}) => {
    
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
            success: true,
            ...response?.data
        }
    } catch (error) {
        console.log(error)
        if (error.response) {
            return {
                status: error.response.status,
                message: error.response.data,
                success: false
            };
        }
        return {
            status: 500,
            success: false,
            message: "Something went wrong while sending plain text message."
        }
    }
}


const sendGet = async ({url,params,accessToken,type="Bearer"}) => {
    
    const headers = {}

    if(accessToken){
        if(type==="Bearer"){
            headers['Authorization']=`Bearer ${accessToken}`
        }
    }
    try {
        const response = await axios.get(url, {params}, {headers});
        return {
            ...response?.data,
            success:true
        }
    } catch (error) {
        if (error.response) {
            return {
                status: error.response.status,
                message: error.response.data,
                success: false
            };
        }
        return {
            status: 500,
            success: false,
            message: "Something went wrong while sending plain text message."
        }
    }
}

export {sendPost,sendGet};