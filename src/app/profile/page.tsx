'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Mail, Calendar, Edit3, Save, X, User, Shield, Clock, Hash } from "lucide-react"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const {
         data: { user },
          error: authError,
        } = await supabase.auth.getUser()
      if (authError || !user ){
     setUser(null)
      setLoading(false)
      return
    }

    const {data : profile, error : profileError}= await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

    if(profileError){
        console.error(profileError)
        setUser(null)
    }else{
        setUser(profile)
    }
    setLoading(false)
}

    fetchUser()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Skeleton className="w-[300px] h-[300px] rounded-lg" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>User not logged in.</p>
      </div>
    )
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) =>{
    const file = e.target.files?.[0]
    if(!file || !user.id) return

    const fileExt = file.name.split(".").pop()
    const fileName = `${user.id}-${Date.now()}.${fileExt}`

    const {error : uploadError}= await supabase.storage
    .from('avatars')
    .upload(fileName,file, {
        cacheControl:'3600',
        upsert:true,
    })

    if(uploadError){
        console.error('Upload Failed', uploadError)
        return
    }

    const { data }= supabase.storage
    .from ('avatars')
    .getPublicUrl(fileName)

    const publicUrl = data?.publicUrl
    if(!publicUrl) return

    const { error: updateError } = await supabase
    .from('profiles')
    .update({ avatar_url: publicUrl })
    .eq('id', user.id)

  if (!updateError) {
    setUser((prev: any) => ({ ...prev, avatar_url: publicUrl }))
  }
  } 

  const joinedDate = user.created_at 
    ? new Date(user.created_at)
    : null

  return (
    <div className="min-h-screen bg-black text-white font-mono ">
        <div className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(215deg,rgba(0, 0, 0, 1) 0%, rgba(11, 140, 123, 1) 100%)"
        }}>
        <div className="relative">
            <div className="h-18 border-b border-white/10"/>
        
      
        <main className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold mb-2">Profile</h1>
                <p className="text-gray-400">View all your profile details here.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-white/10 transition-all duration-300">
                <CardContent className="p-7 text-center">
                    <div className="relative w-36 h-36 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-transparent rounded-full"/>
                    <Avatar className="w-full h-full border-4 border-white/10">
                    <AvatarImage src={user.avatar_url || ''} />
                    <AvatarFallback>{user.name.charAt(0) || '?'}</AvatarFallback>
                    </Avatar>
                    <label className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer bg-black/40 rounded-full'>
                    <Edit3 className='text-white w-6 h-6'/>
                    <input type="file" 
                    accept='image/*'
                    onChange={handleAvatarUpload}
                    className='hidden'/></label>

                    
                    </div>

                    <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-teal-100">{user.name || 'Unknown'}</h2>
                  <Badge className="bg-teal-400/20 text-black border-teal-400/30 text-lg px-4 py-2 rounded-2xl">
                    Certified DevPaglu 💫
                  </Badge>

                  <div className="space-y-3 mt-6">
                    <div className="flex items-center justify-center text-gray-300">
                        <Mail className='w-4 h-4 mr-2'/>
                        <span className="text-sm">{user.email || 'example@email.com'}</span>
                    </div>
                    <div className="flex items-center justify-center text-gray-300">
                        <Calendar className='w-4 h-4 mr-2'/>
                        <span className='text-sm'>Joined {joinedDate?.toLocaleDateString() || 'Unknown'}</span>
                    </div>
                  </div>
                  </div>
                </CardContent>
                </Card>

                



            </div>

        </main>




        {/* <div className="bg-transparent font-mono p-8 mt-15  font-semibold text-teal-100 ml-4">
            
                <div>
              <h1 className="text-3xl font-bold mb-2">Profile</h1>
              <p className="text-gray-400">View all your profile details here.</p>
            </div>
        </div>
        <Card className="bg-zinc-900 border border-zinc-800 shadow-lg">
          <CardContent className="flex flex-col items-center gap-4 p-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.user_metadata?.avatar_url || ''} />
              <AvatarFallback>{user.user_metadata?.name?.charAt(0) || '?'}</AvatarFallback>
            </Avatar>

            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold text-teal-300">{user.user_metadata?.name || 'Unknown'}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              {joinedDate && (
                <p className="text-sm text-muted-foreground">
                  Joined on {joinedDate.toLocaleDateString()}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border border-zinc-800 shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-teal-200 mb-2">Your Badges</h3>
            <p className="text-sm text-muted-foreground">Coming soon...</p>
          </CardContent>
        </Card> */}
      </div>
      </div>
      </div>
    
    
  )
}
