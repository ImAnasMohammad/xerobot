
'use client'

import Features from "@/components/custom/Features/Features"
import Footer from "@/components/custom/Footer"
import HeroSection from "@/components/custom/Hero/Hero"
import Navbar from "@/components/custom/NavBar"
import { useColorModeValue } from "@/components/ui/color-mode"

const Main = () => {
    return(
    <>
        <main style={{
            background:useColorModeValue('rgb(252, 252, 252)','#040404'),
            position:'relative',
        }}>
            <div style={{position:'absolute',width:'100%',top:0}}>
                <Navbar/>
            </div>
            <HeroSection/>
            <Features/>
        </main>
        <Footer/>
    </>
    )
}

export default Main