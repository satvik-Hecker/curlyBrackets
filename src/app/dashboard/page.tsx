"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Badge as UiBadge } from "@/components/ui/badge"
import { Mail, Calendar, Edit3, User, Shield, Clock, Hash } from "lucide-react"
import Beams from "@/components/ui/Beam"
import { motion } from "framer-motion"

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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: auth, error: authError } = await supabase.auth.getUser()
      if (authError || !auth?.user) {
        setUser(null)
        setLoading(false)
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
      setLoading(false)
    }

    fetchUser()
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
      <div className="h-18"></div>

      <div className="relative z-10 p-6">
        <div className="h-10 md:h-12" />
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
          {loading ? (
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
              <Card className="backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 ring-2 ring-white/50">
                      <AvatarImage src={user?.avatar_url ?? undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-slate-700 to-slate-900 text-white">
                        {user?.name?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="truncate text-lg font-semibold text-slate-900">
                          {user?.name || "Learner"}
                        </h2>
                        <UiBadge variant="secondary" className="border border-emerald-200 bg-emerald-100 text-emerald-800">
                          <Shield className="mr-1 h-3 w-3" />
                          Member
                        </UiBadge>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                        <Mail className="h-4 w-4" />
                        <span className="truncate">{user?.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Joined{" "}
                        {user?.created_at
                          ? new Date(user.created_at).toLocaleDateString()
                          : "—"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Clock className="h-4 w-4" />
                      <span>
                        Last login{" "}
                        {user?.last_login
                          ? new Date(user.last_login).toLocaleString()
                          : "—"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Hash className="h-4 w-4" />
                      <span className="truncate">User ID: {user?.id}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Button className="gap-2">
                      <Edit3 className="h-4 w-4" />
                      Edit Profile
                    </Button>
                    <Button variant="secondary" className="gap-2">
                      <User className="h-4 w-4" />
                      View Public
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-slate-900">Your Stats</h3>
                    <UiBadge variant="outline" className="border-slate-300">
                      Weekly Focus
                    </UiBadge>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl border bg-white p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-wide text-slate-500">Lessons Completed</p>
                      <p className="mt-2 text-2xl font-bold text-slate-900">—</p>
                    </div>
                    <div className="rounded-2xl border bg-white p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-wide text-slate-500">Badges Earned</p>
                      <p className="mt-2 text-2xl font-bold text-slate-900">—</p>
                    </div>
                    <div className="rounded-2xl border bg-white p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-wide text-slate-500">Projects Unlocked</p>
                      <p className="mt-2 text-2xl font-bold text-slate-900">—</p>
                    </div>
                    <div className="rounded-2xl border bg-white p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-wide text-slate-500">Streak</p>
                      <p className="mt-2 text-2xl font-bold text-slate-900">—</p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="mb-3 text-lg font-semibold text-slate-900">Quick Actions</h4>
                    <div className="flex flex-wrap gap-3">
                      <Button>Continue Learning</Button>
                      <Button variant="secondary">View Badges</Button>
                      <Button variant="outline">Browse Projects</Button>
                    </div>
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
