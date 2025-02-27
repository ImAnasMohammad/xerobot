import Main from "./Main" ;
import { Suspense } from "react";


export const metadata = {
    title: "My Accounts - Xerobot",
    description: "Manage and automate your connected social media accounts with Xerobot.",
    keywords: ["Xerobot", "social media accounts", "automation", "chatbot", "AI automation", "manage accounts"],
    openGraph: {
      title: "My Accounts - Xerobot",
      description: "Manage and automate your connected social media accounts with Xerobot.",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/accounts`,
      siteName: "Xerobot",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/logos/xerobot.png`,
          width: 1200,
          height: 630,
          alt: "Xerobot Accounts",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "My Accounts - Xerobot",
      description: "Manage and automate your connected social media accounts with Xerobot.",
      images: [`${process.env.NEXT_PUBLIC_BASE_URL}/logos/xerobot.png`],
    },
  };
  


  
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Main />
    </Suspense>
  );
}
  