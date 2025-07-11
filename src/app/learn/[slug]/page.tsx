import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { topics } from "@/data/topics"
import { subtopics, TopicSlug } from "@/data/subtopics"
import Image from "next/image"
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";

type Props = {
  params: { slug: string }
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params?.slug
  if (!slug) return { title: "Topic" }

  const topic = topics.find(t => t.slug === slug)
  return {
    title: topic?.title ?? "Topic",
  }
}

export async function generateStaticParams() {
  return topics.map(topic => ({
    slug: topic.slug,
  }))
}

export default async function LearnTopicPage({ params }: Props) {
  // ✅ Artificial await to satisfy Next.js dynamic route check
  await Promise.resolve()

  const slug = params.slug as TopicSlug
  const topic = topics.find(t => t.slug === slug)
  const lessons = subtopics[slug]

  if (!topic || !lessons) return notFound()

  return (
    <main className="min-h-screen w-full bg-black text-white py-10 px-6 md:px-20">
      <section className="mb-10">
        <h1 className="text-3xl md:text-5xl font-bold font-mono mb-2">{topic.title}</h1>
        <p className="text-muted-foreground mb-4">{topic.desc}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Lessons</h2>
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">{lesson.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    ⏱ {lesson.duration} • 📂 {lesson.type}
                  </p>
                </div>
                <a
                  href={lesson.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline text-sm"
                >
                  Open
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
