import axios from "axios";

const sendPost = async (url,payload,accessToken) => {
    try {
        const response = await axios.post(url, payload, {
            headers:{
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return {
            success: true,
            data: response?.data
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


export {sendPost};