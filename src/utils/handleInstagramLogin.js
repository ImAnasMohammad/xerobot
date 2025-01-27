

import axios from "axios";
const instagramUrl = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=${process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID}&redirect_uri=${process.env.NEXT_PUBLIC_APP_DOMAIN}/${process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI}&response_type=code&scope=${process.env.NEXT_PUBLIC_INSTAGRAM_PERMISSIONS}`;
const width = 600;
const height = 700;


const handleInstagramLogin = () => {
    
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    const popupStr = `width=${width},height=${height},top=${top},left=${left},resizable=no,scrollbars=yes,status=no`;
    console.log(instagramUrl)
    // window.open(facebookAuthUrl,"Instagram Login");
    window.location.href=instagramUrl
    

    // const interval = setInterval(async () => {
    //     try {
    //         if (popup && popup.closed) {
    //             clearInterval(interval);
    //             return {
    //                 success:false,
    //                 error:"Connection cancelled"
    //             }
    //         }

    //         if (popup && popup.location.href.includes("code=")) {
    //             const urlParams = new URLSearchParams(popup.location.search);
    //             const code = urlParams.get("code");
    //             await getAccountDetails(code,setError,setLoading,setNewAccount,interval);
    //             clearInterval(interval);
    //         }
    //     } catch (error) {
    //         return{
    //             success:false,
    //             error:error.message
    //         }
    //     }
    // }, 1000);
};


const getAccountDetails =async (code,setError,setLoading,setSuccess)=>{
    try{
        let res = await axios.get(`/api/auth/callback?code=${code}`);
        
        if(res?.data?.data!==null){

        }else{
            setError(res?.data?.message);
        }
    }catch(err){
        setError(err.message);
    }finally{
        setLoading(false);
    }
}

export {handleInstagramLogin};