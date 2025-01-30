import saveUser from "@/app/api/user/saveUser";
import sendResponse from "@/utils/sendResponse";
import { jwtDecode } from "jwt-decode";
import jwt from 'jsonwebtoken'
import createCookie from "@/utils/cookies/createCookie";
import axios from "axios";


export async function POST(req) {

    const body = await req.json();
    let details = {}

    if(body?.access_token){
        try {
            const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
              headers: { Authorization: `Bearer ${body.access_token}` },
            });
            details = {...response?.data};
        } catch (error) {
            console.log(error)
            return sendResponse({message:error?.response?.data})
        }
    }else{
        details = jwtDecode(body.credential);
    }
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