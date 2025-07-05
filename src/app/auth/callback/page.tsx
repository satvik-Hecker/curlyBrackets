"use client"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { toast } from "sonner"
import { error } from "console"

export default function AuthCallbackPage(){
    const router= useRouter()
    const [loading, setLoading]= useState(true)

    useEffect(()=> {
        console.log("🔄 AuthCallbackPage: useEffect triggered")
        const handleAuth= async ()=>{
            console.log("🔄 AuthCallbackPage: handleAuth started")

            const  {
                data : { session },
                error,
            }= await supabase.auth.getSession()
            console.log("🔄 AuthCallbackPage: session from getSession: ", session)
            console.log("🔄 AuthCallbackPage: session error: ",error)

            if(!session){
              
                const { data: { subscription } } = supabase.auth.onAuthStateChange(async(event,newSession)=>{
                    console.log("🔄 AuthCallbackPage: onAuthStateChange event: ",event)

                    if(newSession){
                        console.log("🔄 AuthCallbackPage: session restored")
                        await completeLogin(newSession)
                    }
                })
                
                
                setTimeout(() => {
                    subscription.unsubscribe()
                }, 10000)
                return
            }
            await completeLogin(session)
        }
        const completeLogin= async (session : any )=>{
            const {user}= session
            console.log("User ID:", user.id)
            console.log("User metadata:", user.user_metadata)
            console.log("User email:", user.email)

            const {data : existingProfile, error : fetchError}= await supabase
            .from("profiles")
            .select("id")
            .eq("id",user.id)
            .single()

            console.log("existing profile: ",existingProfile)
            console.log("fetch error: ",fetchError)

            if(!existingProfile && (fetchError?.code === 'PGRST116' || !fetchError)) {
                const profileData = {
                    id: user.id,
                    email: user.email,
                    name: user.user_metadata?.name || user.user_metadata?.full_name || user.user_metadata?.display_name || "Anonymous",
                    avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || 
                        `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.user_metadata?.name || user.email}`,
                }
                
                console.log("Attempting to insert profile:", profileData)
                
                const { error : insertError}= await supabase.from("profiles").insert(profileData)

                if(insertError){
                    console.error("profile insert error :",insertError)
                    toast.warning("logged in but failed to save profile")
                }else {
                    console.log("✅ Profile inserted successfully")
                }
            } else {
                console.log("Profile already exists or fetch error:", fetchError)
            }
            toast.success("You are logged in")
            router.push("/dashboard")
        }
        handleAuth()
    },[router])

    return (
<div className="flex h-screen w-full items-center justify-center bg-black text-white font-mono text-lg">
Redirecting...
</div>
)
}