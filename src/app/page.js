'use client'
import Features from "@/components/custom/Features/Features";
import Footer from "@/components/custom/Footer";
import HeroSection from "@/components/custom/Hero/Hero";
import NavBar from "@/components/custom/NavBar";

import { useColorModeValue } from "@/components/ui/color-mode";


export default function Home() {
  return (
    <>
      
      <main style={{
        background:useColorModeValue('rgb(240 240 240)', '#040404'),
        position:'relative',
      }}>
        <div style={{position:'absolute',width:'100%',top:0}}>
          <NavBar/>
        </div>
        <HeroSection/>
        <Features/>
      </main>
      <Footer/>
    </>
  );
}
