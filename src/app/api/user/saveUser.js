
import connectDB from '@/components/connections/db.connection';
import User from '@/models/User'

const saveUser = async (data)=>{

    try{
        const fields = [
            "email",
            "name",
            "authId",
            "picture",
            "authType",
            "role",
        ];
    
        let anyErrorsInFields = false;
    
        for(let key in data){
            if(!fields?.includes(key)){
                anyErrorsInFields = key;
                break;
            }
        }
    
        if(anyErrorsInFields){
            return {
                success:false,
                status:404,
                message:`Invalid Field ${anyErrorsInFields}`
            }
        }
        connectDB();
        const {authId,authType,name,profile} = data;
        const newUser = await User.findOneAndUpdate({authId,authType},{$set:data},{
            new: true,
            upsert: true,
            runValidators: true,
        });

        if(newUser) return {success:true,id:newUser?._id};

        return {success:false,message:"Somenting went wrong",status:500};
    }catch(err){
        return {
            success:false,
            message:err?.message ?? 'Something went wrong',
            status:500
        }
    }
    

}


export default saveUser;