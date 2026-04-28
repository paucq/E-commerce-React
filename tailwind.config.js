/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        "cart-pop": {
          "0%": { transform: "scale(1)", boxShadow: "0 0 0 rgba(31, 107, 255, 0)" },
          "40%": {
            transform: "scale(0.92)",
            boxShadow: "0 0 0 6px rgba(31, 107, 255, 0.15)",
          },
          "70%": {
            transform: "scale(1.08)",
            boxShadow: "0 0 0 10px rgba(31, 107, 255, 0.2)",
          },
          "100%": { transform: "scale(1)", boxShadow: "0 0 0 rgba(31, 107, 255, 0)" },
        },
      },
      animation: {
        "cart-pop": "cart-pop 0.32s ease-out",
      },
      colors: {
        tech: {
          ink: "var(--tech-ink)",
          "ink-soft": "var(--tech-ink-soft)",
          muted: "var(--tech-muted)",
          border: "var(--tech-border)",
          surface: "var(--tech-surface)",
          "surface-soft": "var(--tech-surface-soft)",
          "surface-glow": "var(--tech-surface-glow)",
          primary: "var(--tech-primary)",
          "primary-strong": "var(--tech-primary-strong)",
          accent: "var(--tech-accent)",
          "accent-strong": "var(--tech-accent-strong)",
          highlight: "var(--tech-highlight)",
          "highlight-strong": "var(--tech-highlight-strong)",
          danger: "var(--tech-danger)",
          warning: "var(--tech-warning)",
        },
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "system-ui", "-apple-system", "sans-serif"],
        display: ["Sora", "IBM Plex Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 25px 60px -40px rgba(31, 107, 255, 0.6)",
        pop: "0 18px 45px -35px rgba(143, 92, 255, 0.8)",
      },
      backgroundImage: {
        "tech-hero":
          "radial-gradient(circle at top left, rgba(31, 107, 255, 0.16), transparent 55%), radial-gradient(circle at bottom right, rgba(143, 92, 255, 0.2), transparent 60%)",
      },
    },
  },
  plugins: [],
};
