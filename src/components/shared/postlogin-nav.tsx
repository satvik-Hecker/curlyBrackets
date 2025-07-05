"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

const menuItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Roadmap", href: "/roadmap" },
  { name: "Badges", href: "/badges" },
]

export default function PostLoginNavbar() {
  const [menuState, setMenuState] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMenuClick = (href: string) => {
    setMenuState(false)
    if (href.startsWith("#")) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    } else {
      router.push(href)
    }
  }

  return (
    <nav
      data-state={menuState && "active"}
      className="fixed z-20 w-full px-2"
    >
      <div
        className={cn(
          "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 border-teal-700 rounded-xl lg:px-12",
          isScrolled &&
            "bg-teal-300/20 max-w-4xl border rounded-2xl backdrop-blur-lg lg:px-5"
        )}
      >
        <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
          {/* Logo + Avatar + Hamburger */}
          <div className="flex w-full items-center justify-between lg:w-auto">
            {/* Logo */}
            <Link
              href="/"
              aria-label="home"
              className="flex items-center space-x-2"
            >
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-300 to-teal-700 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-braces"
                  >
                    <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" />
                    <path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />
                  </svg>
                </div>
                <span className="text-xl font-mono font-bold text-white">
                  curly<span className="text-teal-300">Brackets</span>
                </span>
              </div>
            </Link>

            {/* Avatar + Mobile Menu Icon */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Avatar Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="ring-1 ring-teal-500 transition drop-shadow-[0_0_10px_rgba(45,212,191,0.4)] hover:ring-teal-300 cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="bg-zinc-800 text-white">
                      U
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 rounded-xl font-mono border border-zinc-700 bg-zinc-900 text-white shadow-lg shadow-zinc-900 p-3"
                  sideOffset={8}
                  align="end"
                >
                  <DropdownMenuItem
                    asChild
                    className="hover:!bg-zinc-800 hover:!text-white px-3 py-2 rounded-md cursor-pointer"
                  >
                    <Link href="#">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-zinc-700" />
                  <DropdownMenuItem
                    onClick={async () => {
                      await supabase.auth.signOut()
                      router.push("/")
                      toast.success("Logged out successfully")
                    }}
                    className="hover:!bg-zinc-800 px-3 py-2 rounded-md text-red-400 hover:!text-red-400 cursor-pointer"
                  >
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Hamburger Icon */}
              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 p-2.5"
              >
                <Menu className="size-6 text-white transition-all duration-200 in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0" />
                <X className="absolute inset-0 m-auto size-6 rotate-180 scale-0 opacity-0 text-white transition-all duration-200 in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100" />
              </button>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="absolute inset-0 m-auto hidden size-fit lg:block font-mono">
            <ul className="flex gap-8 text-sm">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    onClick={() => handleMenuClick(item.href)}
                    className="block cursor-pointer text-white duration-150 hover:text-zinc-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="ring-1 ring-teal-500 transition hover:ring-teal-300 cursor-pointer drop-shadow-[0_0_10px_rgba(45,212,191,0.4)]">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="bg-zinc-800 text-white">U</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 rounded-xl font-mono border border-zinc-700 bg-zinc-900 text-white shadow-lg shadow-zinc-900 p-3"
                  sideOffset={8}
                  align="end"
                >
                  <DropdownMenuItem
                    asChild
                    className="hover:!bg-zinc-800 hover:!text-white px-3 py-2 rounded-md cursor-pointer"
                  >
                    <Link href="#">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-zinc-700" />
                  <DropdownMenuItem
                    onClick={async () => {
                      await supabase.auth.signOut()
                      router.push("/")
                      toast.success("Logged out successfully")
                    }}
                    className="hover:!bg-zinc-800 px-3 py-2 rounded-md text-red-400 hover:!text-red-400 cursor-pointer"
                  >
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

          {/* Mobile Nav Menu */}
          <div className="bg-zinc-950 in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border-zinc-800 border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
            <div className="lg:hidden">
              <ul className="space-y-6 text-base font-mono">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      onClick={() => handleMenuClick(item.href)}
                      className="block cursor-pointer text-white duration-150 hover:text-zinc-400"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
