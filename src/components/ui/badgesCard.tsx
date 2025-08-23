"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge as UiBadge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Badge } from "@/data/badgesData"
import { fetchUserEarnedBadges, fetchUserBadgeProgress } from "@/services/badgeServices"
import { supabase } from "@/lib/supabaseClient"
import Image from "next/image"
import { Lock } from "lucide-react"

export function BadgeCard() {
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([])
  const [badgeProgress, setBadgeProgress] = useState<
    { badge: Badge; completedCount: number; totalCount: number; progress: number }[]
  >([])
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null)

  useEffect(() => {
    const fetchBadges = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) {
        console.error("Error fetching session:", sessionError)
        return
      }

      const userId = session?.user.id
      if (!userId) return

      const earned = await fetchUserEarnedBadges(userId)
      const progress = await fetchUserBadgeProgress(userId)

      setEarnedBadges(earned)
      setBadgeProgress(progress)
    }

    fetchBadges()
  }, [])

  return (
    <Card className="p-6 md:p-8 bg-black/40 backdrop-blur-sm border-teal-500/30">
      <div className="flex items-center justify-between mb-1 md:mb-3">
        <h2 className="text-xl md:text-2xl font-bold text-teal-100 font-mono">Badge Collection</h2>
        <UiBadge variant="secondary" className="text-sm font-mono">
          {earnedBadges.length} / {badgeProgress.length} Badges
        </UiBadge>
      </div>

      {/* Horizontal scrollable badge container */}
      <div className="relative">
        <div className="flex gap-6 md:gap-8 overflow-x-auto pb-6 pt-8 px-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent ">
          {badgeProgress.map((b, index) => {
            const isEarned = b.progress === 1
            return (
              <div
                key={b.badge.id}
                className={cn(
                  "flex-shrink-0 relative group cursor-pointer transition-all duration-300",
                  "hover:scale-110 hover:-translate-y-3",
                  selectedBadge?.id === b.badge.id && "scale-110 -translate-y-3"
                )}
                onClick={() =>
                  setSelectedBadge(selectedBadge?.id === b.badge.id ? null : b.badge)
                }
                onMouseEnter={() => setHoveredBadge(b.badge.id)}
                onMouseLeave={() => setHoveredBadge(null)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Badge container */}
                <div
                  className={cn(
                    "relative rounded-xl p-5 transition-all duration-300",
                    "w-36 h-44 md:w-44 md:h-52",
                    "bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900",
                    "shadow-lg hover:shadow-2xl flex flex-col items-center justify-center",
                    isEarned && "ring-2 ring-primary ring-offset-2",
                    !isEarned && "opacity-70"
                  )}
                >
                  {/* Circular Badge Image */}
                  <div className="relative w-24 h-24 md:w-28 md:h-28 mb-3 flex items-center justify-center">
                    <div className="rounded-full overflow-hidden bg-white shadow-md flex items-center justify-center">
                      <Image
                        src={`/badges/${b.badge.image}`} 
                        alt={b.badge.name}
                        width={80}
                        height={80}
                        />
                    </div>

                    {/* Lock icon overlay if not earned */}
                    {!isEarned && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                        <Lock className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Badge name */}
                  <div className="text-center">
                    <h3
                      className={cn(
                        "text-foreground text-sm md:text-base font-semibold leading-tight line-clamp-2 px-1 font-mono"
                      )}
                    >
                      {b.badge.name}
                    </h3>
                  </div>

                  {/* Earned/Locked Status */}
                  <div className="absolute top-2 right-2 font-mono">
                    <UiBadge variant={isEarned ? "default" : "secondary"} className="text-[10px]">
                      {isEarned ? "Unlocked" : "Locked"}
                    </UiBadge>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Selected badge details */}
      {selectedBadge && (
        <div className="mt-6 md:mt-8 p-4 md:p-5 bg-muted/50 rounded-lg border animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start gap-4 md:gap-5">
            <div
              className={cn(
                "w-20 h-20 md:w-24 md:h-24 rounded-full p-3 flex items-center justify-center flex-shrink-0",
                "bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900"
              )}
            >
                <div className="rounded-full overflow-hidden bg-white shadow-md flex items-center justify-center">
              <Image
                src={`/badges/${selectedBadge.image}`}
                alt={selectedBadge.name}
                width={120}
                height={120}
                className="object-contain"
              />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-2 font-mono">
                {selectedBadge.name}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground font-mono">
                {selectedBadge.description}
              </p>
             
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
