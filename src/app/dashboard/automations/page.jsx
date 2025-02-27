import Main from "./Main"


export const metadata = {
    title: "My Automation - Xerobot",
    description: "Create, manage, and optimize your social media automation workflows effortlessly with Xerobot.",
    keywords: ["Xerobot", "automation", "chatbot", "social media automation", "AI automation", "workflow automation"],
    openGraph: {
        title: "My Automation - Xerobot",
        description: "Create, manage, and optimize your social media automation workflows effortlessly with Xerobot.",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/automation`,
        siteName: "Xerobot",
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/logos/xerobot.png`,
                width: 1200,
                height: 630,
                alt: "Xerobot Automation",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "My Automation - Xerobot",
        description: "Create, manage, and optimize your social media automation workflows effortlessly with Xerobot.",
        images: [`${process.env.NEXT_PUBLIC_BASE_URL}/logos/xerobot.png`],
    },
};


const page = () => {
    return <Main />
}


export default page
