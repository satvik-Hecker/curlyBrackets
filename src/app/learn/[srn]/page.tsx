import { topics } from '@/data/topics';
import { subtopics } from '@/data/subtopics';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BorderBeam } from '@/components/magicui/border-beam';
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
            <h1 className="text-3xl font-bold mb-2 text-teal-400">{topic.title}</h1>
            <p className="text-lg text-teal-200 mb-4">{topic.desc}</p>
            <div className="flex flex-wrap gap-4 mb-2">
              <span className="flex items-center gap-1 px-3 py-1 bg-teal-900 text-teal-300 rounded text-sm">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 6v6l4 2"/></svg>
                {topic.duration}
              </span>
              <span className="flex items-center gap-1 px-3 py-1 bg-teal-900 text-teal-300 rounded text-sm">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor">{topic.difficulty[0]}</text></svg>
                {topic.difficulty}
              </span>
              {topic.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-zinc-800 text-teal-500 rounded text-xs">{tag}</span>
              ))}
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
            <h2 className="text-xl font-semibold mb-3 text-teal-300">Course Content</h2>
            <ul className="space-y-3">
              {topicSubtopics.map((sub: Subtopic) => (
                <li key={sub.id} className="flex items-center justify-between bg-zinc-800 border border-teal-800 rounded shadow p-3">
                  <div>
                    <div className="font-medium text-white">{sub.title}</div>
                    <div className="text-xs text-teal-400">{sub.duration}</div>
                  </div>
                  <Link href={sub.url} target="_blank">
                    <Button size="sm" variant="secondary" className="bg-teal-700 text-white hover:bg-teal-600">
                      {sub.type === 'video' ? 'Play' : 'Read'}
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
