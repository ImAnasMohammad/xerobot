import connectDB from "@/components/connections/db.connection";
import SocialMediaAccounts from "@/models/SocialMediaAccounts";
import { decrypt } from "@/utils/encryption";

const fetchAccessToken = async(id,fields={})=>{
    await connectDB();
    fields = {...fields,accessKey:true}

    try{
        const account = await SocialMediaAccounts.find({_id:id},{...fields});
        if(account?.length>0){

            return{
                success:true,
                message:"ok",
                status:200,
                ...account[0].toObject(),
                accessKey:decrypt(account[0].accessKey),
            }
        }else{
            return{
                success:false,
                message:"Invalid id",
                status:404
            }

        }
    }catch(err){
        console.log(err)
        return{
            success:false,
            message:err.message,
            status:500
        }
    }

}

export default fetchAccessToken;