'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Clock, Lock } from "lucide-react"
import { motion, AnimatePresence } from 'framer-motion'
import DarkVeil from '@/components/ui/DarkVeil'

interface Project {
    id: string
    name: string
    duration: string
    image: string
    status : "locked" | "unlocked"
    requiredBadges?: string[]
    link?: string
}

const projects: Project[] = [
  {
    id: "1",
    name: "React Fundamentals",
    duration: "2 weeks",
    image: "/placeholder.svg?height=200&width=300&text=React",
    status: "unlocked",
    link: "/projects/react-fundamentals",
  },
  {
    id: "2",
    name: "Advanced TypeScript",
    duration: "3 weeks",
    image: "/placeholder.svg?height=200&width=300&text=TypeScript",
    status: "locked",
    requiredBadges: ["JavaScript Master", "React Fundamentals", "ES6+ Expert"],
  },
  {
    id: "3",
    name: "Next.js Full Stack",
    duration: "4 weeks",
    image: "/placeholder.svg?height=200&width=300&text=Next.js",
    status: "unlocked",
    link: "/projects/nextjs-fullstack",
  },
  {
    id: "4",
    name: "Database Design",
    duration: "2.5 weeks",
    image: "/placeholder.svg?height=200&width=300&text=Database",
    status: "locked",
    requiredBadges: ["SQL Basics", "Data Modeling"],
  },
  {
    id: "5",
    name: "API Development",
    duration: "3 weeks",
    image: "/placeholder.svg?height=200&width=300&text=API",
    status: "unlocked",
    link: "/projects/api-development",
  },
  {
    id: "6",
    name: "DevOps & Deployment",
    duration: "4 weeks",
    image: "/placeholder.svg?height=200&width=300&text=DevOps",
    status: "locked",
    requiredBadges: ["Docker Basics", "CI/CD Fundamentals", "Cloud Computing"],
  },
  {
    id: "7",
    name: "Mobile Development",
    duration: "5 weeks",
    image: "/placeholder.svg?height=200&width=300&text=Mobile",
    status: "locked",
    requiredBadges: ["React Native", "Mobile UI/UX", "App Store Guidelines"],
  },
  {
    id: "8",
    name: "Machine Learning Basics",
    duration: "6 weeks",
    image: "/placeholder.svg?height=200&width=300&text=ML",
    status: "unlocked",
    link: "/projects/ml-basics",
  },
  {
    id: "9",
    name: "UI/UX Design Principles",
    duration: "3.5 weeks",
    image: "/placeholder.svg?height=200&width=300&text=UI/UX",
    status: "unlocked",
    link: "/projects/ui-ux-design",
  },
  {
    id: "10",
    name: "Advanced Security",
    duration: "4.5 weeks",
    image: "/placeholder.svg?height=200&width=300&text=Security",
    status: "locked",
    requiredBadges: ["Web Security Basics", "Authentication Systems", "Encryption Fundamentals"],
  },
]

function ProjectCard({ project }: { project: Project }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="relative h-80 w-full max-w-sm mx-auto"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => project.status === "locked" && setIsFlipped(true)}
      onMouseLeave={() => project.status === "locked" && setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        whileHover={project.status === "unlocked" ? { y: -8 } : {}}
      >
        {/* Front of card */}
        <Card className="absolute inset-0 w-full h-full overflow-hidden" style={{ backfaceVisibility: "hidden" }}>
          <CardContent className="p-0 h-full flex flex-col">
            <div className="relative h-48 overflow-hidden bg-gray-200">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                {project.status === "locked" ? (
                  <Badge variant="secondary" className="bg-red-100 text-red-700 border-red-200">
                    <Lock className="w-3 h-3 mr-1" />
                    Locked
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                    Unlocked
                  </Badge>
                )}
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{project.name}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">{project.duration}</span>
                </div>
              </div>

              {project.status === "unlocked" && project.link && (
                <Link href={project.link}>
                  <Button className="w-full group">
                    {"Let's dive in"}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              )}

              {project.status === "locked" && (
                <div className="text-center text-gray-500 text-sm">Hover to see requirements</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Back of card (for locked projects) */}
        {project.status === "locked" && (
          <Card
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-50 to-gray-100"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <CardContent className="p-6 h-full flex flex-col justify-center items-center text-center">
              <Lock className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Required Badges</h3>
              <div className="space-y-2 mb-6">
                {project.requiredBadges?.map((badge, index) => (
                  <Badge key={badge} variant="outline" className="text-sm py-1 px-3">
                    {badge}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-gray-600">Complete the required projects to unlock this course</p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  )
}

export default function ProjectPage({project}: {project: Project}){
    const [isFlipped, setisFlipped] = useState(false);

    return (
       <div className="relative w-full min-h-screen">
  
  <div className="absolute top-0 left-0 w-full h-full">
    <DarkVeil />
  </div>

  <div className="h-14"></div>
  <div className="relative z-10">
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12 font-mono">
        <h1 className="text-4xl font-bold text-white mb-4">
          The Dev Hub
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Your quest to mastery begins. Earn badges, unlock projects, and conquer the stack one challenge at a time.
        </p>
      </div>

      <div className="px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center font-mono">
        
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  </div>
</div>


    )
}