'use client'
import React from 'react'
import { motion } from 'motion/react'
import { Route, Youtube, BookmarkCheck, Award, LockKeyholeOpen, BotMessageSquare } from 'lucide-react'

const features = [
  {
    icon: 'road',
    title: 'Structured Roadmap',
    description: 'No more guessing what to learn next. Follow a clear, step-by-step roadmap designed to take you from beginner to advanced — covering HTML, CSS, JavaScript, React, version control, and more.'
  },
  {
    icon: 'video',
    title: 'Curated Video Library',
    description: 'Generate complete articles, social posts, and marketing copy in seconds, not hours.'
  },
  {
    icon: 'bookmark',
    title: 'Track Your Progress',
    description: 'Mark lessons as watched or unwatched and always know where you left off. Your journey is saved — always.'
  },
  {
    icon: 'badge',
    title: 'Earn Badges',
    description: 'Stay motivated by earning badges for completing topics. Celebrate your achievements and show off your progress!'
  },
  {
    icon: 'lock',
    title: ' Unlock Projects',
    description: `Complete modules and earn badges to unlock real-world projects. Apply what you've learned and build a stunning portfolio.`
  },
  {
    icon: 'AI',
    title: '(Coming Soon) AI Study Buddy',
    description: 'Got a doubt while learning? Ask our upcoming AI assistant directly during the topic — instant help, no distractions.'
  }
]

const IconComponent = ({ type }: { type: string }) => {
  const iconProps = {
    className: "w-6 h-6",
    fill: "currentColor",
    viewBox: "0 0 24 24"
  }

  switch (type) {
    case 'road':
      return (
        <Route ></Route>
      )
    case 'video':
      return (
        <Youtube></Youtube>
      )
    case 'bookmark':
      return (
        <BookmarkCheck/>
      )
    case 'badge':
      return (
        <Award/>
      )
    case 'lock':
      return (
        <LockKeyholeOpen />
      )
    case 'AI':
      return (
        <BotMessageSquare/>
      )
    default:
      return (
        <></>
      )
  }
}

export default function FeaturesSection() {
  return (
    
    <section
    id='features'
    style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(94, 234, 212, 0.1), transparent 85%), #000000",
          }}
    className="relative z-10 py-20 px-6 bg-black/30 backdrop-blur-sm font-mono border-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            🎓 Why Curly Brackets Works
          </motion.h2>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-teal-900 rounded-lg flex items-center justify-center mb-4">
                <div className="text-teal-200">
                  <IconComponent type={feature.icon} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-white/70 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    
  )
}