
import redirect from "@/utils/redirect";
import sendResponse from "@/utils/sendResponse";

export async function GET(req) {


    const errorRedirect = (err) => {
        return redirect(req, `/dashboard/accounts?error=${err}`);
    };

    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
        return errorRedirect("Authorization code not found");
    }

    return sendResponse({code,status:200})

}