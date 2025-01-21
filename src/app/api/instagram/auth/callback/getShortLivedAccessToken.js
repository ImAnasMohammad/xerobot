import axios from "axios";

async function getShortLivedAccessToken(code) {
    console.log("h")
    try {
        const tokenResponse = await axios.get(`${process.env.NEXT_PUBLIC_GRAPH_API_URL}/oauth/access_token`, {
            params: {
                client_id: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
                redirect_uri: process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_URI,
                client_secret: process.env.NEXT_FACEBOOK_APP_SECRET,
                code,
            },
        });

        if(!tokenResponse?.data?.access_token){
            return {
                success:false,
                status:500,
                message:"Unable to link your account"
            }
        }

        return{
            success:true,
            access_token:tokenResponse.data.access_token,
            token_type:tokenResponse.data.token_type,
            status:200
        }        
    } catch (error) {
        return {
            success:false,
            message:error.message,
            status:500
        }
    }
}

export default getShortLivedAccessToken