'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Mail, Calendar, Edit3, Save, X, User, Shield, Clock, Hash } from "lucide-react"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing]= useState(false);
  const [name,setName]=useState<string>("");
  

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
        setName(profile.name || "")
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

  const handleSaveName = async () => {
    setLoading(true);
    const{error}= await supabase
    .from('profiles')
    .update({name: name})
    .eq('id',user.id)

    if(error){
      console.error('error updating name:', error)
    }else {
      setUser((prev:any)=> ({ ...prev, name:name}));
      setIsEditing(false);
    }
    setLoading(false);
  };

  const joinedDate = user.created_at 
    ? new Date(user.created_at)
    : null

   

  return (
    <div className="min-h-screen bg-black w-full relative font-mono ">
      <div className="absolute inset-0 z-0" style={{background:"radial-gradient(ellipse 90% 70% at 50% 0%, rgba(94, 234, 212, 0.3), transparent 75%), #000000",}}/>
      <div className="h-18 "/> 
      <main className="p-6 space-y-6 relative">

        <div className='px-20'>
          <h1 className="text-3xl font-bold mb-2 text-white">Profile</h1>
          <p className="text-gray-300">View all your profile details here.</p>      
        </div>
              
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-20">

          <Card className="bg-teal-500/30 backdrop-blur-sm border-teal-700">
            <CardContent className="p-7 text-center">

              <div className="relative w-48 h-48 mx-auto mb-6 group">
                <div className="absolute inset-0 bg-teal-300/60 rounded-full "/>
                <Avatar className="w-full h-full border-4 border-white/10">
                  <AvatarImage src={user.avatar_url || ''} />
                  <AvatarFallback>{user.name?.charAt(0) || '?'}</AvatarFallback>
                </Avatar>
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
                  <Edit3 className="text-white w-8 h-8" />
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden"/>
                </label>
              </div>
              
              <div className="space-y-4">              
                <h2 className="text-4xl font-bold text-teal-100">{user.name || 'Unknown'}</h2>
                <Badge className="bg-teal-200/80 text-black/90 border border-teal-950 text-sm px-3 py-2 rounded-2xl">
                      Certified DevPaglu 🌠
                </Badge>
                <div className="space-y-3 ">
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



          <Card className="bg-teal-100/90 backdrop-blur-xl border-white">
            <CardContent className="pt-4 px-7 ">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-teal-950">Account Details</h3>
              </div>
          
              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-teal-900 font-semibold text-md  flex items-center">
                      <User className='w-5 h-5 pb-0.5 mr-0.5'/>Name
                    </p>
                  <div className="flex items-center space-x-2">
                    <Button onClick = {()=> {
                      if (isEditing){
                        handleSaveName();
                      }else {
                        setIsEditing(true);
                      }}} variant="ghost" size="sm" className="text-teal-900 hover:bg-teal-800/10  rounded-full">
                      {isEditing ? (
                      <>
                        <Save className='w-4 h-4 mr-1'>Save</Save>
                      </>
                    ): (
                      <>
                        <Edit3 className='w-4 h-4 mr-1'>Edit</Edit3>
                      </>
                    )}
                    </Button>
                      {isEditing && (
                    <Button onClick={() => setIsEditing(false)} variant="ghost" size="sm" className="text-teal-900 hover:bg-gray-400/10 p-2">
                      <X className="w-4 h-4" />
                    </Button>
                    )}
                  </div>
                </div>

                {isEditing? (
                  <input type="text" value={name} onChange={(e)=> setName(e.target.value)} className='w-full bg-white/10 border-2 border-gray-400/60 rounded-md px-3 py-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400/50' />
                ): (
                  <p className="font-medium text-md">{name}</p>
                )}
                </div>
                </div>                
            </CardContent>
          </Card>
        </div>
    </main>
  </div>  
  )
}
