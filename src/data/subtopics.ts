export const subtopics = {
  "html-css-fundamentals": [
    {
      id: "html-intro",
      title: "Intro to HTML",
      type: "video",
      duration: "8m 30s",
      url: "https://www.youtube.com/watch?v=video1"
    },
    {
      id: "html-tags",
      title: "Common HTML Tags",
      type: "doc",
      duration: "10 min read",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTML"
    },
    {
      id: "css-intro",
      title: "Intro to CSS",
      type: "video",
      duration: "12m 10s",
      url: "https://www.youtube.com/watch?v=video2"
    },
    {
      id: "css-selectors",
      title: "CSS Selectors Explained",
      type: "video",
      duration: "15m",
      url: "https://www.youtube.com/watch?v=video3"
    },
  ],

  "javascript-essentials": [
    {
      id: "js-vars",
      title: "Variables in JS",
      type: "video",
      duration: "10m",
      url: "https://www.youtube.com/watch?v=video4"
    },
    {
      id: "js-functions",
      title: "Functions Explained",
      type: "doc",
      duration: "8 min read",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions"
    },
    {
      id: "js-loops",
      title: "Loops and Logic",
      type: "video",
      duration: "12m 20s",
      url: "https://www.youtube.com/watch?v=video5"
    },
  ],
} as const

export type TopicSlug = keyof typeof subtopics
