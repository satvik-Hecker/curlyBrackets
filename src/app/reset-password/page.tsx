"use client"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Restores session using access_token from email
    supabase.auth.getSession()
  }, [])

  const handleReset = async () => {
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long")
      return
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (error) {
      toast.error("Reset failed", { description: error.message })
    } else {
      toast.success("Password reset successful")
      router.push("/login")
    }
  }

  return (
    <div className="min-h-svh w-full items-center justify-center p-6 md:p-10 bg-black font-mono">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-md mx-auto mt-20 bg-zinc-900 p-6 rounded-xl border border-zinc-700">
          <h2 className="text-white text-2xl mb-4 font-semibold">Reset Password</h2>

          <Label className="text-zinc-300 py-3" htmlFor="password">New Password</Label>
          <Input
            id="password"
            className="mt-1 mb-4 py-2 text-zinc-300"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Label className="text-zinc-300 py-3" htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            className="mt-1 mb-4 py-2 text-zinc-300"
            type="password"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button onClick={handleReset} disabled={loading} className="w-full bg-teal-500 text-zinc-950 hover:bg-teal-400">
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
