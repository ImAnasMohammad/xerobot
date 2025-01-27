import axios from "axios";

async function getInstagramShortLivedAccessToken(code) {

    const data = {
        client_id: process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID,
        redirect_uri: process.env.NEXT_PUBLIC_APP_DOMAIN+'/'+process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI,
        grant_type:'authorization_code',
        client_secret: process.env.NEXT_INSTAGRAM_APP_SECRET,
        code,

    };

    try {
        const tokenResponse = await axios.post(`https://api.instagram.com/oauth/access_token`, new URLSearchParams(data).toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }  
        );

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
            user_id:tokenResponse.data.user_id
        }        
    } catch (error) {
        console.log(error.response)
        return {
            success:false,
            message:error.message,
            status:500
        }
    }
}

export default getInstagramShortLivedAccessToken