module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "heading-h2": "var(--heading-h2-font-family)",
        "heading-h4": "var(--heading-h4-font-family)",
        "heading-tagline": "var(--heading-tagline-font-family)",
        "text-medium-normal": "var(--text-medium-normal-font-family)",
        "text-regular-normal": "var(--text-regular-normal-font-family)",
        "text-regular-semi-bold": "var(--text-regular-semi-bold-font-family)",
        "text-small-link": "var(--text-small-link-font-family)",
        "text-small-normal": "var(--text-small-normal-font-family)",
        "text-tiny-normal": "var(--text-tiny-normal-font-family)",
        "alex-brush": ["Alex Brush", "cursive"],
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      fontSize: {
        lg: ["16px", { lineHeight: "24px" }],
        "5xl": ["32px", { lineHeight: "40px" }],

      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        other: {
          DEFAULT: "var(--p)"
        },
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.hero-bg': {
          'background': "linear-gradient(0deg,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.5) 100%), url('/images/home_page/hero.jpg')",
          'background-position': 'center',
          'background-size': 'cover',
          'background-repeat': 'no-repeat'
        },
        '.why-choose-us-bg': {
          'background': "linear-gradient(0deg,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.5) 100%), url('/images/home_page/why_choose_us.jpg')",
          'background-position': 'center',
          'background-size': 'cover',
          'background-repeat': 'no-repeat'
        },
        '.call-to-action-bg': {
          'background': "linear-gradient(0deg,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.5) 100%), url('/images/home_page/newsletter.jpg')",
          'background-position': 'center',
          'background-size': 'cover',
          'background-repeat': 'no-repeat'
        },
        '.bg-services-header': {
          'background': "linear-gradient(0deg,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.5) 100%), url('/images/services_page/hero.jpg')",
          'background-position': 'center',
          'background-size': 'cover',
          'background-repeat': 'no-repeat'
        },
        '.bg-services-call-to-action': {
          'background': "linear-gradient(0deg,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.5) 100%), url('/images/services_page/newsletter.jpg')",
          'background-position': 'center',
          'background-size': 'cover',
          'background-repeat': 'no-repeat'
        },
        '.bg-linear-black-transparent': {
          'background': "linear-gradient(0deg,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.5) 100%)",
          'background-position': 'center',
          'background-size': 'cover',
          'background-repeat': 'no-repeat'
        },
        '.pd-default': {
          'padding-left': "var(--pdl)",
          'padding-right': "var(--pdr)",
        },
        '.py-default': {
          'padding-top': "64px",
          'padding-bottom': "64px"
        },
        '@screen sm': {
          '.text-lg': {
            'font-size': '18px',
            'line-height': '28px'
          },
          '.text-5xl': {
            'font-size': '48px',
            'line-height': '1'
          },
          '.py-default': {
            'padding-top': "7em",
            'padding-bottom': "7em"
          }
        }
      })
    }
  ],
  darkMode: ["class"],
};