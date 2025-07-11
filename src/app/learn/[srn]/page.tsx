import { topics } from '@/data/topics';
import { subtopics } from '@/data/subtopics';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Clock, Star } from 'lucide-react';
import { PlayCircle, BookOpen } from 'lucide-react';

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

export default function LearnTopicPage({ params }: { params: { srn: string } }) {
  const srnNum = Number(params.srn);
  const topicIndex = topics.findIndex((t: Topic) => t.srn === srnNum);
  if (topicIndex === -1) return notFound();
  const topic = topics[topicIndex];
  const prevTopic = topics[topicIndex - 1];
  const nextTopic = topics[topicIndex + 1];
  const topicSubtopics = (subtopics[srnNum as keyof typeof subtopics] as unknown as Subtopic[]) || [];

  return (
    <div className="min-h-screen w-full relative bg-black overflow-x-hidden font-mono">
      
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 90% 70% at 50% 0%, rgba(94, 234, 212, 0.3), transparent 75%), #000000" }} />
      
      <div className="relative z-10 max-w-[68rem] mx-auto flex flex-col lg:flex-row gap-8 px-2 sm:px-4 py-8 mt-20">
        {/* Left: Main Content */}



        <div className="flex-1 flex flex-col gap-1">

          <div className="flex justify-between">
            {prevTopic ? (
              <Link href={`/learn/${prevTopic.srn}`}>
                
                <Button  className="text-white bg-transparent border-none text-sm hover:underline">
                <ArrowLeft className='text-white'/>
                  Prev Topic
                </Button>
              </Link>
            ) : <div className='h-8'/>}
          </div>

          {/* Image Card */}
          <Card className="overflow-hidden shadow-lg bg-transparent border-none drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]">
            <Image
                src={topic.image}
                alt={topic.title}
                width={1280} // or adjust based on your layout
                height={500} // adjust to get ideal height
                className="w-full h-auto object-cover rounded-xl"
                priority
            >
            
            </Image>           
          </Card>


          {/* Topic Details */}
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <h1 className="text-3xl font-bold mb-2 text-teal-200 [text-shadow:0_0_5px_black] ">{topic.title}</h1>
            <p className="text-sm text-white mb-1">{topic.desc}</p>
            <div className="flex flex-wrap gap-4 mb-2">
              <span className="flex items-center gap-1 bg-transparent text-teal-100 text-[13px]">
                <Clock className='w-4 h-4'></Clock>
                {topic.duration}
              </span>
              <span className="flex items-center gap-1 bg-transparent text-teal-100 text-[13px]">
                <Star className='w-4 h-4 '></Star>
                {topic.difficulty}
              </span>

             
            </div>
          </div>
        </div>

              

        {/* Right: Subtopics List */}
        <div className="flex-1 min-w-[300px] flex flex-col gap-6 ">
            
        <div className="flex justify-end">
        {nextTopic ? (
              <Link  href={`/learn/${nextTopic.srn}`}>
                <Button  className="text-white bg-transparent border-none text-sm hover:underline">
                Next Topic
                <ArrowRight className='text-white'/>
                </Button>
              </Link>
            ) : <div className='h-8'/>}
            </div>

          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <h2 className="text-2xl font-semibold mb-3 text-teal-300">Course Content</h2>
            <ul className="space-y-3">
              {topicSubtopics.map((sub: Subtopic) => (
                <li key={sub.id} className="flex items-center justify-between bg-zinc-800 border border-teal-800 rounded-lg shadow p-3">
                  <div>
                    <div className="text-[15px] font-semibold text-white mb-1">{sub.title}</div>
                    <div className="text-xs text-teal-400">{sub.duration}</div>
                  </div>
                  <Link href={sub.url} target="_blank">
                    <Button size="icon"  variant="ghost" className="bg-transparent text-white size-8 border-none rounded-full hover:bg-teal-200 hover:text-teal-950">
                    {sub.type === 'video' ? (
                         <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                         <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                           <path d="M6 3L20 12 6 21 6 3z"></path>
                         </g>
                       </svg>
                        ) : (
                        <BookOpen size={16} />
                        )}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
