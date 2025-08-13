'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Clock, Lock } from "lucide-react"
import { motion, AnimatePresence } from 'framer-motion'
import DarkVeil from '@/components/ui/DarkVeil'
import { projects, Project } from '@/data/projectData'
import { fetchUserEarnedBadges } from '@/services/badgeServices'
import { Badge as BadgeType } from '@/data/badgesData'





function ProjectCard({ project, earnedBadges }: { project: Project; earnedBadges: BadgeType[] }) {
  const [isFlipped, setIsFlipped] = useState(false)

  // Check if project should be unlocked based on earned badges
  const isUnlocked = () => {
    if (!project.requiredBadges || project.requiredBadges.length === 0) {
      return true; // No requirements means unlocked
    }
    
    const earnedBadgeNames = earnedBadges.map(badge => badge.name);
    return project.requiredBadges.every(requiredBadge => 
      earnedBadgeNames.includes(requiredBadge)
    );
  };

  const projectStatus = isUnlocked() ? "unlocked" : "locked";

    return (
    <div
      className="relative h-80 sm:h-96 lg:h-120 w-full max-w-xs sm:max-w-sm mx-auto"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => projectStatus === "locked" && setIsFlipped(true)}
      onMouseLeave={() => projectStatus === "locked" && setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        whileHover={projectStatus === "unlocked" ? { y: -8 } : {}}
      >
        {/* Front of card */}
        <Card className="absolute inset-0 w-full  h-full overflow-hidden  bg-white/10 backdrop-blur-sm border border-teal-500/20 shadow-xl shadow-teal-500/10" style={{ backfaceVisibility: "hidden" }}>
          <CardContent className="p-0 h-full relative ">
            {/* Full height image covering entire card */}
            <div className="absolute inset-0 ">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.name}
                className="w-full h-full object-cover"
              />
              
              {/* Seamless blurred overlay for text area - only on image */}
              <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/95 via-black/70 via-black/40 to-transparent backdrop-blur-xs"></div>
              
              {/* Subtle dark overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              
              {/* Status Badge - Top Right */}
              <div className="absolute top-2 right-2">
                {projectStatus === "locked" ? (
                  <Badge variant="secondary" className="bg-red-500/90 text-white border-red-400 backdrop-blur-sm text-xs">
                    <Lock className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                    Locked
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-teal-500/90 text-white border-teal-400 backdrop-blur-sm text-xs">
                    Unlocked
                  </Badge>
                )}
              </div>
              
              {/* Content overlay */}
              <div className="absolute bottom-3 left-3 right-3">
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white drop-shadow-lg mb-2">{project.name}</h3>
                
                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-200 mb-3 sm:mb-4 leading-relaxed line-clamp-2">{project.description}</p>
                
                {/* Bottom section - Duration on left, Button on right */}
                <div className="flex items-center justify-between">
                  {/* Duration on left */}
                  <div className="flex items-center text-teal-300">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm font-medium">{project.duration}</span>
                  </div>
                  
                  {/* Button on right */}
                  {projectStatus === "unlocked" && project.link && (
                    <Link target='_blank' href={project.link}>
                      <Button className="bg-teal-600 hover:bg-teal-700 text-white border-teal-500/50 shadow-lg shadow-teal-500/25 px-1.5 sm:px-2 py-0.5 text-xs">
                        Let's dive in
                      </Button>
                    </Link>
                  )}
                  
                  {projectStatus === "locked" && (
                    <Button className="bg-gray-600 hover:bg-gray-700 text-white border-gray-500/50 shadow-lg px-1.5 sm:px-2 py-0.5 text-xs">
                      Hover for info
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back of card (for locked projects) */}
        {projectStatus === "locked" && (
          <Card
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-900/90 to-teal-800/90 backdrop-blur-sm border border-teal-500/30 shadow-xl shadow-teal-500/20"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <CardContent className="p-6 h-full flex flex-col justify-center items-center text-center">
              <Lock className="w-12 h-12 text-teal-300 mb-4" />
              <h3 className="text-lg font-semibold mb-4 text-white">Required Badges</h3>
              <div className="space-y-2 mb-6">
                {project.requiredBadges?.map((badge, index) => (
                  <Badge key={badge} variant="outline" className="text-sm py-1 px-3 bg-teal-600/20 text-teal-200 border-teal-400/50">
                    {badge}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-teal-200/80">Complete the required projects to unlock this course</p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  )
}

export default function ProjectPage({project}: {project: Project}){
    const [isFlipped, setisFlipped] = useState(false);
    const [earnedBadges, setEarnedBadges] = useState<BadgeType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
      const fetchBadges = async () => {
        try {
          const { data: { user }, error: userError } = await supabase.auth.getUser();
          if (userError || !user) {
            console.error('Error getting user:', userError);
            setIsLoading(false);
            return;
          }
          
          const badges = await fetchUserEarnedBadges(user.id);
          setEarnedBadges(badges);
        } catch (error) {
          console.error('Error fetching badges:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchBadges();
    }, []);

    return (
       <div className="relative w-full min-h-screen">
  
  <div className="absolute top-0 left-0 w-full h-full">
    <DarkVeil />
  </div>

  <div className="h-14"></div>
  <div className="relative z-10">
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8 sm:mb-12 font-mono">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
          The Dev Hub
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto px-4">
          Your quest to mastery begins. Earn badges, unlock projects, and conquer the stack one challenge at a time.
        </p>
      </div>

            <div className="px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 justify-items-center font-mono">
        
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="relative h-80 sm:h-96 lg:h-120 w-full max-w-xs sm:max-w-sm mx-auto">
              <Card className="w-full h-full overflow-hidden">
                <CardContent className="p-0 h-full flex flex-col">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <Skeleton className="h-6 w-3/4 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3 mb-4" />
                      <Skeleton className="h-4 w-1/2 mb-4" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>
          ))
        ) : (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} earnedBadges={earnedBadges} />
          ))
        )}
      </div>
    </div>
  </div>
</div>


    )
}