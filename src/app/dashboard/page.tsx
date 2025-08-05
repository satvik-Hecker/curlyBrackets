"use client"
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Mail, Calendar, Edit3, Save, X, User, Shield, Clock, Hash } from "lucide-react"
import { motion, AnimatePresence } from 'framer-motion'

export default function Dashboard(){
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { user: authUser },
                error: authError,
            } = await supabase.auth.getUser()

            if (authError || !authUser) {
                setUser(null)
                setLoading(false)
                return
            }

            const { data: profile, error: profileError } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", authUser.id)
                .single()

            if (profileError) {
                console.error("Error fetching profile:", profileError)
                setUser(null)
            } else {
                setUser({
                    ...profile,
                    email: authUser.email,
                    last_login: authUser.last_sign_in_at,
                    app_metadata: authUser.app_metadata
                })
            }
            setLoading(false)
        }

        fetchUser()
    }, [])

    return(
        <div className="min-h-screen bg-black w-full relative font-mono">
            <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse 90% 70% at 50% 0%, rgba(94, 234, 212, 0.3), transparent 75%), #000000" }} />
            <div className="h-18" />
            <main className="relative z-10 p-4 md:p-6 space-y-6 "> 
                <div className='px-4 md:px-10 lg:px-20'>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white tracking-wider">Dashboard</h1>
                    <p className="text-gray-300 text-sm">Welcome back, {user?.name || 'Guest'} ✨</p>
                    
                </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 px-4 md:px-10 lg:px-20">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.6 }}
    whileHover={{ scale: 1.01 }}
    className="xl:col-span-2"
  >
    <Card className="bg-teal-500/30 backdrop-blur-sm border-teal-700 hover:shadow-xl">
      <CardContent className="p-6 md:p-7 text-center mb-13">
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-6 group">
          
          
          
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-100 break-words">John Doe</h2>
          <Badge className="bg-teal-200/80 text-black/90 border border-teal-950 text-sm px-3 py-2 rounded-2xl">Certified DevPaglu 🌠</Badge>
          <div className="space-y-3 text-gray-300">
            <div className="flex items-center justify-center">
              <Mail className="w-4 h-4 mr-2" />
              <span className="text-sm break-all">john@example.com</span>
            </div>
            <div className="flex items-center justify-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">Joined 01/01/2024</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 0.6 }}
    whileHover={{ scale: 1.01 }}
  >
    <Card className="bg-teal-100/90 backdrop-blur-xl border-white hover:shadow-xl ">
      <CardContent className="pt-4 px-5 md:px-7">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-teal-950">Account Details</h3>
        </div>

        <div className="space-y-5 text-sm md:text-base">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-teal-900 font-semibold flex items-center">
                <User className="w-4 h-4 mr-2" />Name
              </p>
            </div>
            <p className="font-medium text-md break-words">John Doe</p>
          </div>

          <div>
            <p className="text-teal-900 font-semibold flex items-center">
              <Mail className="w-4 h-4 mr-2" /> Email Address
            </p>
            <div className="flex items-center justify-between">
              <p className="font-medium break-words">john@example.com</p>
              <Badge variant="outline" className="text-xs border-teal-700/40 text-teal-800">Not Editable</Badge>
            </div>
          </div>

          <div>
            <p className="text-teal-900 font-semibold flex items-center">
              <Hash className="w-4 h-4 mr-2" /> User ID
            </p>
            <div className="flex items-center justify-between">
              <p className="font-medium break-words">abc-123-xyz</p>
              <Badge variant="outline" className="text-xs border-teal-700/40 text-teal-800">Not Editable</Badge>
            </div>
          </div>

          <div>
            <p className="text-teal-900 font-semibold flex items-center">
              <Shield className="w-4 h-4 mr-2" /> Auth Provider
            </p>
            <div className="flex items-center justify-between">
              <p className="font-medium break-words">Password</p>
              <Badge variant="outline" className="text-xs border-teal-700/40 text-teal-800">Not Editable</Badge>
            </div>
          </div>

          <div>
            <p className="text-teal-900 font-semibold flex items-center">
              <Clock className="w-4 h-4 mr-2" /> Last Login
            </p>
            <div className="flex items-center justify-between">
              <p className="font-medium break-words">07/20/2025, 12:30 PM</p>
              <Badge variant="outline" className="text-xs border-teal-700/40 text-teal-800">Not Editable</Badge>
            </div>
          </div>

          <div className="border-t border-gray-300/50 pt-4">
            <div className="bg-white/50 rounded-lg p-3 shadow-inner">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2" />
                  <span className="text-sm font-semibold text-gray-800">Account Status</span>
                </div>
                <Badge className="bg-green-500/20 text-green-700 border-green-500/30 text-xs py-1 px-2">Active</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
</div>



            </main>
        </div>
    )
}