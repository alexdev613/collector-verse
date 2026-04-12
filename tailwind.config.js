/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0f172a", // zinc/blue dark
        surface: "#1e293b",
        card: "#334155",

        primary: "#6366f1", // indigo
        secondary: "#22c55e", // green (status, sucesso)

        accent: "#eab308", // dourado (raridade 👀)

        text: {
          DEFAULT: "#e2e8f0",
          muted: "#94a3b8",
        },

        border: "#475569",
      },
      minHeight: {
        "screen-minus-header-and-footer": "calc(100vh - 224px)",
      },
      keyframes: {
        loading: {
          to: { transform: "rotate(360deg)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        loading: "loading 1.2s linear infinite",
        "fade-in": "fadeIn 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
