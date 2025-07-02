"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Castoro } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/navbar";
import { Toaster } from "sonner"
import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import Footer from "@/components/shared/footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const castoro = Castoro({
  weight: '400', 
  subsets: ['latin'],
  variable: '--font-castoro',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()
  const pathname = usePathname();

  useEffect(()=>{
    const redirectIfLogin = async() =>{
      const { data : {user}} =await supabase.auth.getUser();

      // if(user && (pathname==="/" || pathname==="/signup" || pathname==="/login")){
      //   router.push("/dashboard")
      // }
    };
    redirectIfLogin();

  },[router,pathname])
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${castoro.variable}`}>
      <body>
        <Navbar></Navbar>
        {children}
        <Toaster position="top-right" richColors></Toaster>
        
        <Footer></Footer>
      </body>
    </html>
  );
}
