import { toastError } from "@/components/custom/toast";



const instagramLogin = () => {
    return new Promise((resolve, reject) => {
        // const authUrl = `https://xerobot.in/redirect?code="sdfsdfsdf"`;
        const authUrl = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=${process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID}&redirect_uri=${process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI}&response_type=code&scope=${process.env.NEXT_PUBLIC_INSTAGRAM_PERMISSIONS}`;

        const width = 600, height = 700;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;

        // Open Instagram login in a popup
        const win = window.open(
            authUrl,
            "Instagram Login",
            `width=${width},height=${height},top=${top},left=${left}`
        );

        if (!win) {
            reject("Popup blocked. Please allow popups.");
            return;
        }

        const checkPopup = setInterval(() => {
            if (win.closed) {
                clearInterval(checkPopup);
                resolve(true);
            }
        }, 500);
    });
};


const handleInstagramLogin = async () => {
    try {
        const res = await instagramLogin();
        const code = window.localStorage.getItem('instagram_auth_code');
        if(res && code){
            window.location.href=`/api/instagram/auth/callback?code=${code}`;        
        }else{
            toastError("Instagram Login Failed");
        }
    } catch (error) {
        toastError("Instagram Login Failed");
    }
}

export default handleInstagramLogin