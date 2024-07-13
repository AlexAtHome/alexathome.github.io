/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{md,webc,liquid,css}'],
	theme: {
		extend: {
			colors: {
				accent: {
					50: 'oklch(0.988 0.2 var(--accent-hue) / <alpha-value>)',
					100: 'oklch(0.966 0.2 var(--accent-hue) / <alpha-value>)',
					200: 'oklch(0.922 0.2 var(--accent-hue) / <alpha-value>)',
					300: 'oklch(0.859 0.2 var(--accent-hue) / <alpha-value>)',
					400: 'oklch(0.798 0.2 var(--accent-hue) / <alpha-value>)',
					500: 'oklch(0.738 0.2 var(--accent-hue) / <alpha-value>)',
					600: 'oklch(0.625 0.2 var(--accent-hue) / <alpha-value>)',
					700: 'oklch(0.533 0.2 var(--accent-hue) / <alpha-value>)',
					800: 'oklch(0.418 0.2 var(--accent-hue) / <alpha-value>)',
					900: 'oklch(0.306 0.2 var(--accent-hue) / <alpha-value>)',
					950: 'oklch(0.195 0.2 var(--accent-hue) / <alpha-value>)',
				},
			},
			screens: {
				'3xl': '1750px',
				'4xl': '2000px',
			},
			fontFamily: {
				heading: 'Wix Madefor Display, -apple-system, system-ui, sans-serif',
				sans: 'Lexend, Jost, -apple-system, system-ui, sans-serif',
				mono: 'JetBrains Mono NF, JetBrains Mono, monospace',
			},
			zIndex: {
				100: '100',
				n1: '-1',
			},
			skew: {
				24: '24deg',
				32: '32deg',
			},
			animation: {
				'fade-in': 'fade .5s linear',
				'fade-out': 'fade .5s linear reverse',
			},
			keyframes: {
				fade: {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 },
				},
			},
		},
	},
}
