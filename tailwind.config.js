/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,hbs,md}'],
	theme: {
		extend: {
			fontFamily: {
				sans: 'Nunito, -apple-system, system-ui, sans-serif',
			},
			zIndex: {
				100: '100',
			},
		},
	},
	plugins: [require('@catppuccin/tailwindcss')],
}
