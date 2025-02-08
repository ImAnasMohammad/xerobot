import { sendPut } from "@/utils/sendRequest";

const handleStatus = async (id)=>{
    if(!id){
        return {
            success:false,
            message:"Invalid Id"
        }
    }
    const url = `/api/automations?id=${id}`;
    return await sendPut({ url,body:{type:'STATUS'} });
}

export default handleStatus;    