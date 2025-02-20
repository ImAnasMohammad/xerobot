
import Main from "./Main";

export const metadata = {
  title: "Xerobot - AI-Powered Social Media Automation",
  description:
    "Xerobot is your all-in-one AI-driven social media automation platform. Schedule posts, engage with your audience, analyze performance, and grow your business effortlessly on Facebook, Instagram, and YouTube.",
  keywords: [
    "Xerobot",
    "social media automation",
    "AI chatbot",
    "Facebook automation",
    "Instagram automation",
    "YouTube automation",
    "social media marketing",
    "chatbot automation",
    "AI-powered engagement",
    "social media scheduler",
    "content automation",
    "business automation tools",
    "creator tools",
    "digital marketing",
  ],
  openGraph: {
    title: "Xerobot - AI-Powered Social Media Automation",
    description:
      "Automate your social media tasks with Xerobot. AI-powered tools for scheduling, engagement, and analytics to boost your business growth.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    siteName: "Xerobot",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/logos/xerobot.png`,
        width: 1200,
        height: 630,
        alt: "Xerobot Landing Page",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xerobot - AI-Powered Social Media Automation",
    description:
      "Automate your social media with Xerobot's AI-powered scheduling, chatbot, and analytics tools for business growth.",
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/logos/xerobot.png`],
  },
};



export default function Home() {
  return <Main/>
}
