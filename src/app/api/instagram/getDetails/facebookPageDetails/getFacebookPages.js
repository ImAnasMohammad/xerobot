import axios from "axios";

async function getFacebookPageDetails(access_token) {
    try {
        const detailsResponse = await axios.get(`${process.env.NEXT_PUBLIC_GRAPH_API_URL}/me/accounts`, {
            params: {
                access_token,
                fields: "id,name,picture{url}",
            },
        });

        return{
            success:true,
            data:detailsResponse.data.data,
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

export default getFacebookPageDetails