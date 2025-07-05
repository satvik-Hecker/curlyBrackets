"use client"
import type { Session } from '@supabase/supabase-js'
import {  Geist_Mono } from "next/font/google";
import { Castoro } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/navbar";
import { Toaster } from "sonner"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import Footer from "@/components/shared/footer";
import PostLoginNavbar from "@/components/shared/postlogin-nav";
import type { User } from '@supabase/supabase-js'






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
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) {
          console.error("Error getting user:", error)
        }
        setUser(user)
      } catch (error) {
        console.error("Unexpected error getting user:", error)
      } finally {
        setLoading(false)
      }
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])
  return (
    <html lang="en" className={`${geistMono.variable} ${castoro.variable}`}>
      <body>
      
        {!loading && (user ? <PostLoginNavbar/> : <Navbar/>)}
        
        {children}
        <Toaster position="top-right" richColors></Toaster>
        
        <Footer></Footer>
      </body>
    </html>
  );
}
