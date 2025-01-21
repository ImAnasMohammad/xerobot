import axios from "axios";

async function getLongLivedAccessToken(shortLivedAccessToken, clientSecret) {
    try {
        const response = await axios.get(`${process.env.NEXT_FACEBOOK_APP_SECRET}/access_token`, {
            params: {
                grant_type: "ig_exchange_token",
                client_secret: clientSecret,
                access_token: shortLivedAccessToken,
            },
        });

        if (!response.data?.access_token) {
            return {
                success: false,
                message: 'Unable to get long lived access token'
            }
        }

        return {
            success: true,
            access_token: data.access_token,
            expires_in: data.expires_in
        }

    } catch (error) {
        return{
            success:false,
            message:error.message
        }
    }
}

export default getLongLivedAccessToken;