/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./ai_automatika_2026.html'],
  // Classes generated at runtime by the booking calendar (in <script>) — safelisted
  // so they survive even if the content scanner misses string literals.
  safelist: [
    'py-2',
    'rounded',
    'font-medium',
    'cursor-pointer',
    'bg-[var(--accent)]',
    'text-[var(--bg)]',
    'text-[var(--ink-4)]',
    'text-[var(--ink-2)]',
    'hover:bg-[var(--bg-alt)]',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
