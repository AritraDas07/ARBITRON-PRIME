/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        arbitron: {
          cyan: '#00FFFF',
          neon: '#39FF14',
          magenta: '#FF00FF',
          electric: '#00D4FF',
          purple: '#8A2BE2',
          gold: '#FFD700',
          crimson: '#DC143C',
          lime: '#32CD32',
        },
        cyber: {
          blue: '#0080FF',
          pink: '#FF1493',
          green: '#00FF7F',
          orange: '#FF4500',
          violet: '#9400D3',
          yellow: '#FFFF00',
        },
      },
      fontFamily: {
        'rajdhani': ['Rajdhani', 'sans-serif'],
        'orbitron': ['Orbitron', 'monospace'],
        'jetbrains': ['JetBrains Mono', 'monospace'],
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '0.5': '0.125rem',
        '1.5': '0.375rem',
        '2.5': '0.625rem',
        '3.5': '0.875rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'quantum': 'quantum 4s ease-in-out infinite',
        'neural': 'neural 3s linear infinite',
        'hologram': 'hologram 8s ease-in-out infinite',
        'matrix': 'matrix 10s linear infinite',
        'cyber-pulse': 'cyber-pulse 2s ease-in-out infinite',
        'neon-flicker': 'neon-flicker 1.5s ease-in-out infinite',
        'data-flow': 'data-flow 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #00FFFF, 0 0 10px #00FFFF, 0 0 15px #00FFFF' },
          '100%': { boxShadow: '0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF' },
        },
        quantum: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '0.8' },
          '50%': { transform: 'scale(1.2) rotate(180deg)', opacity: '1' },
        },
        neural: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        hologram: {
          '0%, 100%': { 
            transform: 'translateZ(0) rotateX(0deg) rotateY(0deg)',
            filter: 'hue-rotate(0deg)'
          },
          '25%': { 
            transform: 'translateZ(30px) rotateX(15deg) rotateY(90deg)',
            filter: 'hue-rotate(90deg)'
          },
          '50%': { 
            transform: 'translateZ(0) rotateX(0deg) rotateY(180deg)',
            filter: 'hue-rotate(180deg)'
          },
          '75%': { 
            transform: 'translateZ(-30px) rotateX(-15deg) rotateY(270deg)',
            filter: 'hue-rotate(270deg)'
          },
        },
        matrix: {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'cyber-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 5px #00FFFF, 0 0 10px #FF00FF, 0 0 15px #39FF14',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 20px #00FFFF, 0 0 30px #FF00FF, 0 0 40px #39FF14',
            transform: 'scale(1.05)'
          },
        },
        'neon-flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
          '75%': { opacity: '0.9' },
        },
        'data-flow': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(45deg, #00FFFF, #FF00FF, #39FF14)',
        'neural-pattern': 'radial-gradient(circle at 25% 25%, #00FFFF 0%, transparent 50%), radial-gradient(circle at 75% 75%, #FF00FF 0%, transparent 50%)',
        'holographic': 'linear-gradient(45deg, #00FFFF 0%, #8A2BE2 25%, #FF00FF 50%, #39FF14 75%, #00FFFF 100%)',
        'matrix-rain': 'linear-gradient(180deg, transparent 0%, #39FF14 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
};