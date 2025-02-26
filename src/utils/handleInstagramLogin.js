import { toastError } from "@/components/custom/toast";



const instagramLogin = () => {
    return new Promise((resolve, reject) => {
        const redirectUri = process.env.NEXT_PUBLIC_APP_DOMAIN+'/redirect';
        console.log(redirectUri)
        const authUrl = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=${process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID}&redirect_uri=${redirectUri}&response_type=code&scope=${process.env.NEXT_PUBLIC_INSTAGRAM_PERMISSIONS}`;

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

        setInterval(() => {
            const data = window.localStorage.getItem('instagram_auth_code');
            if (data) {
                window.localStorage.removeItem('instagram_auth_code');
                resolve(data);
            }
        }, 500);
    });
};


const handleInstagramLogin = async () => {
    try {
        // const code = await instagramLogin();
        const code = 'sdfsdfsdfsdf'
        // await instagramLogin();
        console.log(code)
        if(code){
            console.log(code)
            const url = `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/instagram/auth/callback?code=${code}`;
            console.log(url)
            window.location.href=url;        
        }else{
            toastError("Instagram Login Failed");
        }
    } catch (error) {
        toastError("Instagram Login Failed");
    }
}

export default handleInstagramLogin