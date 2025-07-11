'use client'

import { topics } from "@/data/topics"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Clock, BookOpen } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"

const getDifficultyColor = (difficulty : string) => {
  switch (difficulty){
    case "Beginner":
      return "bg-teal-100 text-teal-800 shadow-sm"
    case "Intermediate":
      return "bg-cyan-100 text-cyan-800 shadow-sm"
    case "Advanced":
      return "bg-slate-100 text-slate-800 shadow-sm"
    default:
      return "bg-gray-100 text-gray-800 shadow-sm"
  }
}

export default function RoadmapPage() {
  const [currIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

useEffect(()=>{
  const updateCardsPerView = ()=>{
    const width=window.innerWidth;
    if(width < 768) setCardsPerView(1);
    else if (width < 1024) setCardsPerView(2);
    else setCardsPerView(3);
  };
  updateCardsPerView();
  window.addEventListener("resize",updateCardsPerView);
  return ()=> window.removeEventListener("resize",updateCardsPerView);
},[])


  const maxIndex = Math.max(0,topics.length - cardsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev+1, maxIndex))
  }
  const prevSlide = () => {
    setCurrentIndex((prev)=> Math.max(prev-1, 0))
  }

  const visibleTopics = topics.slice(currIndex, currIndex + cardsPerView)

  return (

    <div className="min-h-screen w-full relative bg-black font-mono">
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 0%, rgba(94, 234, 212, 0.3), transparent 75%), #000000",
          }}
        />
        <div className="h-10"></div>

        {/* Main */}
        <div className="flex flex-col items-center px-6 md:px-8 mt-12 md:mt-20">
          <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}>
            <h1 className="text-xl  md:text-3xl lg:text-4xl  text-white leading-tight drop-shadow-2xl">Learn Development now,
              <br />
              <span className="text-teal-300 glow">Flex on LinkedIn Later</span>
            </h1>
          </motion.div>
          {/* Topics cards */}

          <div className="relative max-w-6xl w-full">
              {currIndex > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-teal-500/20 backdrop-blur-sm hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 rounded-full w-12 h-12 shadow-lg hover:shadow-teal-500/25 transition-all duration-300"
                onClick={prevSlide}
              >
                <ChevronLeft className="w-6 h-6 text-white glow" />
              </Button>
            )}

              {currIndex < maxIndex && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-teal-500/20 backdrop-blur-sm hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 rounded-full w-12 h-12 shadow-lg hover:shadow-teal-500/25 transition-all duration-300"
                onClick={nextSlide}
              >
                <ChevronRight className="w-6 h-6 text-white " />
              </Button>
            )}

            <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden p-5"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              {visibleTopics.map((topic, index) => (
                <motion.div
                  key={`${topic.srn}-${currIndex}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  // transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="group h-full"
                >
                  <Link href={`/learn/${topic.srn}`}>
                    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-500 overflow-hidden cursor-pointer h-full flex flex-col ">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="space-y-4 flex-1 flex flex-col">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-between mb-3">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(topic.difficulty)}`}
                              >
                                {topic.difficulty}
                              </span>
                              <div className="flex items-center text-gray-500 text-xs font-medium">
                                <Clock className="w-3 h-3 mr-1" />
                                {topic.duration}
                              </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{topic.title}</h3>
                            <p className="text-gray-600 text-sm mb-3 leading-relaxed">{topic.desc}</p>
                            <div className="flex flex-wrap gap-1 mb-4">
                              {topic.tags.slice(0, 3).map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-md font-medium shadow-sm"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex-1 flex items-center justify-center">
                            <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-100 ring-4 ring-teal-200/50 shadow-xl">
                              <img
                                src={topic.image || "/placeholder.svg"}
                                alt={topic.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                              />
                            </div>
                          </div>

                          <div className="flex-shrink-0 mt-4">
                            <Button
                              variant="ghost"
                              className="w-full justify-start p-0 h-auto text-gray-900 hover:bg-transparent group-hover:text-teal-600 transition-colors font-medium"
                            >
                              <BookOpen className="w-4 h-4 mr-2" />
                              <span className="font-bold">Start Learning</span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
 ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Carousel Indicators */}
        <motion.div
          className="flex items-center space-x-2 mt-12 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-300 shadow-sm ${
                index === currIndex ? "bg-teal-300 w-8 shadow-teal-300/50" : "bg-white/40 w-2 hover:bg-white/60"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .glow {
          text-shadow: 0 0 20px rgba(45, 212, 191, 0.5);
        }
      `}</style>
    </div>
  )
}
