'use client';

import { use } from 'react';
import { useEffect, useState } from 'react';
import { topics } from '@/data/topics';
import { subtopics } from '@/data/subtopics';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Clock, Star, BookOpen } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

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

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

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
          onConflict: 'user_id,subtopic_id',
        }
      );

    if (error) {
      console.error('Failed to update progress:', JSON.stringify(error, null, 2));
    }
  };

  return (
    <AnimatePresence mode="wait">
      <div
  
        className="min-h-screen w-full bg-black font-mono relative overflow-x-hidden"
      >
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 90% 70% at 50% 0%, rgba(94, 234, 212, 0.3), transparent 75%), #000',
          }}
        />

        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-10 lg:flex-row mt-20"
        >
        
          <div className="flex-1 flex flex-col gap-1">
            <div className="flex justify-between">
              {prevTopic ? (
                <Link href={`/learn/${prevTopic.srn}`}>
                  <Button className="text-white bg-transparent border-none text-sm hover:underline hover:bg-transparent ">
                    <ArrowLeft className="text-white mr-1" /> Prev Topic
                  </Button>
                </Link>
              ) : <div className='h-8'/>}
            </div>

            <motion.div variants={fadeUp}>
              <Card className="overflow-hidden bg-transparent border-none drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                <Image
                  src={topic.image}
                  alt={topic.title}
                  width={1280}
                  height={500}
                  className="w-full h-auto object-cover rounded-xl"
                  priority
                />
              </Card>
            </motion.div>

            <motion.div variants={fadeUp}>
              <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                <h1 className="text-3xl font-bold text-teal-200 mb-2 [text-shadow:0_0_5px_black]">{topic.title}</h1>
                <p className="text-sm text-white mb-3">{topic.desc}</p>
                <div className="flex flex-wrap gap-4 text-teal-100 text-sm">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{topic.duration}</span>
                  <span className="flex items-center gap-1"><Star className="w-4 h-4" />{topic.difficulty}</span>
                </div>
              </div>
            </motion.div>
          </div>

          
          <div className="flex-1 min-w-[300px] flex flex-col gap-6">
            <div className="flex justify-end">
              {nextTopic ? (
                <Link href={`/learn/${nextTopic.srn}`}>
                  <Button className="text-white bg-transparent border-none text-sm hover:underline hover:bg-transparent">
                    Next Topic <ArrowRight className="text-white ml-1" />
                  </Button>
                </Link>
              ) : <div className='h-8'/>}
            </div>

            <motion.div variants={fadeUp} className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
              <h2 className="text-2xl font-semibold text-teal-300 mb-4">Course Content</h2>
              <motion.ul variants={containerVariants} className="space-y-4">
                {topicSubtopics.map((sub: Subtopic) => (
                  <motion.li
                    key={sub.id}
                    variants={fadeUp}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-zinc-800 border border-teal-800 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="text-white font-semibold text-base">{sub.title}</div>
                        <div className="text-xs text-teal-400">{sub.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link href={sub.url} target="_blank">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="bg-transparent text-white size-8 border-none rounded-full hover:bg-teal-200 hover:text-teal-950"
                        >
                          {sub.type === 'video' ? (
                            <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                <path d="M6 3L20 12 6 21 6 3z" />
                              </g>
                            </svg>
                          ) : (
                            <BookOpen size={16} />
                          )}
                        </Button>
                      </Link>
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => toggleLessonCompletion(sub.id)}
                        className={`size-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          completed[sub.id] ? 'bg-teal-400 border-teal-400' : 'border-teal-700'
                        }`}
                      >
                        <AnimatePresence>
                          {completed[sub.id] && (
                            <motion.svg
                              key="check"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="w-3 h-3 text-black"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </motion.svg>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
