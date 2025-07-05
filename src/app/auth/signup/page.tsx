"use client"
import { SignupForm } from "@/components/signup-form"
import {motion} from "framer-motion";

export default function Page() {
  return (
    
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-black font-mono ">
      <div className="w-full max-w-sm">
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
        <SignupForm />
        </motion.div>
      </div>
    </div>
    
  )
}
