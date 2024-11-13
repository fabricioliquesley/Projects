import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        base: {
          600: "#7085a4",
          500: "#87a1c6",
          400: "#9ebde8",
        },
        vibrant: {
          yellow: "#F4B400",
          green: "#4ADE80",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
