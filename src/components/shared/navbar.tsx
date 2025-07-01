"use client"

import { Button } from "../ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import { Menu, Github } from "lucide-react"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 md:px-12 py-4 bg-black border-b border-zinc-800">
      {/* LOGO */}
      <div className="flex items-center gap-3">
        <Link href="/" className="text-2xl font-mono font-semibold text-white">
          curly<span className="text-2xl font-mono font-semibold text-teal-400">Brackets</span>
        </Link>
      </div>

      {/* Right : Desktop nav */}
      <div className="hidden md:flex items-center gap-4">
        <Link
          href="https://github.com/satvik-Hecker/curlyBrackets"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="link" size="icon" className="text-white hover:text-zinc-400">
            <Github className="h-5 w-5" />
                <span className="sr-only">GitHub Repo</span>
            </Button>
          
        </Link>
        <Link href="/login">
          <Button variant="outline" size="sm" className="bg-black text-white font-semibold font-mono border-zinc-400 rounded-sm">
            Login
          </Button>
        </Link>
        <Link href="/signup">
          <Button size="sm" className="bg-teal-500 text-zinc-900 hover:bg-teal-400  font-mono">
            Get Started
          </Button>
        </Link>
      </div>

      {/* Right : Mob nav */}
<div className="md:hidden">
  <Sheet>
    <SheetTrigger asChild>
      <Button size="icon" variant="ghost">
        <Menu className="h-6 w-6 text-white" />
      </Button>
    </SheetTrigger>
    <SheetContent
      side="right"
      className="bg-black border-l border-zinc-800 text-zinc-200 px-5 py-3 w-64 "
    >
      <SheetHeader className="px-0 py-3 border-b border-zinc-600">
        <SheetTitle className="text-lg text-zinc-200 font-mono font-semibold ">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex flex-col gap-4 text-sm font-mono">
        <a
          href="https://github.com/satvik-Hecker/curlyBrackets"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>

        <Link href="/login" className=" ">
          Login
        </Link>

        <Link href="/signup" className="">
          Get Started
        </Link>
      </div>
    </SheetContent>
  </Sheet>
</div>

    </nav>
  )
}
