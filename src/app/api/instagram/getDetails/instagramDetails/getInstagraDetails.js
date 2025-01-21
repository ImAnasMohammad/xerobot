import axios from "axios";


const getInstagramDetails = async (pageId, access_token) => {
    try {
        const detailsResponse = await axios.get(`${process.env.NEXT_PUBLIC_GRAPH_API_URL}/${pageId}`, {
            params: {
                access_token,
                fields: "instagram_business_account",
            },
        });
        const instagramAccount = detailsResponse?.data?.instagram_business_account;

        if (instagramAccount) {
            const detailsResponse = await axios.get(`${process.env.NEXT_PUBLIC_GRAPH_API_URL}/${instagramAccount.id}`,{
                params:{
                    fields:"id,username,name,profile_picture_url",
                    access_token
                }
            });
            const {
                id:accountId,
                username:accountUserName,
                name:accountName,
                profile_picture_url:profilePicture,
            } = detailsResponse.data;
            return {
                success: true,
                data: {accountId,accountName,accountUserName,profilePicture},
                status: 200
            }
        } else {
            return {
                success: false,
                message: 'No Instagram account connected to this page.',
                status: 200
            }
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error?.response?.data?.error?.message ?? "Something went wrong.",
            status: 500
        }
    }
}

export default getInstagramDetails