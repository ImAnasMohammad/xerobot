import saveUser from "@/app/api/user/saveUser";
import sendResponse from "@/utils/sendResponse";
import { jwtDecode } from "jwt-decode";
import jwt from 'jsonwebtoken'
import createCookie from "@/utils/cookies/createCookie";
import { sendGet } from "@/app/api/utils/sendRequest";


export async function POST(req) {

    const body = await req.json();
    let details = {};

    if(body?.access_token){
        const response = await sendGet({
            url: 'https://oauth2.googleapis.com/tokeninfo',
            params:{access_token:body.access_token}
        });
        
        if (!response?.success) {
            console.log(response);
            return sendResponse({ status: 500, message: 'Failed to login' });
        }
        details = {...response?.data};
    }else{
        details = jwtDecode(body.credential);
    }
    console.log(details)
    const {email,sub,name,picture} = details;
    const role =0;

    const register = await saveUser({
        name,
        email,
        authId:sub,
        authType:'Google',
        role,
        picture
    });

    if(!register?.success){
        return sendResponse(register);
    }

    const {id} = register;
    
    const token = jwt.sign({ id,role }, process.env.NEXT_JWT_SECRECT, {
        expiresIn: '7d',
    });
    
    return createCookie({token,time:604800},{role,name,picture})
    
}