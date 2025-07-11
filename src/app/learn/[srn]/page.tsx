'use client';
import {use} from 'react';
import { useEffect, useState } from 'react';
import { topics } from '@/data/topics';
import { subtopics } from '@/data/subtopics';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Clock, Star } from 'lucide-react';
import { BookOpen } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

interface Topic {
  srn: number;
  title: string;
  desc: string;
  tags: string[];
  duration: string;
  difficulty: string;
  image: string;
}

interface Subtopic {
  id: string;
  title: string;
  type: 'video' | 'doc';
  duration: string;
  url: string;
}

export default function LearnTopicPage({ params }: { params: Promise<{ srn: string }> }) {
    const resolvedParams = use(params);
    const srnNum = Number(resolvedParams.srn);
  const topicIndex = topics.findIndex((t: Topic) => t.srn === srnNum);
  if (topicIndex === -1) return notFound();

  const topic = topics[topicIndex];
  const prevTopic = topics[topicIndex - 1];
  const nextTopic = topics[topicIndex + 1];
  const topicSubtopics = (subtopics[srnNum as keyof typeof subtopics] as unknown as Subtopic[]) || [];

  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [loadingProgress, setLoadingProgress] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) return;

      const { data, error } = await supabase
        .from('lesson_progress')
        .select('subtopic_id')
        .eq('user_id', user.id)
        .eq('topic_srn', srnNum)
        .eq('is_completed', true);

      if (!error && data) {
        const progressMap: Record<string, boolean> = {};
        data.forEach((row) => {
          progressMap[row.subtopic_id] = true;
        });
        setCompleted(progressMap);
      }

      setLoadingProgress(false);
    };

    fetchProgress();
  }, [srnNum]);

  const toggleLessonCompletion = async (subtopicId: string) => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
  
    if (userError || !user) return;
  
    const isNowCompleted = !completed[subtopicId];
  
    setCompleted((prev) => ({
      ...prev,
      [subtopicId]: isNowCompleted,
    }));
  
    const { error } = await supabase
  .from('lesson_progress')
  .upsert(
    {
      user_id: user.id,
      topic_srn: srnNum,
      subtopic_id: subtopicId,
      is_completed: isNowCompleted,
    },
    {
      onConflict: 'user_id,subtopic_id', // ✅ correct format
    }
  );
  
    if (error) {
      console.error('❌ Failed to update progress:', JSON.stringify(error, null, 2));
    }
  };
  

  return (
    <div className="min-h-screen w-full relative bg-black overflow-x-hidden font-mono">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 70% at 50% 0%, rgba(94, 234, 212, 0.3), transparent 75%), #000000',
        }}
      />

      <div className="relative z-10 max-w-[68rem] mx-auto flex flex-col lg:flex-row gap-8 px-2 sm:px-4 py-8 mt-20">
        {/* Left Side */}
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex justify-between">
            {prevTopic ? (
              <Link href={`/learn/${prevTopic.srn}`}>
                <Button className="text-white bg-transparent border-none text-sm hover:underline">
                  <ArrowLeft className="text-white" />
                  Prev Topic
                </Button>
              </Link>
            ) : (
              <div className="h-8" />
            )}
          </div>

          {/* Topic Image */}
          <Card className="overflow-hidden shadow-lg bg-transparent border-none drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]">
            <Image
              src={topic.image}
              alt={topic.title}
              width={1280}
              height={500}
              className="w-full h-auto object-cover rounded-xl"
              priority
            />
          </Card>

          {/* Topic Info */}
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <h1 className="text-3xl font-bold mb-2 text-teal-200 [text-shadow:0_0_5px_black]">{topic.title}</h1>
            <p className="text-sm text-white mb-1">{topic.desc}</p>
            <div className="flex flex-wrap gap-4 mb-2">
              <span className="flex items-center gap-1 bg-transparent text-teal-100 text-[13px]">
                <Clock className="w-4 h-4" />
                {topic.duration}
              </span>
              <span className="flex items-center gap-1 bg-transparent text-teal-100 text-[13px]">
                <Star className="w-4 h-4" />
                {topic.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Lessons */}
        <div className="flex-1 min-w-[300px] flex flex-col gap-6">
          <div className="flex justify-end">
            {nextTopic ? (
              <Link href={`/learn/${nextTopic.srn}`}>
                <Button className="text-white bg-transparent border-none text-sm hover:underline">
                  Next Topic
                  <ArrowRight className="text-white" />
                </Button>
              </Link>
            ) : (
              <div className="h-8" />
            )}
          </div>

          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <h2 className="text-2xl font-semibold mb-3 text-teal-300">Course Content</h2>
            <ul className="space-y-3">
              {topicSubtopics.map((sub: Subtopic) => (
                <li
                  key={sub.id}
                  className="flex items-center justify-between bg-zinc-800 border border-teal-800 rounded-lg shadow p-3"
                >
                  <div className="flex items-center gap-3">
                    

                    <div>
                      <div className="text-[15px] font-semibold text-white mb-1">{sub.title}</div>
                      <div className="text-xs text-teal-400">{sub.duration}</div>
                    </div>
                  </div>
                <div className='flex gap-2'>
                  <Link href={sub.url} target="_blank">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="bg-transparent text-white size-8 border-none rounded-full hover:bg-teal-200 hover:text-teal-950"
                    >
                      {sub.type === 'video' ? (
                        <svg
                          className="size-[1.2em]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path d="M6 3L20 12 6 21 6 3z" />
                          </g>
                        </svg>
                      ) : (
                        <BookOpen size={16} />
                      )}
                    </Button>
                  </Link>
                  <div className="mt-[6px]">
                  <button
                      onClick={() => toggleLessonCompletion(sub.id)}
                      className={`size-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        completed[sub.id] ? 'bg-teal-400 border-teal-400' : 'border-teal-700'
                      }`}
                    >
                      {completed[sub.id] && (
                        <svg
                          className="w-3 h-3 text-black"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    </div>
                    </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
