import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        ascent: "hsl(var(--ascent))",
        "ascent-foreground": "hsl(var(--ascent-foreground))",
      },
      borderColor: {
        DEFAULT: "hsl(var(--border))"
      }
    },
  },
  plugins: [],
}
export default config
