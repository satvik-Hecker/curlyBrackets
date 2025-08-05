'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Mail, Calendar, Edit3, Save, X, User, Shield, Clock, Hash } from "lucide-react"
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

export default function ProjectPage({project}: {project: Project}){
    const [isFlipped, setisFlipped] = useState(false);

    return (
        <div style={{ width: '100%', height: '600px', position: 'relative' }}>
        <DarkVeil />
        </div>


    )
}