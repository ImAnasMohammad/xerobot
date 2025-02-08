import { sendDelete } from "@/utils/sendRequest"

const handleDelete = (id)=>{
    if(!id){
        return {
            success:false,
            message:"Invalid id"
        }
    }
    return sendDelete({url:`/api/automations`,params:{id}})
}

export default handleDelete;