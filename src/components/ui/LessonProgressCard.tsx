"use client";


import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { topics } from "@/data/topics";
import { subtopics } from "@/data/subtopics";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowRight, Check, MoreHorizontal } from "lucide-react";
import Link from "next/link";

// ---- Types ----
interface Lesson {
  id: number;
  name: string;
  image: string;
  isCompleted: boolean;
  completed: number;
  total: number;
}

// ---- Progress Circle ----
const CircularProgress = ({
  progress,
  size = 64,
}: {
  progress: number;
  size?: number;
}) => {
  const radius = (size - 6) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          className="text-gray-200"
        />
        {/* progress ring - uniform color */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="text-teal-400 transition-all duration-300 ease-in-out"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

// ---- Lesson Item ----
const LessonItem = ({ lesson }: { lesson: Lesson }) => {
  const percent =
    lesson.total > 0 ? Math.round((lesson.completed / lesson.total) * 100) : 0;

  return (
    <TooltipProvider >
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center space-y-2 cursor-pointer">
            <div className="relative">
              {/* Progress ring */}
              <CircularProgress progress={percent} size={64} />

              {/* Inner image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full overflow-hidden border border-border transition",
                    lesson.isCompleted && "opacity-70"
                  )}
                >
                  <img
                    src={lesson.image || "/placeholder.svg"}
                    alt={lesson.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Small checkmark top-right if completed */}
              {lesson.isCompleted && (
                <div className="absolute -top-1 -right-1 bg-black rounded-full p-0.5 shadow">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            {/* Title only */}
            <div className="text-center max-w-20">
              <p className="text-[11px] text-white/90 font-medium leading-tight line-clamp-3 break-words">
                {lesson.name}
              </p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-mono">{percent}% completed</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// ---- Main Component ----
export function LessonProgressCard({ className, isLoading= false, }: { className?: string, isLoading?: boolean }) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const fetchProgress = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("lesson_progress")
        .select("topic_srn, subtopic_id")
        .eq("user_id", user.id)
        .eq("is_completed", true);

      if (error) {
        console.error("Failed to fetch progress:", error);
        return;
      }

      const lessonsData: Lesson[] = topics.map((topic) => {
        const total =
          subtopics[topic.srn as keyof typeof subtopics]?.length || 0;
        const completed = data.filter((d) => d.topic_srn === topic.srn).length;
        const isCompleted = total > 0 && completed === total;

        return {
          id: topic.srn,
          name: topic.title,
          image: topic.image,
          completed,
          total,
          isCompleted,
        };
      });

      setLessons(lessonsData);
    };

    fetchProgress();

    // Responsive visible lessons
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(5);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(7);
      } else {
        setVisibleCount(10);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Card
      className={cn(
        "w-full max-w-2xl mx-auto p-8 bg-teal-600/30 border border-teal-800 shadow-lg font-mono",
        className
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-200">Lesson Progress</h2>
        {/* Arrow nav button */}
        <Link
          className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-200 hover:bg-gray-200/90 transition-colors"
          href= "/roadmap"
        >
          <ArrowRight className="w-5 h-5 text-teal-950" />
        </Link>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-5 gap-6">
        {lessons.slice(0, visibleCount).map((lesson) => (
          <LessonItem key={lesson.id} lesson={lesson} />
        ))}

        
        {lessons.length > visibleCount && (
          <Link href="/roadmap" className="flex flex-col items-center justify-center cursor-pointer">
            <div className="w-16 h-16 flex items-center justify-center border border-dashed border-gray-200 rounded-full hover:bg-gray-100 transition">
              <MoreHorizontal className="w-6 h-6 text-gray-200" />
            </div>
            <p className="text-xs mt-2 text-gray-200">More</p>
          </Link>
        )}
      </div>
    </Card>
  );
}
