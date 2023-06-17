/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,hbs,md,ejs}'],
	theme: {
		extend: {
			fontFamily: {
				sans: 'Nunito, -apple-system, system-ui, sans-serif',
			},
			zIndex: {
				100: '100',
				'n1': '-1'
			},
		},
	},
	plugins: [require('@catppuccin/tailwindcss')],
}
