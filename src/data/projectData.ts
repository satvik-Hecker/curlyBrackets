export interface Project {
    id: string
    name: string
    duration: string
    image: string
    status: "locked" | "unlocked"
    requiredBadges?: string[]
    link?: string
    description: string
}

export const projects: Project[] = [
    {
        id: "1",
        name: "The FlowerSeeker",
        duration: "2 days",
        image: "https://i.pinimg.com/736x/4a/b7/f6/4ab7f61e5659bc8102b4caf516e445ee.jpg",
        status: "unlocked",
        link: "https://youtu.be/cLOT0APQzDs?si=037YZg6XAYNFzKvt",
        description: "Bloom this E-Comm Flower Shop with HTML/CSS 🌸",
        requiredBadges: ["Code Crawler", "StyLord"]
    },
    {
        id: "2",
        name: "Netflix Clone",
        duration: "1 week",
        image: "https://i.pinimg.com/1200x/12/38/e6/1238e620246b1004d71d9b4115df4144.jpg",
        status: "locked",
        requiredBadges: ["Code Crawler", "StyLord", "Lord of the <div>s"],
        description: "Netflix & Code: a responsive Netflix clone with HTML/CSS 🍿💻",
        link: "https://youtu.be/ovKVqo-L2EM?si=ancOBIILS2AsRS8f"
    },
    {
        id: "3",
        name: "Sundown Studios",
        duration: "2 weeks",
        image: "https://i.pinimg.com/1200x/4b/23/4a/4b234aa440c288538cce76baea4a4f77.jpg",
        status: "unlocked",
        link: "https://youtu.be/6VbETTS67rM?si=NHdQYD6tka39OZJs",
        description: "Animated, responsive websites made easy. 🚀",
        requiredBadges: ["Code Crawler", "StyLord", "Lord of the <div>s"]
    },
    {
        id: "4",
        name: "Chaar ka Vaar",
        duration: "1 week",
        image: "https://i.pinimg.com/736x/04/3c/70/043c70899e1a6a90a2999aee6b6379cf.jpg",
        status: "locked",
        requiredBadges: ["Null Ninja", "Code Crawler"],
        link:"https://youtu.be/EGqHVjU-fas?si=-XWu47eU25R7MZAF",
        description: "Master JS by building these 4 mini-projects 💫"
    },
    {
        id: "5",
        name: "Cara",
        duration: "3 weeks",
        image: "https://i.pinimg.com/1200x/67/3c/1f/673c1feab4e8ece7c801233483f673db.jpg",
        status: "unlocked",
        link: "https://youtu.be/P8YuWEkTeuE?si=y7M6DE10dXs8pAxX",
        description: "Let's code a fun storefront! 🛍️✨",
        requiredBadges: ["Null Ninja", "Code Crawler", "Lord of the <div>s"]
    },
    {
        id: "6",
        name: "Indoor Plants",
        duration: "2 weeks",
        image: "https://i.pinimg.com/1200x/0e/46/95/0e46957c40a7405de600c79563e4b2d2.jpg",
        status: "locked",
        requiredBadges: ["The Last Tailwinder", "Flexecutioner"],
        link: "https://youtu.be/zKguO4oaAGs?si=I-8LwfcI36hY5f4j",
        description: "A fully responsive website using Tailwind CSS. 🌿"
    },
    {
        id: "7",
        name: "Bookstore",
        duration: "5 weeks",
        image: "https://i.pinimg.com/736x/8e/48/aa/8e48aa12b5b193cdd7bf434227d2af5d.jpg",
        status: "locked",
        requiredBadges: ["Attack on Backend", "Never Express", "JSXpert"],
        link: "https://youtu.be/7l5UgtWfnw0?si=rPfYXh8fqABh4PYS",
        description: "Code your own digital library from scratch 📚✨"
    },
    {
        id: "8",
        name: "MernChat",
        duration: "6 weeks",
        image: "https://i.pinimg.com/1200x/26/80/32/268032f16e8d37372194dd5871dcdf01.jpg",
        status: "unlocked",
        link: "https://youtu.be/mYy-d6BtqmU?si=KVitG8fxIjyhm-HU",
        description: "Chat with your friends on your own website 😎👻",
        requiredBadges: ["Commitment Issues", "CRUDzilla", "Never Express", "JSXpert"]
    },
    {
        id: "9",
        name: "Vid.AI",
        duration: "3.5 weeks",
        image: "https://i.pinimg.com/1200x/6e/a4/43/6ea443e8fefb3df1ea4c8ee011420336.jpg",
        status: "unlocked",
        link: "https://youtu.be/c8Z73cVl6x4?si=6KdO-Ynw_aTcv_lW",
        description: "Go full-stack with Next.js, NextAuth, ImageKit, and MongoDB. 🚀",
        requiredBadges: ["JSXpert", "Over-Reacted", "Commitment Issues"]
    },
    {
        id: "10",
        name: "Shallow Seek",
        duration: "4.5 weeks",
        image: "https://i.pinimg.com/736x/4b/76/66/4b7666e84dcfc088ab98fe1009434f89.jpg",
        status: "locked",
        requiredBadges: ["Over-Reacted", "Never Express"],
        link: "https://youtu.be/uJPa_18Zf1I?si=Sz6NlxGkE42W4yL1",
        description: "Your OWN AI chatbot????? 🤯🤯"
    },
]
