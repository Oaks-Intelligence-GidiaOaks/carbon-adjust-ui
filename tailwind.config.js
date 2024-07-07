/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    screens: {
      xs: "280px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      max: "1440px",
      ds: { min: "280px", max: "600px" },
    },
    extend: {
      fontFamily: {
        sans: ['"Lato"', "sans-serif"],
        "open-sans": ['"Open Sans"', "sans-serif"],
        manrope: ['"Manrope"', "sans-serif"],
        poppins: ['"Poppins"', "sans-serif"],
        inter: ["Inter", "sans-serif"],
        "dm-sans": ["DM Sans", "sans-serif"],
      },
      backgroundImage: {
        "register-image": "url('/assets/graphics/register-graphic.svg')",
        "account-setup-image":
          "url('/assets/graphics/account-setup-graphic.svg')",
        "hero-bg": "url('/assets/graphics/hero-bg.svg')",
      },
      colors: {
        "light-green": "#1BAF9E",
        "light-blue": "#D0DDFF",
        "ca-blue": "#2196F3",
        "ca-blue-dark": "#4688E9",
        "dark-blue": "#5F41B2",
        main: "#495057",
        "ca-red": "#EF1E1E",
        "ca-green": "#8AC926",
        "sub-header": "#143B76",
        "icon-green": "#36978D",
        scheme: {
          white: "hsla(0, 1%, 88%, 1)",
        },
        blue: {
          main: "#139EEC",
          secondary: "#3465AF",
          dark: "hsla(224, 76%, 18%, 1)",
          light: "#E8F3FC",
        },
        black: {
          main: "hsl(210,9%,31%) !important",
        },
        "hover-color": "hsla(202,85%,50%,0.2)",
        glass: "#F1F5F8",
        "grey-swatch": {
          100: "#F8F9FA",
          200: "#F9FAFB",
          300: "#F2F4F7",
          400: "#EAECF0",
          500: "#D0D5DD",
          600: "#9BA3AF",
          700: "#667085",
          800: "#475467",
          900: "#343D54",
          110: "#141518",
        },
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
      },
      backgroundImage: {
        "gradient-text": "linear-gradient(to right, #2E599A 0%, #0B8DFF 100%)",
        "custom-radial": "radial-gradient(at 0 0, #1944B7, #0B1E51)",
      },
      backgroundClip: {
        text: "text",
      },
      textFillColor: {
        transparent: "transparent",
      },
      textColor: {
        "ca-blue": "#2196F3",
        "ca-cyan": "#139EEC",
        main: "#495057",
        "sub-header": "#143B76",
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
        slideDownAndFade: {
          from: { opacity: "0", transform: "translateY(-2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: "0", transform: "translateX(2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideUpAndFade: {
          from: { opacity: "0", transform: "translateY(2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: "0", transform: "translateX(-2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        slideDownAndFade:
          "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade:
          "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        "spin-slow": "spin 15s linear infinite",
      },
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        lg: "1124px",
        xl: "1124px",
        "2xl": "1440px",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
