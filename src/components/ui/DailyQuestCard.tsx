"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react"
import { dailyQuests } from "@/data/dailyQuests"

interface Quest {
  id: number
  title: string
  description: string
}

interface Task extends Quest {
  completed: boolean
}

export default function DailyQuestsCard({ className }: { className?: string }) {
  const [tasks, setTasks] = useState<Task[]>([])

  // Pick 3-4 random quests on mount
  useEffect(() => {
    const shuffled = [...dailyQuests].sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, 4).map((q) => ({ ...q, completed: false }))
    setTasks(selected)
  }, [])

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const completedCount = tasks.filter((task) => task.completed).length

  return (
    <Card
      className={`w-full max-w-lg bg-black/40 border border-white/20 font-mono flex flex-col h-full ${className}`}
    >
      <CardHeader>
        <CardTitle className="font-mono text-xl flex items-center justify-between">
          <span className="text-gray-200">Daily Quests</span>
          <span className="text-sm text-gray-400 font-normal">
            {completedCount}/{tasks.length}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-start space-x-3 group">
            <Checkbox
              id={`quest-${task.id}`}
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
              className="mt-1 h-5 w-5 border-2 border-gray-100/60 
                data-[state=checked]:bg-primary data-[state=checked]:border-gray-100/60  
                data-[state=checked]:text-primary-foreground hover:border-gray-100/60  transition-colors"
            />
            <div className="flex-1 space-y-1">
              <label
                htmlFor={`quest-${task.id}`}
                className={`font-mono text-sm font-medium cursor-pointer ${
                  task.completed ? "line-through text-gray-300/90" : "text-gray-300 group-hover:text-gray-300/80"
                }`}
              >
                {task.title}
              </label>
              <p
                className={`text-sm leading-relaxed ${
                  task.completed ? "text-gray-400" : "text-gray-400/80"
                } line-clamp-2`}
              >
                {task.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
 