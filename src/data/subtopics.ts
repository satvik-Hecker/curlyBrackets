export const subtopics = {
  1: [
    {
      id: "html-crash",
      title: "Learn the Basics",
      type: "video",
      duration: "1h 10m",
      url: "https://www.youtube.com/watch?v=qz0aGYrrlhU",
    },
    {
      id: "semantic-html",
      title: "Writing semantic HTML",
      type: "video",
      duration: "10m",
      url: "https://www.youtube.com/watch?v=DSRMCZwM3YE",
    },
    {
      id: "html-forms",
      title: "Forms and Validation",
      type: "video",
      duration: "12m",
      url: "https://www.youtube.com/watch?v=LhWQlBdqaeM",
    },
    {
      id: "css-selectors",
      title: "CSS Selectors Explained",
      type: "video",
      duration: "15m",
      url: "https://www.youtube.com/watch?v=video3",
    },
  ],

  2: [
    {
      id: "js-vars",
      title: "Variables in JS",
      type: "video",
      duration: "10m",
      url: "https://www.youtube.com/watch?v=video4",
    },
    {
      id: "js-functions",
      title: "Functions Explained",
      type: "doc",
      duration: "8 min read",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
    },
    {
      id: "js-loops",
      title: "Loops and Logic",
      type: "video",
      duration: "12m 20s",
      url: "https://www.youtube.com/watch?v=video5",
    },
  ],
} as const

export type TopicID = keyof typeof subtopics
