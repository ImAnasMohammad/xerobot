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
    setLoading(false);
    if(res?.success){
        setAccounts([...accounts?.filter(item=>item?._id!=id)]);
        return {success:true}
    }
    return {success:false,message:res?.message || "Something went wrong"};
}


export default handleDelete;