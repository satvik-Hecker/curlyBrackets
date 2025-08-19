"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, Trophy, CheckCircle, RefreshCw, Star } from "lucide-react"
import Beams from "@/components/ui/Beam"
import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { countUnlockedProjects } from "@/utils/projectUtils"
import { projects } from "@/data/projectData"
import { badges, Badge as BadgeType } from "@/data/badgesData"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip"
import { fetchUserEarnedBadges } from "@/services/badgeServices"

type Profile = {
  id: string
  name: string | null
  email: string | null
  avatar_url: string | null
  created_at: string | null
  last_login?: string | null
}

export default function Dashboard() {
  const [user, setUser] = useState<Profile | null>(null)
  const [earnedBadges, setEarnedBadges] = useState<BadgeType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lessonsCompleted, setLessonsCompleted] = useState(0)

  const totalBadges = badges.length
  const totalProjects = projects.length

  const earnedCount = earnedBadges.length
  const unlockedProjects = countUnlockedProjects(projects, earnedBadges)

  // fetch profile data
  const fetchUser = async () => {
    const { data: auth, error: authError } = await supabase.auth.getUser()
    if (authError || !auth?.user) {
      setUser(null)
      setIsLoading(false)
      return
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", auth.user.id)
      .single()

    if (profileError || !profile) {
      setUser({
        id: auth.user.id,
        name: auth.user.user_metadata?.name ?? null,
        email: auth.user.email ?? null,
        avatar_url: auth.user.user_metadata?.avatar_url ?? null,
        created_at: null,
        last_login: auth.user.last_sign_in_at ?? null,
      })
    } else {
      setUser({
        ...profile,
        email: auth.user.email ?? profile.email,
        last_login: auth.user.last_sign_in_at ?? null,
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          setIsLoading(false)
          return
        }

        // 1️⃣ fetch earned badges
        const userBadges = await fetchUserEarnedBadges(user.id)
        setEarnedBadges(userBadges)

        // 2️⃣ fetch lessons completed
        const { count: lessonsCount, error: lessonsError } = await supabase
          .from("lesson_progress")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("completed", true)

        if (!lessonsError) {
          setLessonsCompleted(lessonsCount || 0)
        }

        // 3️⃣ fetch profile info
        await fetchUser()
      } catch (err) {
        console.error("Error loading dashboard:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Beams
          beamWidth={2.9}
          beamHeight={30}
          beamNumber={18}
          lightColor="#7DF2E8"
          speed={2}
          noiseIntensity={0.9}
          scale={0.2}
          rotation={30}
        />
      </div>

      <div className="relative z-10 p-6">
        <div className="h-14 md:h-18" />
        <Separator className="bg-teal-700 mb-4" />
        <header className="container mx-auto px-4">
          <motion.h1
            className="font-mono text-3xl font-bold text-white drop-shadow-sm md:text-4xl"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome {user ? user.name : "Guest"}
          </motion.h1>
          <motion.p
            className="mt-2 max-w-2xl font-mono text-sm text-white/70 md:text-base"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            Your personal dashboard overview
          </motion.p>
        </header>

        <main className="container mx-auto px-4 py-8">
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="mb-2 h-5 w-40" />
                      <Skeleton className="h-4 w-56" />
                    </div>
                  </div>
                  <div className="mt-6 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </CardContent>
              </Card>
              <Card className="md:col-span-2">
                <CardContent className="p-6">
                  <Skeleton className="mb-4 h-6 w-60" />
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="h-24 w-full rounded-xl" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {/* Profile Card */}
              <Card className="bg-black/10 backdrop-blur-md text-gray-50 rounded-2xl py-4 w-full max-w-xs 
                border border-white/20 shadow-[25px_30px_70px_0px_rgba(13,148,136,0.3)] px-6 font-mono">
  
                {/* Header */}
                <CardContent className="flex justify-between items-center px-3 mb-3 p-0">
                  <h1 className="text-lg font-semibold">Profile</h1>
                  <RefreshCw
                    onClick={fetchUser}
                    className="h-5 w-5 text-gray-400 hover:text-teal-400 transition-colors duration-200 cursor-pointer"
                  />
                </CardContent>

                {/* Avatar + Progress Ring */}
                <CardContent className="flex flex-col items-center justify-center mb-2 p-0">
                  <div className="relative w-24 h-24 drop-shadow-sm">
                    <img
                      src={
                        user?.avatar_url ??
                        "https://placehold.co/96x96/1e293b/d1d5db?text=User"
                      }
                      alt="User Profile"
                      className="w-24 h-24 rounded-full object-cover p-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/20 shadow-sm"
                    />
                    <div className="absolute bottom-2 right-2 p-1.5 bg-teal-600 rounded-full shadow-md">
                      <Star className="h-3.5 w-3.5 text-white" />
                    </div>
                  </div>
                </CardContent>

                {/* Name + Email */}
                <CardContent className="flex flex-col items-center px-3 mb-3 p-0">
                  <h2 className="text-lg font-bold">{user?.name ?? "Learner"}</h2>
                  <p className="text-gray-400 text-sm">{user?.email ?? "—"}</p>
                </CardContent>

                {/* Stats */}
                <CardContent className="flex justify-around items-center px-3 p-0">
                  {/* Lessons Completed */}
                  <div className="flex flex-col items-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="p-2 mb-1 bg-slate-800/60 rounded-full text-teal-400 shadow-sm cursor-default">
                            <CheckCircle className="h-4 w-4" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>Lessons Completed</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span className="text-base font-semibold">{lessonsCompleted}</span>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-col items-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="p-2 mb-1 bg-slate-800/60 rounded-full text-teal-400 shadow-sm cursor-default">
                            <Users className="h-4 w-4" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>Badges Earned</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span className="text-base font-semibold">{earnedCount}</span>
                  </div>

                  {/* Unlocked Projects */}
                  <div className="flex flex-col items-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="p-2 mb-1 bg-slate-800/60 rounded-full text-teal-400 shadow-sm cursor-default">
                            <Trophy className="h-4 w-4" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>Projects unlocked</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span className="text-base font-semibold">{unlockedProjects}</span>
                  </div>
                </CardContent>


              </Card>
            </div>
          )}
        </main>

        <div className="h-16" />
      </div>
    </div>
  )
}
