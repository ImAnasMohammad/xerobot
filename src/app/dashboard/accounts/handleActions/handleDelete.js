import { sendDelete } from "@/utils/sendRequest";

const handleDelete = async (id,accounts,setAccounts,setLoading)=>{
    if(!id){
        return {
            success:false,
            message:"Invalid Id"
        }
    }
    setLoading(true)
    const url = `/api/socialAccounts/accounts`;
    const res = await sendDelete({ url, params: { id } });
    if(res?.success){
        setAccounts([...accounts?.filter(item=>item?._id!=id)]);
    }
    setLoading(false);
}


export default handleDelete;