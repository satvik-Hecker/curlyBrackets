export interface Project {
    id: string
    name: string
    duration: string
    image: string
    status: "locked" | "unlocked"
    requiredBadges?: string[]
    link?: string
    description: string // ⭐ New field added
}

export const projects: Project[] = [
    {
        id: "1",
        name: "The FlowerSeeker",
        duration: "2 days",
        image: "https://i.pinimg.com/736x/4a/b7/f6/4ab7f61e5659bc8102b4caf516e445ee.jpg",
        status: "unlocked",
        link: "https://youtu.be/cLOT0APQzDs?si=037YZg6XAYNFzKvt",
        description: "Bloom this E-Comm Flower Shop with HTML/CSS 🌸", // ⭐ Description added
        requiredBadges: ["HTML Master", "CSS Styling"] // ⭐ Added new badges
    },
    {
        id: "2",
        name: "Netflix and Chill?",
        duration: "1 week",
        image: "https://i.pinimg.com/1200x/12/38/e6/1238e620246b1004d71d9b4115df4144.jpg",
        status: "locked",
        requiredBadges: ["JavaScript Master", "React Fundamentals", "ES6+ Expert"],
        description: "Netflix & Code: a responsive Netflix clone with HTML/CSS 🍿💻", // ⭐ Description added
        link: "https://youtu.be/ovKVqo-L2EM?si=ancOBIILS2AsRS8f"
    },
    {
        id: "3",
        name: "Sundown Studios",
        duration: "2 weeks",
        image: "https://i.pinimg.com/1200x/4b/23/4a/4b234aa440c288538cce76baea4a4f77.jpg",
        status: "unlocked",
        link: "https://youtu.be/6VbETTS67rM?si=NHdQYD6tka39OZJs",
        description: "Animated, responsive websites made easy. 🚀", // ⭐ Description added
        requiredBadges: ["HTML Basics", "CSS Animations", "JS Fundamentals"] // ⭐ Added new badges
    },
    {
        id: "4",
        name: "Chaar ka Vaar",
        duration: "1 week",
        image: "https://i.pinimg.com/736x/04/3c/70/043c70899e1a6a90a2999aee6b6379cf.jpg",
        status: "locked",
        requiredBadges: ["SQL Basics", "Data Modeling"],
        link:"https://youtu.be/EGqHVjU-fas?si=-XWu47eU25R7MZAF",
        description: "Master JS by building these 4 mini-projects 💫" 
    },
    {
        id: "5",
        name: "Cara E-Commerce Site",
        duration: "3 weeks",
        image: "https://i.pinimg.com/1200x/67/3c/1f/673c1feab4e8ece7c801233483f673db.jpg",
        status: "unlocked",
        link: "https://youtu.be/P8YuWEkTeuE?si=y7M6DE10dXs8pAxX",
        description: "Let's code a fun storefront! 🛍️✨", // ⭐ Description added
        requiredBadges: ["HTML Basics", "CSS Flexbox", "JS DOM Manipulation"] // ⭐ Added new badges
    },
    {
        id: "6",
        name: "DevOps & Deployment",
        duration: "4 weeks",
        image: "/placeholder.svg?height=200&width=300&text=DevOps",
        status: "locked",
        requiredBadges: ["Docker Basics", "CI/CD Fundamentals", "Cloud Computing"],
        link: "#", // ⭐ Added a placeholder link here
        description: "Learn how to containerize applications with Docker and automate deployment pipelines using CI/CD tools." // ⭐ Description added
    },
    {
        id: "7",
        name: "Mobile Development",
        duration: "5 weeks",
        image: "/placeholder.svg?height=200&width=300&text=Mobile",
        status: "locked",
        requiredBadges: ["React Native", "Mobile UI/UX", "App Store Guidelines"],
        link: "#", // ⭐ Added a placeholder link here
        description: "Build cross-platform mobile applications for iOS and Android using React Native." // ⭐ Description added
    },
    {
        id: "8",
        name: "Machine Learning Basics",
        duration: "6 weeks",
        image: "/placeholder.svg?height=200&width=300&text=ML",
        status: "unlocked",
        link: "#", // ⭐ Added a placeholder link here
        description: "Get a solid introduction to machine learning concepts, including supervised vs. unsupervised learning and basic algorithms.", // ⭐ Description added
        requiredBadges: ["Python Basics", "Statistics 101"] // ⭐ Added new badges
    },
    {
        id: "9",
        name: "UI/UX Design Principles",
        duration: "3.5 weeks",
        image: "/placeholder.svg?height=200&width=300&text=UI/UX",
        status: "unlocked",
        link: "#", // ⭐ Added a placeholder link here
        description: "Explore the core principles of User Interface (UI) and User Experience (UX) design to create intuitive and aesthetically pleasing interfaces.", // ⭐ Description added
        requiredBadges: ["Design Principles", "Figma Fundamentals"] // ⭐ Added new badges
    },
    {
        id: "10",
        name: "Advanced Security",
        duration: "4.5 weeks",
        image: "/placeholder.svg?height=200&width=300&text=Security",
        status: "locked",
        requiredBadges: ["Web Security Basics", "Authentication Systems", "Encryption Fundamentals"],
        link: "#", // ⭐ Added a placeholder link here
        description: "Master advanced web security concepts, including common vulnerabilities, authentication protocols, and data encryption techniques." // ⭐ Description added
    },
]
