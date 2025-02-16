import { sendPost } from "@/app/api/utils/sendRequest";


async function getInstagramShortLivedAccessToken(code) {

    const payload = {
        client_id: process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID,
        redirect_uri:process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI,
        grant_type:'authorization_code',
        client_secret: process.env.NEXT_INSTAGRAM_APP_SECRET,
        code,

    };

    const url = `https://api.instagram.com/oauth/access_token`;

    return await sendPost({url,payload,contentType:'application/x-www-form-urlencoded'});
}



export default getInstagramShortLivedAccessToken