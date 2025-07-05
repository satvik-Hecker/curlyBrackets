'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const topics = [
  { title: 'HTML & CSS', desc: 'Structure the web beautifully.', color: 'from-orange-500 to-yellow-400' },
  { title: 'JavaScript', desc: 'Make websites interactive.', color: 'from-yellow-400 to-amber-500' },
  { title: 'Git & GitHub', desc: 'Version control for teams.', color: 'from-pink-500 to-purple-600' },
  { title: 'React', desc: 'Build modular UIs.', color: 'from-sky-500 to-blue-600' },
  { title: 'Next.js', desc: 'Production-ready React.', color: 'from-gray-800 to-gray-600' },
  { title: 'Tailwind CSS', desc: 'Utility-first design system.', color: 'from-teal-400 to-cyan-500' },
]

export default function TopicsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(2)

  useEffect(() => {
    const container = containerRef.current
    const cards = container?.querySelectorAll('.carousel-card')
    const card = cards?.[active] as HTMLElement

    if (card && container) {
      const containerWidth = container.offsetWidth
      const cardWidth = card.offsetWidth
      const cardOffset = card.offsetLeft

      const scrollTo = cardOffset - (containerWidth / 2 - cardWidth / 2)
      container.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }, [active])

  const goPrev = () => setActive((prev) => Math.max(0, prev - 1))
  const goNext = () => setActive((prev) => Math.min(topics.length - 1, prev + 1))

  return (
    <section className="bg-black text-white px-4 md:px-12 py-16 min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">🎯 Choose a Topic</h2>

      <div className="relative">
        {/* Arrows (now visible on all screen sizes) */}
        <button
          onClick={goPrev}
          className="flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-zinc-900/70 hover:bg-zinc-700 transition p-3 rounded-full"
        >
          ←
        </button>
        <button
          onClick={goNext}
          className="flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-zinc-900/70 hover:bg-zinc-700 transition p-3 rounded-full"
        >
          →
        </button>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth px-2 md:px-4 no-scrollbar"
        >
          {topics.map((topic, i) => {
            const isActive = i === active
            const scale = isActive ? 1 : 0.9
            const blur = isActive ? 'blur-0' : 'blur-sm opacity-60'
            const rotate = isActive ? 'rotate-0' : i < active ? '-rotate-y-6' : 'rotate-y-6'

            return (
              <motion.div
                key={i}
                onClick={() => setActive(i)}
                whileTap={{ scale: 0.97 }}
                className={`carousel-card flex-shrink-0 rounded-3xl cursor-pointer bg-gradient-to-br ${topic.color} p-6 sm:p-8 md:p-12 shadow-2xl backdrop-blur-md transition-all duration-300
                  transform ${blur} ${rotate}`}
                style={{
                  scale,
                  width: '80vw',
                  maxWidth: '500px',
                  height: '60vh',
                  minHeight: '400px',
                }}
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{topic.title}</h3>
                    <p className="text-sm sm:text-base md:text-lg text-white/90">{topic.desc}</p>
                  </div>
                  <button className="mt-8 self-start bg-black/30 backdrop-blur px-4 py-2 rounded-xl border border-white/10 text-white hover:bg-white/10 transition">
                    Start Learning →
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Hide Scrollbar */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
