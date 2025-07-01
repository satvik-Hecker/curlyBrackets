"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {motion} from "framer-motion";
import { supabase } from "@/lib/supabaseClient"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleReset = async () => {
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password", // update to your domain when deployed
    })
    setLoading(false)

    if (error) {
      toast.error("Reset failed", { description: error.message })
    } else {
      toast.success("Password reset email sent!", {
        description: "Check your inbox.",
      })
    }
  }

  return (
    <div className="min-h-svh w-full items-center justify-center p-6 md:p-10 bg-black font-mono">
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}>
    <div className="max-w-md mx-auto mt-20 bg-zinc-900 p-6 rounded-xl border  border-zinc-700">

      <h2 className="text-white text-2xl mb-4 font-semibold">Forgot Password</h2>
      <Label className="text-zinc-300 py-3" htmlFor="email">Your Email</Label>
      <Input
        id="email"
        className="mt-1 mb-4 py-2 text-zinc-300"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />
      <Button onClick={handleReset} disabled={loading} className="w-full bg-teal-500 text-zinc-950 hover:bg-teal-400">
        {loading ? "Sending..." : "Send reset link"}
      </Button>
    </div>
    </motion.div>
    </div>
  )
}
