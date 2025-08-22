
export type DailyQuest = {
  id: number
  title: string
  description: string
}

export const dailyQuests: DailyQuest[] = [
  // --- Platform Interaction Quests (5) ---
  {
    id: 1,
    title: "Complete a Lesson",
    description: "Finish one lesson from any topic today.",
  },
  {
    id: 2,
    title: "Earn a Badge",
    description: "Unlock any badge by completing its requirement.",
  },
  {
    id: 3,
    title: "Share Curly Brackets",
    description: "Tell a friend about Curly Brackets or share it online.",
  },
  {
    id: 4,
    title: "Log In Streak",
    description: "Log in two days in a row to maintain your streak.",
  },
  {
    id: 5,
    title: "Update Your Profile",
    description: "Personalize your profile with a name or avatar.",
  },

  // --- HTML Quests (3) ---
  {
    id: 6,
    title: "Build a List",
    description: "Create an ordered and unordered list in HTML.",
  },
  {
    id: 7,
    title: "Add an Image",
    description: "Use the <img> tag to display an image on a webpage.",
  },
  {
    id: 8,
    title: "Create a Link",
    description: "Add a clickable link using the <a> tag.",
  },

  // --- CSS Quests (3) ---
  {
    id: 9,
    title: "Style a Button",
    description: "Write CSS to make a button look cool (color + hover).",
  },
  {
    id: 10,
    title: "Text Formatting",
    description: "Change font size, color, and alignment of text.",
  },
  {
    id: 11,
    title: "Flexbox Practice",
    description: "Arrange 3 boxes horizontally using flexbox.",
  },

  // --- JavaScript Quests (3) ---
  {
    id: 12,
    title: "Write a Function",
    description: "Create a JS function that adds two numbers.",
  },
  {
    id: 13,
    title: "Array Practice",
    description: "Make a JS array of 5 fruits and log it to console.",
  },
  {
    id: 14,
    title: "Event Listener",
    description: "Add a click event listener to a button in JS.",
  },

  // --- Git Quests (3) ---
  {
    id: 15,
    title: "Initialize Git",
    description: "Run `git init` in a new project folder.",
  },
  {
    id: 16,
    title: "First Commit",
    description: "Make a commit with a meaningful message.",
  },
  {
    id: 17,
    title: "Push to GitHub",
    description: "Push your project to a new GitHub repository.",
  },

  // --- React Quests (3) ---
  {
    id: 18,
    title: "Create a Component",
    description: "Build a simple React component that shows text.",
  },
  {
    id: 19,
    title: "Props Practice",
    description: "Pass props to a component and display them.",
  },
  {
    id: 20,
    title: "State Hook",
    description: "Use the `useState` hook to toggle a button label.",
  },

  // --- Extra Web Dev Quests (APIs, Debugging, etc.) (3) ---
  {
    id: 21,
    title: "Fetch API",
    description: "Fetch data from a public API using fetch().",
  },
  {
    id: 22,
    title: "Console Debugging",
    description: "Use console.log() to debug a small JS snippet.",
  },
  {
    id: 23,
    title: "Responsive Design",
    description: "Make a div responsive using CSS media queries.",
  },

  // --- More HTML & CSS Advanced (for variety) ---
  {
    id: 24,
    title: "Form Practice",
    description: "Create a simple HTML form with input and submit.",
  },
  {
    id: 25,
    title: "CSS Grid Layout",
    description: "Build a 2x2 grid layout using CSS grid.",
  },
  {
    id: 26,
    title: "Background Image",
    description: "Set a background image using CSS.",
  },

  // --- More JS Practice ---
  {
    id: 27,
    title: "Loop Practice",
    description: "Write a for loop that prints numbers 1–10.",
  },
  {
    id: 28,
    title: "Conditionals",
    description: "Write a JS if/else statement that checks age.",
  },
  {
    id: 29,
    title: "LocalStorage",
    description: "Save a value to localStorage and retrieve it.",
  },

  // --- More React ---
  {
    id: 30,
    title: "React List Rendering",
    description: "Render a list of items using `map()` in React.",
  },
  {
    id: 31,
    title: "Effect Hook",
    description: "Use `useEffect` to log a message when component mounts.",
  },
  {
    id: 32,
    title: "Conditional Rendering",
    description: "Show or hide text based on state in React.",
  },

  // --- More Git ---
  {
    id: 33,
    title: "Branch Practice",
    description: "Create a new branch in your project with Git.",
  },
  {
    id: 34,
    title: "Merge Branch",
    description: "Merge a feature branch into main.",
  },
  {
    id: 35,
    title: "Clone Repo",
    description: "Clone a public GitHub repo to your computer.",
  },
]
