import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366f1",
          hover: "#4f46e5",
        },
        secondary: {
          DEFAULT: "#ec4899",
        },
        "background-app": "#0f172a",
        surface: {
          DEFAULT: "#1e293b",
          hover: "#334155",
        },
        "text-main": "#f8fafc",
        "text-muted": "#94a3b8",
        success: "#22c55e",
        error: "#ef4444",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
