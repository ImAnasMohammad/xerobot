import axios from "axios";

const handleError = (error) => {
    if (error.response) {
        if (error.response?.data?.error?.code === 190) {
            return {
                status: 401,
                message: "Your permissions has expired",
                resetPermissions: true,
                success:false
            }
        }
        if (error.response?.data?.message?.error?.code === 100) {
            return {
                status: 100,
                message: "Permissions missing",
                resetPermissions: true,
                success:false
            }
        }
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

const sendPost = async (url,payload,accessToken) => {
    try {
        const response = await axios.post(url, payload, {
            headers:{
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        console.log(response?.data)
        return {
            success: true,
            data: response?.data
        }
    } catch (error) {
        return handleError(error)
    }
}


export {sendPost};