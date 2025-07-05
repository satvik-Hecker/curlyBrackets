"use client"
import React from "react"
import { Button } from "../ui/button"
import { Menu, Github, X } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { userAgent } from "next/server"

const menuItems = [
  {name:"Home", href:"/"},
  {name:"Features", href:"#features"},
  {name:"FAQ", href:'#faq'},
  {name:"Contact", href:'#contact'},
]


export default function Navbar() {
   const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const router=useRouter();

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleMenuClick = (href: string) => {
        setMenuState(false)
        // Smooth scroll to section
        if (href.startsWith('#')) {
            const element = document.querySelector(href)
            if (element) {
                element.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                })
            }
        }else{
          router.push(href)
        }
    }

  return (
    <nav 
      data-state={menuState && 'active'}
      className="w-full px-2 fixed z-20">
      <div className={cn("mx-auto mt-2 max-w-6xl px-6 border-teal-700 rounded-xl transition-all duration-300 lg:px-12",isScrolled && 'bg-teal-300/20 max-w-4xl rounded-2xl  border border-teal-700 backdrop-blur-lg lg: px-5')}>
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                  <div className="flex w-full justify-between lg:w-auto">

                    {/* LOGO */}
                    <Link href="/" aria-label="home" className="flex items-center space-x-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8  bg-gradient-to-br from-teal-300 to-teal-700 rounded-lg flex items-center justify-center drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                          
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-braces-icon lucide-braces"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/></svg>
                          
                        </div>
                        <span className="text-white font-bold font-mono text-xl">curly<span className="text-teal-300">Brackets</span></span>
                      </div>
                    </Link>

                    {/* Mobile Nav */}
                    <button
                    onClick={()=>setMenuState(!menuState)}
                    aria-label={menuState==true ? 'Close Menu' : 'Open Menu'}
                    className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                      <Menu className=" text-white in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200"></Menu>
                      <X className="text-white in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                    </button>

                  </div>


                  <div className="absolute inset-0 m-auto hidden size-fit lg:block font-mono">
                    <ul className="flex gap-8 text-sm">
                      {menuItems.map((item,index)=>(
                        <li key={index}>
                          <Link href={item.href} 
                            onClick={()=>handleMenuClick(item.href)}
                            className="text-white hover:text-zinc-300 block duration-150 cursor-pointer">
                              <span>{item.name}</span>
                            </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-zinc-950 in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border-zinc-800 border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                    <div className="lg:hidden">
                      <ul className="space-y-6 text-base font-mono">
                        {menuItems.map((item, index) => (
                          <li key={index}>
                            <Link href={item.href}
                              onClick={() => handleMenuClick(item.href)}
                              className="text-white hover:text-zinc-400 block duration-150 cursor-pointer">
                              <span>{item.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                     <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit font-mono">
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className={cn("bg-transparent text-white border hover:bg-transparent hover:text-white",
                                    isScrolled ? 'lg:hidden' : "")}>
                                    <Link href="/auth/login">
                                        <span>Login</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn("bg-teal-400 text-teal-950  hover:bg-teal-300",
                                    isScrolled ? 'lg:hidden' : "")}>
                                    <Link href="/auth/signup">
                                        <span>Sign Up</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn("bg-white text-teal-950 font-bold hover:bg-zinc-300 hover:text-teal-950 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]",isScrolled ? 'lg:inline-flex' : 'hidden')}>
                                    <Link href="/auth/signup">
                                        <span>Get Started</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
            </div>
      </div>
    </nav>
  )
}
