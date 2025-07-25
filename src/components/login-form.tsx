"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { supabase } from "@/lib/supabaseClient"


export function LoginForm({
  className,
  
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleEmailLogin(e: React.FormEvent){
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      toast.error("Missing email or password")
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (error) {
      toast.error("Login failed", { description: error.message })
    } else {
      toast.success("Login successful")
      setTimeout(() => router.replace("/dashboard"), 1200)

    }
  }

  async function handleGoogleLogin() {
    console.log("🔄 LoginForm: Google login initiated")
    const { data, error } = await supabase.auth.signInWithOAuth({ 
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })

    console.log("🔄 LoginForm: Google OAuth response:", { data, error })

    if (error) {
      console.error("🔄 LoginForm: Google login error:", error)
      toast.error("Google login failed", { description: error.message })
    } else {
      console.log("🔄 LoginForm: Google login successful, redirecting...")
      toast.success("Redirecting to Google...")
    }
  }
  return (
    <div 
      
    className={cn("flex flex-col gap-6  mt-12 md:mt-20", className)} {...props}>
      <Card className="bg-zinc-900 border-zinc-800 rounded-1 ">
        <CardHeader>
          <CardTitle className="text-white text-2xl font-semibold">Welcome back</CardTitle>
          <CardDescription className="text-zinc-400">
            Grow and build - one lesson at a time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label className="text-zinc-300" htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="text-zinc-300"
                />
              </div>
              
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label className="text-zinc-300" htmlFor="password">Password</Label>
                    <a
                      href="/auth/forgot-password"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-zinc-300"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="pr-10 text-zinc-300"
                      
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-2 top-2.5 text-zinc-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">Toggle password visibility</span>
                    </button>
                  </div>
                </div>
              
              <div className="flex flex-col gap-3">
                <Button type="submit" disabled={loading} className="w-full bg-teal-500 text-zinc-950 font- hover:bg-teal-400">
                   {loading ? "Logging in..." : "Login"}
                </Button>
                {/* Divider */}
                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-zinc-700" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-zinc-900 px-2 text-zinc-400">or continue with</span>
                  </div>
                </div>
                
                <Button type="button" onClick={handleGoogleLogin} variant="default" className="w-full bg-zinc-700 border-zinc-900 border hover:bg-zinc-500" >
                  <svg
                    className="mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 533.5 544.3"
                  >
                    <path
                      fill="#ffffff"
                      d="M533.5 278.4c0-17.7-1.6-34.7-4.6-51.2H272v96.8h146.9c-6.3 34.6-25 63.9-53.5 83.5v69.3h86.4c50.6-46.6 81.7-115.4 81.7-198.4z"
                    />
                    <path
                      fill="#ffffff"
                      d="M272 544.3c72.6 0 133.6-24.2 178.1-65.8l-86.4-69.3c-23.9 16.1-54.5 25.7-91.7 25.7-70.5 0-130.3-47.6-151.6-111.4H30.9v69.8c44.4 88.2 135.3 151 241.1 151z"
                    />
                    <path
                      fill="#ffffff"
                      d="M120.4 323.5c-10.2-30.6-10.2-63.6 0-94.2V159.5H30.9c-38.2 76.3-38.2 166.4 0 242.7l89.5-70.7z"
                    />
                    <path
                      fill="#ffffff"
                      d="M272 107.7c39.5-.6 77.2 13.7 106.4 40.5l79.6-79.6C411.2 24.2 350.1 0 272 0 166.2 0 75.3 62.8 30.9 151l89.5 69.8C141.7 155.3 201.5 107.7 272 107.7z"
                    />
                  </svg>


                  Login with Google
                </Button>
               
                </div>
              </div>
            
            <div className="mt-4 text-center text-sm text-zinc-300">
              Don&apos;t have an account?{" "}
              <a href="/auth/signup" className="underline text-zinc-300 underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
