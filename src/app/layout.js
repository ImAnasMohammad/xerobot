
import { Provider,LoadingProvider } from "@/provider";
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from "@/components/ui/toaster";


export const metadata = {
  title: "Xerobot",
  url:'',
  image:'',
  description: "XeroBot is a powerful AI-powered bot designed to revolutionize the way businesses optimize workflows, enhance productivity, and streamline daily operations. With cutting-edge machine learning algorithms, XeroBot automates repetitive tasks, assists in decision-making, and helps improve team efficiency. Whether you're a small business owner or part of a larger enterprise, XeroBot is your go-to solution for saving time and boosting business performance. Unlock new levels of automation with a smart, scalable, and customizable bot that integrates seamlessly into your existing tools and systems.",
  keywords:'AI bot, AI assistant, workflow automation, productivity enhancement, business automation, chatbot, intelligent assistant, AI-powered bot, smart automation, business productivity tools, AI for business, automation solutions, virtual assistant, machine learning, business optimization, time-saving automation, AI-driven workflow, advanced AI, business efficiency, digital assistant, task automation, AI productivity tools',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
        />
      </head>
      <body className='body'>
        <LoadingProvider/>
        <ToastContainer/>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_APP_ID}>
          <Provider>
            <Toaster/>
            {children}
          </Provider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
