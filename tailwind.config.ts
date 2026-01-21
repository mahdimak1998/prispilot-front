
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'prispilot-blue': '#1E40AF',
        'prispilot-light-blue': '#3B82F6',
        'blue-hover': 'hsl(var(--blue-hover))',
        'blue-border-hover': 'hsl(var(--blue-border-hover))',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        "category-yellow": {
          DEFAULT: "hsl(var(--category-yellow))",
          dark: "hsl(var(--category-yellow-dark))",
          bg: "hsl(var(--category-yellow-bg))",
          "bg-dark": "hsl(var(--category-yellow-bg-dark))",
          border: "hsl(var(--category-yellow-border))",
          "border-dark": "hsl(var(--category-yellow-border-dark))",
        },
        "category-blue": {
          DEFAULT: "hsl(var(--category-blue))",
          dark: "hsl(var(--category-blue-dark))",
          bg: "hsl(var(--category-blue-bg))",
          "bg-dark": "hsl(var(--category-blue-bg-dark))",
          border: "hsl(var(--category-blue-border))",
          "border-dark": "hsl(var(--category-blue-border-dark))",
        },
        "category-green": {
          DEFAULT: "hsl(var(--category-green))",
          dark: "hsl(var(--category-green-dark))",
          bg: "hsl(var(--category-green-bg))",
          "bg-dark": "hsl(var(--category-green-bg-dark))",
          border: "hsl(var(--category-green-border))",
          "border-dark": "hsl(var(--category-green-border-dark))",
        },
        "category-purple": {
          DEFAULT: "hsl(var(--category-purple))",
          dark: "hsl(var(--category-purple-dark))",
          bg: "hsl(var(--category-purple-bg))",
          "bg-dark": "hsl(var(--category-purple-bg-dark))",
          border: "hsl(var(--category-purple-border))",
          "border-dark": "hsl(var(--category-purple-border-dark))",
        },
        "category-indigo": {
          DEFAULT: "hsl(var(--category-indigo))",
          dark: "hsl(var(--category-indigo-dark))",
          bg: "hsl(var(--category-indigo-bg))",
          "bg-dark": "hsl(var(--category-indigo-bg-dark))",
          border: "hsl(var(--category-indigo-border))",
          "border-dark": "hsl(var(--category-indigo-border-dark))",
        },
        "category-red": {
          DEFAULT: "hsl(var(--category-red))",
          dark: "hsl(var(--category-red-dark))",
          bg: "hsl(var(--category-red-bg))",
          "bg-dark": "hsl(var(--category-red-bg-dark))",
          border: "hsl(var(--category-red-border))",
          "border-dark": "hsl(var(--category-red-border-dark))",
        },
        "category-orange": {
          DEFAULT: "hsl(var(--category-orange))",
          dark: "hsl(var(--category-orange-dark))",
          bg: "hsl(var(--category-orange-bg))",
          "bg-dark": "hsl(var(--category-orange-bg-dark))",
          border: "hsl(var(--category-orange-border))",
          "border-dark": "hsl(var(--category-orange-border-dark))",
        },
        "category-amber": {
          DEFAULT: "hsl(var(--category-amber))",
          dark: "hsl(var(--category-amber-dark))",
          bg: "hsl(var(--category-amber-bg))",
          "bg-dark": "hsl(var(--category-amber-bg-dark))",
          border: "hsl(var(--category-amber-border))",
          "border-dark": "hsl(var(--category-amber-border-dark))",
        },
        "category-cyan": {
          DEFAULT: "hsl(var(--category-cyan))",
          dark: "hsl(var(--category-cyan-dark))",
          bg: "hsl(var(--category-cyan-bg))",
          "bg-dark": "hsl(var(--category-cyan-bg-dark))",
          border: "hsl(var(--category-cyan-border))",
          "border-dark": "hsl(var(--category-cyan-border-dark))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "scroll": {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-50%)",
          },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "paper-unfold": {
          "0%": {
            transform: "scale3d(0.95, 0.8, 1) translateY(-8px)",
            opacity: "0",
            transformOrigin: "top left"
          },
          "50%": {
            transform: "scale3d(1.02, 0.9, 1) translateY(-4px)",
            opacity: "0.7",
            transformOrigin: "top left"
          },
          "100%": {
            transform: "scale3d(1, 1, 1) translateY(0)",
            opacity: "1",
            transformOrigin: "top left"
          }
        },
        "paper-unfold-real": {
          "0%": {
            transform: "scaleX(0.1) scaleY(0.3) translateY(-20px)",
            opacity: "0",
            transformOrigin: "top left"
          },
          "30%": {
            transform: "scaleX(0.4) scaleY(0.6) translateY(-10px)",
            opacity: "0.3",
            transformOrigin: "top left"
          },
          "60%": {
            transform: "scaleX(0.8) scaleY(0.9) translateY(-2px)",
            opacity: "0.7",
            transformOrigin: "top left"
          },
          "100%": {
            transform: "scaleX(1) scaleY(1) translateY(0)",
            opacity: "1",
            transformOrigin: "top left"
          }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "scale-in": "scale-in 0.5s ease-out forwards",
        "pulse-slow": "pulse-slow 2s ease-in-out infinite",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "paper-unfold": "paper-unfold 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "paper-unfold-real": "paper-unfold-real 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
