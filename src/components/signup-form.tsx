"use client"

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

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-zinc-900 border-zinc-800 rounded-1">
        <CardHeader>
          <CardTitle className="text-white text-2xl font-semibold">Join the platform</CardTitle>
          <CardDescription className="text-zinc-400">
            where curiosity meets growth
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              {/* Name */}
              <div className="grid gap-3">
                <Label className="text-zinc-300" htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  required
                />
              </div>

              {/* Email */}
              <div className="grid gap-3">
                <Label className="text-zinc-300" htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>

              {/* Password */}
              <div className="grid gap-3">
                <Label className="text-zinc-300" htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>

              {/* Submit */}
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full bg-teal-500 text-zinc-950 hover:bg-teal-400">
                  Sign Up
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

                {/* Google Button */}
                <Button variant="default" className="w-full bg-zinc-700 border border-zinc-900 hover:bg-zinc-500">
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
                  Sign up with Google
                </Button>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="mt-4 text-center text-sm text-zinc-300">
              Already have an account?{" "}
              <a href="/login" className="underline underline-offset-4 text-zinc-300">
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
