import axios from "axios";


const getInstagramAccountDetails = async (access_token) => {
    const url = `https://graph.instagram.com/me`;
    const fields = 'profile_picture_url,name,username,id,account_type,followers_count,follows_count,media_count';

    try {
        const response = await axios.get(url, {
            params: {
                fields,
                access_token
            },
        });

        return {
            success:true,
            ...response.data,
        };
    } catch (error) {
        console.error('Error fetching user info:', error.response ? error.response.data : error.message);

        return {
            success:false,
            message:error.response ? error.response.data : error.message ?? "Something went wrong"
        }
    }
}

export default getInstagramAccountDetails;