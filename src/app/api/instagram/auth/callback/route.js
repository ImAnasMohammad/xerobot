import sendResponse from "@/utils/sendResponse";
import getInstagramShortLivedAccessToken from "./getInstagramShortLivedAccessToken";
import { encrypt } from "@/utils/encryption";
import connectDB from "@/components/connections/db.connection";
import redirect from "@/utils/redirect";
import SocialMediaAccounts from "@/models/SocialMediaAccounts";
import getInstagramAccountDetails from "./getInstagramAccountDetails";
import saveInstagramAccount from "@/app/api/socialAccounts/saveInstagramAccount";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return sendResponse({status:404,message: "Authorization code not found"});
  }

  const shortToken = await getInstagramShortLivedAccessToken(code);
  if (!shortToken?.success) {
    const {status, message} = shortToken;
    return sendResponse({message,status});
  }

  const {access_token,user_id} = shortToken;

  const accountDetailsRes = await getInstagramAccountDetails(access_token);

  if(!accountDetailsRes?.success){
    const {status, message} = accountDetailsRes;
    return sendResponse({message,status});
  }
  
  const savedSocialAccount = await saveInstagramAccount({...accountDetailsRes,user_id,accessToken:encrypt(access_token)});
  if(!savedSocialAccount?.success){
    const {status, message} = savedSocialAccount;
    return sendResponse({message,status});
  }
  
  return redirect(req,`/dashboard/accounts/addAccount/instagram/accountAdded/${savedSocialAccount.id}`);
}

