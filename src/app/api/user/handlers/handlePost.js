
import sendResponse from "@/utils/sendResponse";
import saveUser from "../utils/saveUser";
import { sendGet } from "../../utils/sendRequest";
import jwt from 'jsonwebtoken'
import { jwtDecode } from "jwt-decode";
import createCookie from "@/utils/cookies/createCookie";

const handlePost = async (req)=>{
    const body = await req.json();

    
    if(!body?.authType){
        return sendResponse({status:404,message:"Invalid type"});
    }
    
    if(!(body.authType ==='facebook' || body.authType==='google')){
        return sendResponse({status:404,message:"Invalid type"});
    }
    
    let details = {};

    if(body.authType==='google'){
        if( body?.access_token){
        
            const googleDetailsResponse = await getGoogleDetails(body.access_token);

            if(!googleDetailsResponse?.success){
                const {status,message='Something went wrong'} = googleDetailsResponse;
                return sendResponse({status,message})
            }
            details = {...googleDetailsResponse?.data,authType:'google'};
        }else{
            let temp = jwtDecode(body.credential);
            details = {
                name:temp?.name,
                email:temp?.email,
                authType:'google',
                authId:temp?.sub,
                picture:temp?.picture
            }
        }
    }else{
        details = {...body,authId:body?.id,picture:body?.picture?.url};
    }

    const register = await saveUser({...details});

    if(!register?.success){
        return sendResponse(register);
    }

    const {id,role} = register;

    const token = jwt.sign({ id,role }, process.env.NEXT_JWT_SECRECT, {
        expiresIn: '7d',
    });
    
    return createCookie({token,time:604800},{role,name:details.name,picture:details.picture})



}

const getGoogleDetails = async (access_token)=>{
    console.log(access_token)
    const config = {
        headers:{
            Authorization: `Bearer ${access_token}`
        }
    }
    const response = await sendGet({
        url: 'https://www.googleapis.com/oauth2/v2/userinfo',
        config:{...config}
    });
    
    if (!response?.success) {
        return { status: 500, message: 'Failed to login',success:false};
    }
    
    return {success:true,data:{...response,authId:response.id}};
}

export default handlePost