import axios from "axios";


async function getInstagramMedia(id,access_token) {
    try{
        const mediaResponse = await axios.get(`${process.env.NEXT_PUBLIC_GRAPH_API_URL}/${id}/media`, {
            params: {
                access_token,
                fields: "fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp",
            },
        });

        if(mediaResponse?.data?.data){
            return {
                success:true,
                data:mediaResponse?.data?.data
            }
        }else{
            return {
                success:false,
                message:"Something went wrong",
                status:500
            }
        }
    }catch(err){
        return {
            success:false,
            message:err?.message,
            status:err?.status ?? 500
        }
    }
}


export default getInstagramMedia;