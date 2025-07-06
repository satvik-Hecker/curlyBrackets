// app/learn/[slug]/page.tsx
import { topics } from "@/data/topics"
import { subtopics, TopicSlug } from "@/data/subtopics"

export default function TopicPage({ params }: { params: { slug: string } }) {
    const slug = params.slug as TopicSlug
  const topic = topics.find(t => t.slug === params.slug)
  const topicSubtopics = subtopics[slug]

  if (!topic) return <div className="text-white p-10">Topic not found 😥</div>

  return (
    <div className="min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">{topic.title}</h1>
      <p className="mb-6 text-gray-300">{topic.desc}</p>

      <h2 className="text-xl font-semibold mb-2">Subtopics</h2>
      <ul className="space-y-2">
        {topicSubtopics?.map((sub) => (
          <li key={sub.id} className="bg-white/10 p-3 rounded">
            <strong>{sub.title}</strong> — <span className="text-sm italic">{sub.type}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
