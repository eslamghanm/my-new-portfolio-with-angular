/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        'bg-main': 'var(--bg-main)',
        'bg-elevated': 'var(--bg-elevated)',
        'bg-surface': 'var(--bg-surface)',
        'text': 'var(--text)',
        'text-muted': 'var(--text-muted)',
        'accent': 'var(--accent)',
        'accent-strong': 'var(--accent-strong)',
        'border': 'var(--border)',
        'surface-hover': 'var(--surface-hover)'
      }
    },
  },
  plugins: [],
}
