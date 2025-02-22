import { toastError } from "@/components/custom/toast";


const instagramLogin = () => {
    return new Promise((resolve, reject) => {
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

        // Listen for the message containing the `code`
        const messageHandler = (event) => {
            if (event.origin !== window.location.origin) return;

            if (event.data?.code) {
                window.removeEventListener("message", messageHandler);
                resolve(event.data.code);
            } else {
                reject("No code received");
            }
        };

        // window.addEventListener("message", messageHandler);
        window.addEventListener("message", messageHandler, { once: true });
    });
};


const handleInstagramLogin = async () => {
    try {
        const code = await instagramLogin();
        window.location.href = `/api/instagram/auth/callback?code=${code}`;

    } catch (error) {
        toastError("Instagram Login Failed");
    }
}

export default handleInstagramLogin