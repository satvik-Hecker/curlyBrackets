import React from 'react'
import Link from 'next/link'
import { Bot, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { TextEffect } from '@/components/ui/text-effect'
import { AnimatedGroup } from '@/components/ui/animated-group'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring' as const,
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export default function HeroSection() {
    return (
      <>
       
        <main className="overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block "
          >
            <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
            <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
            <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
          </div>
          <section>
            <div className="relative min-h-screen pt-24 md:pt-36">
              <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,#0f0f0f_75%)]"></div>
              <div className="mx-auto max-w-7xl px-6">
                <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                  <AnimatedGroup variants={transitionVariants}>
                    <div
                      className="bg-zinc-950  group mx-auto flex w-fit items-center gap-4 rounded-full border-teal-300 p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 ">
                      <span className="text-zinc-200 text-sm font-mono">
                        Your time to become a DevPaglu 🐛
                      </span>
                      <div className="bg-white  size-6 overflow-hidden rounded-full duration-500">
                        <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                          <span className="flex size-6">
                            <Bot className="m-auto size-4" />
                          </span>
                          <span className="flex size-6">
                            <Bot className="m-auto size-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </AnimatedGroup>

                  <TextEffect
                    preset="fade-in-blur"
                    speedSegment={0.3}
                    as="h1"
                    className="mt-8 text-balance text-6xl md:text-7xl lg:mt-12 xl:text-[5.25rem] font-mono font-semibold text-teal-200 [text-shadow:0_0_5px_black]"
                  >
                    {`Crafting Code, One {} at a time.`}
                  </TextEffect>
                  <TextEffect
                    per="line"
                    preset="fade-in-blur"
                    speedSegment={0.3}
                    delay={0.5}
                    as="p"
                    className="mx-auto mt-8 max-w-2xl text-center text-lg font-mono text-white"
                  >
                    Learn web development through curated video content, interactive challenges, and a gamified experience that makes learning fun and engaging.
                  </TextEffect>

                  <AnimatedGroup
                    variants={{
                      container: {
                        visible: {
                          transition: {
                            staggerChildren: 0.05,
                            delayChildren: 0.75,
                          },
                        },
                      },
                      ...transitionVariants,
                    }}
                    className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row font-mono text-black"
                    
                  >
                    <div
                      key={1}
                    >
                      <Button
                        asChild
                        size="lg"
                        className="rounded-xl px-5 mb-6 text-sm bg-white text-zinc-950 font-bold hover:bg-white hover:text-zinc-950"
                      >
                        <Link href="/roadmap">
                          <span className="text-nowrap">Start learning today!</span>
                        </Link>
                      </Button>
                    </div>
                    
                  </AnimatedGroup>
                </div>
              </div>
            <div className=" w-full rounded-2xl bg-transparent" />
            </div>
          </section>
        </main>
      </>
    );
}