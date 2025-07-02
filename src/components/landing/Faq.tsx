import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

interface Faq1Props {
  heading?: string;
  items?: FaqItem[];
}

const defaultItems: FaqItem[] = [
  {
    question: "What even is CurlyBrackets?",
    answer:
      "CurlyBrackets is your geeky best friend on the internet who actually knows how to code. We help you go from “What is HTML?” to “Look, I built a React app!” — one step at a time.",
  },
  {
    question: "Do I need to be a genius to start?",
    answer:
      "Nope. If you can open a browser and follow a video, you’re good. We start at zero — no fancy CS degree required.",
  },
  {
    question: "How much does this cost me?",
    answer:
      "Right now? Zero rupees. Nada. Free. Learn without burning your wallet. Some advanced stuff might be premium later, but the essentials are totally free.",
  },
  {
    question: "Why not just binge YouTube tutorials?",
    answer:
      "Ever watched 10 tutorials and still felt confused? Yeah. We fix that. CurlyBrackets gives you a clear roadmap, tracks your progress, and unlocks actual projects as you learn. Less guesswork, more building.",
  },
  {
    question: "What’s the deal with badges and unlocks?",
    answer:
      "Think of them as XP and side quests. Complete modules → earn badges → unlock real projects → brag to your friends (and employers).",
  },
  {
    question: "What if I forget where I left off?",
    answer:
      "We gotchu. Your progress is saved automatically, like a smart bookmark. Close the tab, come back next week, pick up right where you left off.",
  },
  {
    question: "Is there really an AI buddy coming?",
    answer:
      "Yes! Soon you'll be able to ask coding questions mid-lesson, and the AI assistant will answer like a helpful, slightly nerdy tutor. Zero distractions, maximum learning.",
  },
  {
    question: "Can I use this on my phone too?",
    answer:
      "Absolutely. Whether you're on your laptop or chilling with your phone, your journey continues — synced and smooth.",
  },
];

const Faq = ({
  heading = "Frequently asked questions",
  items = defaultItems,
}: Faq1Props) => {
  return (
    <section id="faq" className="relative z-10 py-16 md:py-32 bg-black font-mono text-white">
      <div className="container mx-auto max-w-3xl px-6">
        <h1 className="mb-8 text-3xl font-semibold text-white md:mb-11 md:text-4xl">
          {heading}
        </h1>
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-border">
              <AccordionTrigger className="font-semibold text-white hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export { Faq };
