/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Glory', 'sans-serif'],
      },
      colors: {
        // Use var(--...) without hsl(...) so hex variables work
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",

        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        
        // Custom palette for direct usage like bg-black-950, border-gold-500, etc.
        black: {
          '950': '#14141C',
          '900': '#1C1C26',
          '800': '#242430',
        },
        gold: {
          '200': '#FFE5B4',
          '400': '#FFD700',
          '500': '#D4AF37',
          '600': '#B8860B',
          '700': '#996515',
        },
        royal: {
          '200': '#4169E1',
          '400': '#2B4BA0',
          '500': '#1E3578',
          '600': '#152852',
          '700': '#0C1A3B',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "border-glow-good": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" }
        },
        "border-glow-bad": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" }
        },
        "border-glow-neutral": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "border-glow-good": "border-glow-good 2s ease-in-out infinite",
        "border-glow-bad": "border-glow-bad 2s ease-in-out infinite",
        "border-glow-neutral": "border-glow-neutral 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
