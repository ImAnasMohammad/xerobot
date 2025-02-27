import { sendGet } from "@/app/api/utils/sendRequest";



const getInstagramAccountDetails = async (access_token) => {
    const url = `https://graph.instagram.com/me`;
    const fields = 'profile_picture_url,name,username,id,account_type';
    const params = {fields,access_token}

    return await sendGet({url,params});
}

export default getInstagramAccountDetails;