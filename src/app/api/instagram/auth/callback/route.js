import getInstagramShortLivedAccessToken from "./getInstagramShortLivedAccessToken";
import { encrypt } from "@/utils/encryption";
import redirect from "@/utils/redirect";
import getInstagramAccountDetails from "./getInstagramAccountDetails";
import saveInstagramAccount from "@/app/api/socialAccounts/saveInstagramAccount";
import getCookie from "@/utils/cookies/getCookie";
import checkInstagramAccount from "@/app/api/socialAccounts/checkInstagramAccount";

export async function GET(req) {

    const baseUrl = process.env.NEXT_PUBLIC_APP_DOMAIN


    const errorRedirect = (err) => {
        return redirect(req, `${baseUrl}/dashboard/accounts?error=${err}`);
    };

    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    const userDetails = await getCookie(req);
    if (!userDetails?.success) {
        return redirect(`${baseUrl}/login?error=Session expired please relogin.`);
    }

    if (!code) {
        return errorRedirect("Authorization code not found");
    }


    const shortToken = await getInstagramShortLivedAccessToken(code);


    if (!shortToken?.success) {
        return errorRedirect(shortToken?.message);
    }

    const { access_token, user_id } = shortToken;

    const accountDetailsRes = await getInstagramAccountDetails(access_token);

    if (!accountDetailsRes?.success) {
        return errorRedirect(accountDetailsRes?.message);
    }

    
    const userId = userDetails?.data?.payload?.id;

    const checkInstagramLink = await checkInstagramAccount(accountDetailsRes.id,userId);

    if(!checkInstagramLink?.success){
        return errorRedirect(checkInstagramLink?.message);
    }



    const savedSocialAccount = await saveInstagramAccount({
        ...accountDetailsRes,
        user_id,
        accessToken: encrypt(access_token),
        userId
    });

    if (!savedSocialAccount?.success) {
        return errorRedirect(savedSocialAccount?.message);
    }

    return redirect(req, `/dashboard/accounts/addAccount/instagram/accountAdded/${savedSocialAccount.id}`);
}
