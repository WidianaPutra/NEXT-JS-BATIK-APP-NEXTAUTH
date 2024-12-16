import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        "custom-light": "0 0px 20px rgba(0, 0, 0, 0.1)", // Custom shadow ringan
        "custom-dark": "0 4px 15px rgba(0, 0, 0, 0.3)", // Custom shadow lebih gelap
        neon: "0 0 10px #00ffcc, 0 0 20px #00ffcc", // Shadow dengan efek neon
      },
    },
  },
  plugins: [],
} satisfies Config;
