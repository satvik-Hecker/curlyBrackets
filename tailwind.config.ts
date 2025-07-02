import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        geist: ["var(--font-geist-sans)"],
        geistMono: ["var(--font-geist-mono)"],
        castoro: ["var(--font-castoro)"],
      },
    },
    colors:{
      background:"hsl(var(--background))",
    }
  },
  plugins: [],
};

export default config;
