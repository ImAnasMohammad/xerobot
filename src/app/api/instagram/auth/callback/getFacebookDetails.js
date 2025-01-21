import axios from "axios";
async function getFacebookDetails(access_token) {
    try {
        const detailsResponse = await axios.get(`${process.env.NEXT_PUBLIC_GRAPH_API_URL}/me`, {
            params: {
                fields:'id,name,picture',
                access_token
            },
        });

        if(!detailsResponse?.data){
            return {
                success:false,
                status:500,
                message:"Unable to link your account"
            }
        }

        return{
            success:true,
            status:200,
            details:detailsResponse.data
        }        
    } catch (error) {
        return {
            success:false,
            message:error.message,
            status:500
        }
    }
}

export default getFacebookDetails