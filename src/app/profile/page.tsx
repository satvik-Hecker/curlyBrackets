'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (!error) setUser(user)
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

  const joinedDate = user.user_metadata?.created_at
    ? new Date(user.user_metadata.created_at)
    : null

  return (
    <div className="min-h-screen bg-black text-white font-mono py-20 px-6">
      <div className="max-w-xl mx-auto space-y-6">
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

        {/* Future: Display earned badges or progress summary here */}
        <Card className="bg-zinc-900 border border-zinc-800 shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-teal-200 mb-2">Your Badges</h3>
            <p className="text-sm text-muted-foreground">Coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
