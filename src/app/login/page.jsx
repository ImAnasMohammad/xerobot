
import Main from "./Main";


export const metadata = {
  title: "Login - Xerobot",
  description: "Sign in to Xerobot and automate your social media tasks effortlessly.",
  keywords: ["Xerobot", "login", "social media automation", "chatbot", "AI automation"],
  openGraph: {
    title: "Login - Xerobot",
    description: "Sign in to Xerobot and automate your social media tasks effortlessly.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
    siteName: "Xerobot",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/logos/xerobot.png`,
        width: 1200,
        height: 630,
        alt: "Xerobot Login",
      },
    ],
    type: "website",
  },
  twitter: {
    card:`${process.env.NEXT_PUBLIC_BASE_URL}/logos/xerobot.png`,
    title: "Login - Xerobot",
    description: "Sign in to Xerobot and automate your social media tasks effortlessly.",
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/logos/xerobot.png`],
  },
};

const LoginPage = () => {
  return <Main/>

};



export default LoginPage;
