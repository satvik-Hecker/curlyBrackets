
export interface Badge {
  id: string
  name: string
  description: string
  image: string
  topics: string[] 
}

export const badges: Badge[] = [
  {
    id: "code-crawler",
    name: "Code Crawler",
    description: "Completed HTML Fundamentals like a true web spelunker.",
    image: "/badges/code-crawler.png",
    topics: ["h1","h2","h3","h4","h5"]
  },
  {
    id: "stylord",
    name: "StyLord",
    description: "Ruled over CSS Basics with unmatched style.",
    image: "/badges/stylord.png",
    topics: ["c1","c2","c3","c3","c4","c5"]
  },
  {
    id: "lord-of-divs",
    name: "Lord of the <div>s",
    description: "Mastered the art of divs and CSS layouts.",
    image: "/badges/lord-of-divs.png",
    topics: ["c1","c2","c3","c3","c4","c5"]
  },
  {
    id: "null-ninja",
    name: "Null Ninja",
    description: "Sliced through JavaScript Essentials with stealthy precision.",
    image: "/badges/null-ninja.png",
    topics: ["js1","js2","js3"]
  },
  {
    id: "last-tailwinder",
    name: "The Last Tailwinder",
    description: "Became a Tailwind CSS master — the final hope.",
    image: "/badges/last-tailwinder.png",
    topics: ["ac1","ac2","ac3","ac4"]
  },
  {
    id: "flexecutioner",
    name: "Flexecutioner",
    description: "Executed perfect layouts with Flexbox mastery.",
    image: "/badges/flexecutioner.png",
    topics: ["ac1","ac2","ac3","ac4"]
  },
  {
    id: "commitment-issues",
    name: "Commitment Issues",
    description: "Survived Git & GitHub with only minor trust issues.",
    image: "/badges/commitment-issues.png",
    topics: ["g1","g2","g3","g4","g5","g6","g7"]
  },
  {
    id: "attack-on-backend",
    name: "Attack on Backend",
    description: "Defended the servers by mastering Node.js basics.",
    image: "/badges/attack-on-backend.png",
    topics: ["n1","n2","n3","n4"]
  },
  {
    id: "never-express",
    name: "Never Express",
    description: "Advanced backend warrior who never over-expresses.",
    image: "/badges/never-express.png",
    topics: ["e1","e2","e3","e4","e5","e6"]
  },
  {
    id: "crudzilla",
    name: "CRUDzilla",
    description: "Roared through database CRUD operations like a kaiju.",
    image: "/badges/crudzilla.png",
    topics: ["db1","db2","db3","db4","db5"]
  },
  {
    id: "jsxpert",
    name: "JSXpert",
    description: "React Basics mastered with JSX expertise.",
    image: "/badges/jsxpert.png",
    topics: ["r1","r2","r3","r4","r5"]
  },
  {
    id: "over-reacted",
    name: "Over-Reacted",
    description: "Mastered React so hard it was almost too much.",
    image: "/badges/over-reacted.png",
    topics: ["r6","r7","r8","r9","r10"]
  }
]
