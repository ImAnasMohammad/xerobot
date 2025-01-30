import { jwtVerify } from 'jose';

const getCookie = async (request,name='authToken')=>{
    try{
        const token = request.cookies.get('authToken');

        if(!token) return {success:false};


        const secret = new TextEncoder().encode(process.env.NEXT_JWT_SECRECT || 'KEN%j7387jN9BKDHD^2Mfjsofsudf');
        const data = await jwtVerify(token?.value ?? '', secret);
        return {
            success:true,
            data
        }
    }catch(err){
        return {
            success:false
        }
    }
}

export default getCookie;