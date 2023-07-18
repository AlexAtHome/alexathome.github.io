/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,md,webc}'],
	theme: {
		extend: {
			fontFamily: {
				sans: 'Sofia Sans, -apple-system, system-ui, sans-serif',
				mono: 'JetBrains Mono, monospace'
			},
			zIndex: {
				100: '100',
				'n1': '-1'
			},
			skew: {
				24: '24deg',
				32: '32deg',
			},
			animation: {
				'fade-in': 'fade .5s linear',
				'fade-out': 'fade .5s linear reverse'
			},
			keyframes: {
				fade: {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 },
				}
			}
		},
	},
	plugins: [require('@catppuccin/tailwindcss')],
}
