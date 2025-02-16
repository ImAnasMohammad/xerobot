import connectDB from "@/components/connections/db.connection";
import SocialMediaAccounts from "@/models/SocialMediaAccounts";

const checkInstagramAccount = async (id,userId) => {
  connectDB();
  try {
    const getAccount = await SocialMediaAccounts.find(
      { accountId: id },{userId:1}
    );
    let isLinkedWithAnotherOne = false;

    getAccount?.map(item=>{
        if(item.userId !=userId){
            isLinkedWithAnotherOne=true;
        }
    });

    if(isLinkedWithAnotherOne){
        return {
            success:false,
            message:"This Instagram account already exist with another account.",
            status:400
        }
    }
    return {
        success:true
    }

  } catch (err) {
    if (err.code === 11000) {
      return {
        success: false,
        message: 'This account already linked.',
        status: 409
      }
    }
    return {
      success: false,
      message: err?.message ?? "Something went wrong.",
      status: 500
    }
  }
}


export default checkInstagramAccount