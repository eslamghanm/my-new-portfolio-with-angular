/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        'bg-main': '#0b1220',
        'bg-elevated': '#0f172a',
        'text': '#e2e8f0',
        'text-muted': '#94a3b8',
        'accent': '#22c55e',
        'accent-strong': '#16a34a',
        'border': '#1f2937',
        'surface-hover': '#111827'
      }
    },
  },
  plugins: [],
}
