import sendResponse from "@/utils/sendResponse";
import getShortLivedAccessToken from "./getShortLivedAccessToken";
import getFacebookDetails from "./getFacebookDetails";
import { encrypt } from "@/utils/encryption";
import connectDB from "@/components/connections/db.connection";
import redirect from "@/utils/redirect";
import SocialMediaAccounts from "@/models/SocialMediaAccounts";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return sendResponse(404, "Authorization code not found");
  }

  const shortToken = await getShortLivedAccessToken(code);
  if (!shortToken?.success) {
    return sendResponse(shortToken?.status, shortToken?.message);
  }

  const { access_token, token_type } = shortToken;

  const facebookDetails = await getFacebookDetails(access_token);

  if (!facebookDetails?.success) {
    return sendResponse(
      facebookDetails.status ?? 500,
      facebookDetails.message ?? "Something went wrong while fetching details."
    );
  }

  const {id,name,picture} = facebookDetails.details;

  const accountDetails = {
    platform:'Instagram',
    accountId:id, // update later instagram account id after selecting instagram account.
    facebookId:id, // facebook id which is connected with instagram defult it is null
    accessKey:encrypt(access_token), // access token.
    accountProfile:picture.data.url,
    tokenType:token_type,
    isCompleted:false // it will be set to true when account is fully conneted
  }

  const saveDetailsResponse = await saveDetails(accountDetails);

  if(!saveDetailsResponse.success){
    return sendResponse(saveDetailsResponse.status, saveDetailsResponse.error);
  }

  return redirect(req,`/dashboard/accounts/addAccount/instagram/confirm/${saveDetailsResponse.id}`)

}



const saveDetails = async (details)=>{
    try {
      await connectDB();
      const savedAccount = await SocialMediaAccounts.findOneAndUpdate(
        {accountId:details.accountId},
        details,
        { upsert: true, new: true }
      );
      
      return {
        success:true,
        id:savedAccount?._id
      }
    } catch (error) {
      console.log(error)
      return {
        success:false,
        status:500,
        error:error.message
      }
    }
}