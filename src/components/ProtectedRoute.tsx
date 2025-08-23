"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { Loader2 } from "lucide-react"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    let ignore = false

    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!ignore) {
        if (session) {
          setAuthenticated(true)
        } else {
          router.replace("/auth/login")
        }
        setLoading(false)
      }
    }

    init()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace("/auth/login")
      } else {
        setAuthenticated(true)
      }
    })

    return () => {
      ignore = true
      subscription.unsubscribe()
    }
  }, [router])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin w-6 h-6 text-white" />
      </div>
    )
  }

  return authenticated ? <>{children}</> : null
}
