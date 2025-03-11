
import connectDB from '@/components/connections/db.connection';
import User from '@/models/User'

const saveUser = async (data)=>{

    const error=(message,status=404)=>{
        return {
            status,
            success:false,
            message
        }
    }

    const {
        name=null,
        email='',
        authId=null,
        picture='',
        authType=null
    }=data;

    if(!name) return error("Invalid name");
    // if(!email) return error("Invalid email");
    if(!authId) return error("Invalid id");
    // if(!picture) return error("Invalid picture");
    if(!authType) return error("Invalid auth type");

    try{
        
    
    
        const dbConnection = await connectDB();
        if(!dbConnection?.success)return error('Unable to connect DB',500)

        const newUser = await User.findOneAndUpdate({authId,authType},{$set:{
            name,
            email:email || '',
            picture:picture || '',
            authType,
            authId
        }},{
            new: true,
            upsert: true,
            runValidators: true,
        });

        if(newUser) return {success:true,id:newUser?._id,role:newUser?.role};

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