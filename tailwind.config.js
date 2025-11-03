/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  important: true,
  theme: {
    extend: {
      // Custom CSS variables for theming
      textColor: {
        me: {
          primary: "var(--color-primary)",
          accent: "var(--color-accent)",
          base: "var(--color-base)",
          light: "var(--color-light)",
          inverted: "var(--color-inverted)",
          secondary: "var(--color-secondary)",
          tertiary: "var(--color-tertiary)",
          success: "var(--color-success)",
          warning: "var(--color-warning)",
          danger: "var(--color-danger)",
        },
      },
      backgroundColor: {
        me: {
          primary: "var(--color-primary)",
          accent: "var(--color-accent)",
          base: "var(--color-base)",
          light: "var(--color-light)",
          inverted: "var(--color-inverted)",
          secondary: "var(--color-secondary)",
          tertiary: "var(--color-tertiary)",
          success: "var(--color-success)",
          warning: "var(--color-warning)",
          danger: "var(--color-danger)",
          glass: "var(--glass-bg)",
          'bg-left': "var(--color-bg-left)",
          'bg-right': "var(--color-bg-right)",
        },
      },
      borderColor: {
        me: {
          primary: "var(--color-primary)",
          accent: "var(--color-accent)",
          base: "var(--color-base)",
          light: "var(--color-light)",
          inverted: "var(--color-inverted)",
          secondary: "var(--color-secondary)",
          tertiary: "var(--color-tertiary)",
          glass: "var(--glass-border)",
        },
      },
      boxShadowColor: {
        me: {
          primary: "var(--color-primary)",
          accent: "var(--color-accent)",
          base: "var(--color-base)",
          light: "var(--color-light)",
          inverted: "var(--color-inverted)",
          secondary: "var(--color-secondary)",
          tertiary: "var(--color-tertiary)",
          glow: "var(--glow-primary)",
          'glow-secondary': "var(--glow-secondary)",
        },
      },
      // Enhanced typography
      fontFamily: {
        sans: [
          "'Inter'", 
          "'Open Sans'", 
          "-apple-system", 
          "BlinkMacSystemFont", 
          "'Segoe UI'", 
          "Roboto", 
          "sans-serif"
        ],
        lora: ["'Lora'", "serif"],
        mono: [
          "'JetBrains Mono'", 
          "'Fira Code'", 
          "'Cascadia Code'", 
          "'Source Code Pro'", 
          "monospace"
        ],
        display: [
          "'Cal Sans'", 
          "'Inter'", 
          "sans-serif"
        ],
      },
      // Enhanced spacing and sizing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      // Custom animations and transitions
      animation: {
        'gradient-shift': 'gradientShift 15s ease infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite alternate',
        'neon-flicker': 'neonFlicker 2s ease-in-out infinite alternate',
        'border-pulse': 'borderPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'rotate-slow': 'rotate 4s linear infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'blink-caret': 'blink-caret 0.75s step-end infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      // Custom keyframes
      keyframes: {
        gradientShift: {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
        pulseGlow: {
          'from': { opacity: '0.1' },
          'to': { opacity: '0.3' },
        },
        neonFlicker: {
          '0%, 100%': { 
            'text-shadow': '0 0 5px var(--color-primary), 0 0 10px var(--color-primary), 0 0 15px var(--color-primary)' 
          },
          '50%': { 
            'text-shadow': '0 0 2px var(--color-primary), 0 0 5px var(--color-primary), 0 0 8px var(--color-primary)' 
          },
        },
        borderPulse: {
          '0%, 100%': { 
            'box-shadow': '0 0 10px var(--glow-primary), inset 0 0 10px var(--glow-primary)' 
          },
          '50%': { 
            'box-shadow': '0 0 20px var(--glow-primary), inset 0 0 20px var(--glow-primary)' 
          },
        },
        rotate: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          'from': { transform: 'translateY(100%)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          'from': { transform: 'translateY(-100%)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        scaleIn: {
          'from': { transform: 'scale(0.9)', opacity: '0' },
          'to': { transform: 'scale(1)', opacity: '1' },
        },
      },
      // Enhanced shadows
      boxShadow: {
        'glow': '0 0 20px var(--glow-primary)',
        'glow-lg': '0 0 40px var(--glow-primary)',
        'glow-secondary': '0 0 20px var(--glow-secondary)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'glass-hover': '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 20px var(--glow-primary), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'neon': '0 0 10px var(--glow-primary), inset 0 0 10px var(--glow-primary)',
        'neon-lg': '0 0 30px var(--glow-primary), inset 0 0 20px var(--glow-primary)',
        'card-hover': '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px var(--glow-primary)',
      },
      // Enhanced gradients
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
        'gradient-glass': 'linear-gradient(135deg, var(--glass-bg), rgba(255, 255, 255, 0.1))',
        'mesh-gradient': `
          radial-gradient(at 40% 20%, var(--glow-primary) 0px, transparent 50%),
          radial-gradient(at 80% 0%, var(--glow-secondary) 0px, transparent 50%),
          radial-gradient(at 0% 50%, var(--color-primary) 0px, transparent 50%)
        `,
      },
      // Enhanced blur effects
      backdropBlur: {
        'xs': '2px',
        '4xl': '72px',
      },
      // Custom border radius
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      // Enhanced z-index scale
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      // Custom aspect ratios
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '9/16': '9 / 16',
      },
      // Enhanced transitions
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'swift': 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
      // Custom transform scales
      scale: {
        '102': '1.02',
        '103': '1.03',
        '98': '0.98',
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    // Custom plugin for theme utilities
    function({ addUtilities, theme }) {
      const newUtilities = {
        // Glass effect utilities
        '.glass': {
          'background': 'var(--glass-bg)',
          'backdrop-filter': 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
          'border': '1px solid var(--glass-border)',
          'box-shadow': '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        },
        // Neon glow utilities
        '.neon-glow': {
          'text-shadow': '0 0 5px var(--color-primary), 0 0 10px var(--color-primary), 0 0 15px var(--color-primary), 0 0 20px var(--color-primary)',
        },
        '.neon-border': {
          'border': '2px solid var(--color-primary)',
          'box-shadow': '0 0 10px var(--glow-primary), inset 0 0 10px var(--glow-primary)',
        },
        // Text gradient utilities
        '.text-gradient': {
          'background': 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        // Interactive hover utilities
        '.hover-glow': {
          'transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            'box-shadow': '0 0 20px var(--glow-primary)',
            'transform': 'translateY(-2px)',
          },
        },
        '.hover-lift': {
          'transition': 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            'transform': 'translateY(-4px) scale(1.02)',
          },
        },
        // Background utilities
        '.bg-mesh': {
          'background': `
            radial-gradient(at 40% 20%, var(--glow-primary) 0px, transparent 50%),
            radial-gradient(at 80% 0%, var(--glow-secondary) 0px, transparent 50%),
            radial-gradient(at 0% 50%, var(--color-primary) 0px, transparent 50%)
          `,
          'opacity': '0.1',
        },
      };
      
      addUtilities(newUtilities);
    },
  ],
};