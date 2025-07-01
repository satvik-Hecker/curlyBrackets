import { Button } from "@/components/ui/button"
import { Castoro } from "next/font/google";

const castoro = Castoro({
  weight: '400', 
  subsets: ['latin'],
  variable: '--font-castoro',
});

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white px-6 py-20 flex items-center">
      {/* Radial background */}
      <div className="absolute right-[-100px] top-[-100px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-500/20 via-purple-700/10 to-transparent blur-3xl z-0 pointer-events-none"></div>

      {/* Content */}
      <div  className="relative z-10 max-w-2xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 ">
          The modern way to <br /> learn <span className="text-teal-400">Web Development</span>
        </h1>
        <p className="text-lg text-zinc-400 mb-8">
          Follow a structured roadmap. Watch videos. Earn badges. Unlock real-world projects.
        </p>
        <Button size="lg" className="rounded-full shadow-xl bg-teal-500 hover:bg-teal-400 text-black">
          Start Learning
        </Button>
      </div>
    </main>
  );
}
