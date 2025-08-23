"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Award, LockKeyholeOpen, CheckCircle, RefreshCw, Star } from "lucide-react"
import Beams from "@/components/ui/Beam"
import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { countUnlockedProjects } from "@/utils/projectUtils"
import { projects } from "@/data/projectData"
import { Badge as BadgeType } from "@/data/badgesData"
import { fetchUserEarnedBadges } from "@/services/badgeServices"
import { CircularProgress } from "@/components/ui/CircleProgress"
import { LessonProgressCard } from "@/components/ui/LessonProgressCard"
import DailyQuestsCard from "@/components/ui/DailyQuestCard"
import { BadgeCard } from "@/components/ui/badgesCard"
import ProtectedRoute from "@/components/ProtectedRoute"

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
  const [isRefreshing, setIsRefreshing] = useState(false)

  const earnedCount = earnedBadges.length
  const unlockedProjects = countUnlockedProjects(projects, earnedBadges)

  const loadDashboard = async () => {
    try {
      setIsRefreshing(true)
      setIsLoading(true)

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setUser(null)
        return
      }

      const userBadges = await fetchUserEarnedBadges(user.id)
      setEarnedBadges(userBadges)

      const { data: completedLessons } = await supabase
        .from("lesson_progress")
        .select("id")
        .eq("user_id", user.id)
        .eq("is_completed", true)

      if (completedLessons) setLessonsCompleted(completedLessons.length)

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      setUser({
        id: user.id,
        name: profile?.name ?? user.user_metadata?.name ?? null,
        email: user.email ?? profile?.email ?? null,
        avatar_url: profile?.avatar_url ?? user.user_metadata?.avatar_url ?? null,
        created_at: profile?.created_at ?? null,
        last_login: user.last_sign_in_at ?? null,
      })
    } catch (err) {
      console.error("Error loading dashboard:", err)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  return (
    <ProtectedRoute>
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Beams */}
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

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-12 py-10">
        <Separator className="bg-teal-700 mb-6 mt-8" />

        {/* Header */}
        <header className="container mx-auto">
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

        {/* Main Grid */}
        <main className="container mx-auto mt-10">
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 h-96">
              {/* Profile Skeleton */}
              <Card className="bg-black/20 border border-white/10 rounded-2xl p-6 h-full">
                <CardContent className="flex flex-col items-center space-y-4">
                  <Skeleton className="h-24 w-24 rounded-full bg-slate-800/50" />
                  <Skeleton className="h-5 w-32 bg-slate-800/50" />
                  <Skeleton className="h-4 w-48 bg-slate-800/50" />
                  <div className="flex justify-around w-full mt-4">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-6 w-16 bg-slate-800/50" />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Lesson + Daily Quests Skeleton */}
              <Skeleton className="col-span-2 rounded-2xl bg-slate-800/50 h-full" />
            </div>
          ) : (
            <>
              {/* 3-column grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="h-full">
                  <Card className="bg-black/10 backdrop-blur-md text-gray-50 rounded-2xl p-6 border border-white/20 shadow-lg font-mono h-full flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <h1 className="text-2xl font-semibold">Profile</h1>
                      <RefreshCw
                        onClick={loadDashboard}
                        className={`h-5 w-5 text-gray-400 hover:text-teal-400 transition-colors cursor-pointer ${
                          isRefreshing ? "animate-spin text-teal-400" : ""
                        }`}
                      />
                    </div>

                    <div className="flex flex-col items-center mb-4">
                      <div className="relative w-24 h-24">
                        <CircularProgress progress={lessonsCompleted ? (lessonsCompleted / 49) * 100 : 0} />
                        <img
                          src={user?.avatar_url ?? "https://placehold.co/96x96/1e293b/d1d5db?text=User"}
                          alt="User Profile"
                          className="w-24 h-24 rounded-full object-cover p-1 absolute inset-0 m-auto border border-white/20"
                        />
                        <div className="absolute bottom-2 right-2 p-1.5 bg-teal-600 rounded-full shadow-md">
                          <Star className="h-3.5 w-3.5 text-white" />
                        </div>
                      </div>
                      <h2 className="mt-3 text-lg font-bold">{user?.name ?? "Learner"}</h2>
                      <p className="text-gray-400 text-sm">{user?.email ?? "—"}</p>
                    </div>

                    <div className="flex justify-around text-center mt-0">
                      <div>
                        <CheckCircle className="mx-auto h-5 w-5 text-teal-400" />
                        <p className="text-sm mt-1">{lessonsCompleted} Lessons</p>
                      </div>
                      <div>
                        <Award className="mx-auto h-5 w-5 text-teal-400" />
                        <p className="text-sm mt-1">{earnedCount} Badges</p>
                      </div>
                      <div>
                        <LockKeyholeOpen className="mx-auto h-5 w-5 text-teal-400" />
                        <p className="text-sm mt-1">{unlockedProjects} Projects</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Lesson Progress */}
                <div className="h-full">
                  <LessonProgressCard className="h-full" />
                </div>

                {/* Daily Quests */}
                <div className="h-full">
                  <DailyQuestsCard className="h-full" />
                </div>
              </div>

              {/* Full-width BadgeCard */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8"
              >
                {isLoading ? (
                  <Skeleton className="w-full h-36 rounded-2xl bg-slate-800/50" />
                ) : (
                  <BadgeCard  />
                )}
              </motion.div>
            </>
          )}
        </main>
      </div>
    </div>
    </ProtectedRoute>
  )
}
