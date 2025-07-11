export const subtopics = {
  1: [ // HTML
    { id: "h1", title: "Learn the basics", type: "video", duration: "7m", url: "https://youtube.com" },
    { id: "h2", title: "Writing Semantic HTML", type: "video", duration: "9m", url: "https://youtube.com" },
    { id: "h3", title: "Forms and Validation", type: "doc", duration: "10 min read", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form" },
    { id: "h4", title: "Accessibility", type: "doc", duration: "6 min read", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility" },
    { id: "h5", title: "SEO Basics", type: "video", duration: "5m", url: "https://youtube.com" },

  ],

  2: [ // CSS Basics
    { id: "c1", title: "Why do we need CSS?", type: "video", duration: "5m", url: "https://youtube.com" },
    { id: "c2", title: "How to add CSS", type: "video", duration: "4m", url: "https://youtube.com" },
    { id: "c3", title: "Basic of CSS", type: "video", duration: "8m", url: "https://youtube.com" },
    { id: "c4", title: "Responsiveness", type: "video", duration: "6m", url: "https://youtube.com" },
    { id: "c5", title: "Animation", type: "video", duration: "5m", url: "https://youtube.com" },
  ],

 3: [ // JavaScript Essentials
    { id: "js1", title: "Learn the basics", type: "video", duration: "10m", url: "https://youtube.com" },
    { id: "js2", title: "DOM Manipulation", type: "video", duration: "9m", url: "https://youtube.com" },
    { id: "js3", title: "Advance Topics", type: "video", duration: "11m", url: "https://youtube.com" },
  ],

  4: [ // Advanced CSS
    { id: "ac1", title: "Flexbox", type: "video", duration: "7m", url: "https://youtube.com" },
    { id: "ac2", title: "Grid", type: "video", duration: "7m", url: "https://youtube.com" },
    { id: "ac3", title: "Bootstrap", type: "video", duration: "6m", url: "https://youtube.com" },
    { id: "ac4", title: "Tailwind CSS", type: "video", duration: "9m", url: "https://youtube.com" },
  ],

  5: [
    { id: "g1", title: "Introduction to GIT", type: "doc", duration: "5 min read", url: "https://youtube.com" },
    { id: "g2", title: "Master Git Init", type: "video", duration: "7m", url: "https://youtube.com" },
    { id: "g3", title: "Git commits and logs", type: "video", duration: "8m", url: "https://youtube.com" },
    { id: "g4", title: "Git internal working and configs", type: "video", duration: "10m", url: "https://youtube.com" },
    { id: "g5", title: "Git merge and git conflicts", type: "video", duration: "9m", url: "https://youtube.com" },
    { id: "g6", title: "Git Diff and stashing", type: "video", duration: "6m", url: "https://youtube.com" },
    { id: "g7", title: "Github in one shot", type: "video", duration: "12m", url: "https://youtube.com" },
  ],
  
  6: [
    { id: "n1", title: "Overview", type: "video", duration: "6m", url: "https://youtube.com" },
    { id: "n2", title: "Backend Tools and Technologies", type: "doc", duration: "8 min read", url: "https://youtube.com" },
    { id: "n3", title: "Node.js", type: "video", duration: "10m", url: "https://youtube.com" },
    { id: "n4", title: "Express", type: "video", duration: "9m", url: "https://youtube.com" },
  ],
  
  7: [
    { id: "e1", title: "Creating First Server with Express", type: "video", duration: "9m", url: "https://youtube.com" },
    { id: "e2", title: "HTTP Requests", type: "video", duration: "7m", url: "https://youtube.com" },
    { id: "e3", title: "Postman", type: "video", duration: "6m", url: "https://youtube.com" },
    { id: "e4", title: "Middlewares", type: "video", duration: "10m", url: "https://youtube.com" },
    { id: "e5", title: "REST API", type: "video", duration: "8m", url: "https://youtube.com" },
    { id: "e6", title: "GraphQL API", type: "video", duration: "11m", url: "https://youtube.com" },
  ],
  
  8: [ // Database
    { id: "db1", title: "Different type of Database", type: "doc", duration: "7 min read", url: "https://youtube.com" },
    { id: "db2", title: "No SQL vs SQL", type: "video", duration: "5m", url: "https://youtube.com" },
    { id: "db3", title: "MongoDB in one shot", type: "video", duration: "12m", url: "https://youtube.com" },
    { id: "db4", title: "Postgres DB", type: "video", duration: "8m", url: "https://youtube.com" },
    { id: "db5", title: "Prisma", type: "video", duration: "6m", url: "https://youtube.com" },
  ],

  9: [ // React
    { id: "r1", title: "Components", type: "video", duration: "9m", url: "https://youtube.com" },
    { id: "r2", title: "Rendering", type: "video", duration: "6m", url: "https://youtube.com" },
    { id: "r3", title: "Props", type: "video", duration: "5m", url: "https://youtube.com" },
    { id: "r4", title: "Hooks", type: "video", duration: "10m", url: "https://youtube.com" },
    { id: "r5", title: "Routers", type: "video", duration: "7m", url: "https://youtube.com" },
  ],
  10: [
    { id: "r6", title: "State management (Redux)", type: "video", duration: "8m", url: "https://youtube.com" },
    { id: "r7", title: "API Calls", type: "video", duration: "6m", url: "https://youtube.com" },
    { id: "r8", title: "Framework (Next.js)", type: "video", duration: "9m", url: "https://youtube.com" },
    { id: "r9", title: "Type & validation (Zod)", type: "video", duration: "5m", url: "https://youtube.com" },
    { id: "r10", title: "Animation (Framer)", type: "video", duration: "7m", url: "https://youtube.com" },
  ]

} as const

export type TopicID = keyof typeof subtopics
