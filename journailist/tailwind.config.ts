import type { Config } from "tailwindcss";

import flowbite from "flowbite-react/tailwind";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["var(--font-outfit)"],
      },
      colors: {
        "slate-primary": "#0f172a",
        "slate-secondary": "#64748B",
        "slate-tertiary": "#94a3b8",
        "slate-bg-primary": "#e2e8f0",
        "slate-bg-secondary": "#f1f5f9",
        "slate-bg-tertiary": "#f8fafc",
        "gray-border-primary": "#eaecf0",
        brand: "#2563eb",
        "brand-dark": "#1e3a8a",
        "brand-bg-primary": "#dbeafe",
        "brand-bg-secondary": "#eff6ff",
      },
    },
  },
  plugins: [flowbite.plugin()],
} satisfies Config;
