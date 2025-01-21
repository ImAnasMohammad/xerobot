async function getAccountDetails(accessToken) {
    try {
        const response = await axios.get(`${process.env.NEXT_GRAPH_INSTAGRAM_URL}/me`, {
            params: {
                fields: "id,username,account_type,media_count,profile_picture_url",
                access_token: accessToken,
            },
        });
        return {
            success:true,
            data:response.data
        };
    } catch (error) {
        
        return{
            success:false,
            message:'Unable to get your details.'
        }
    }
}

export default getAccountDetails;