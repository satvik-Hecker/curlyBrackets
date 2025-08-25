import { Button } from "@/components/ui/button"
import { Castoro } from "next/font/google";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/Features";
import { Faq } from "@/components/landing/Faq";
import Head from "next/head";

const castoro = Castoro({
  weight: '400', 
  subsets: ['latin'],
  variable: '--font-castoro',
});

export default function Home() {
  return (
    
    <div className="min-h-screen w-full relative bg-black">
        {/* Indigo Cosmos Background with Top Glow */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 0%, rgba(94, 234, 212, 0.3), transparent 75%), #000000",
          }}
        />
        <HeroSection></HeroSection>
        <FeaturesSection></FeaturesSection>
        <Faq/>
        </div>
        
  );
}
