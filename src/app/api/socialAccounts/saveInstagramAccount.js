import connectDB from "@/components/connections/db.connection";
import SocialMediaAccounts from "@/models/SocialMediaAccounts";

const saveInstagramAccount = async (details) => {
  connectDB();
  try {
    const {
      profile_picture_url='',
      name,
      username,
      id,
      account_type,
      user_id,
      accessToken,
      userId
    } = details;
    const newOrUpdateAccount = await SocialMediaAccounts.findOneAndUpdate(
      { accountId: id },
      {
        $set: {
          userId,
          accountId: id,
          accountName: name,
          accountUserName: username,
          accountProfile: profile_picture_url,
          platform: 'Instagram',
          accountType: account_type,
          accessKey: accessToken,
          isCompleted: true,
          isActive: true,
          streamId: user_id,
          iskeyExpired: false,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    if(newOrUpdateAccount?._id)return {success:true,id:newOrUpdateAccount._id}

    return {
      success:false,
      message:'Somenthing went wrong.'
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


export default saveInstagramAccount