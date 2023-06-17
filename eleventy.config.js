const pluginTailwind = require('@kevinnls/eleventy-plugin-tailwind')

module.exports = function (config) {
	config.addPlugin(pluginTailwind, {
		entry: 'src/style.css',
		output: '_site/assets/style.css',
		inputDir: 'src',
	})
	config.addPassthroughCopy('src/assets/images')
	config.addPassthroughCopy({
		'node_modules/bootstrap-icons/bootstrap-icons.svg': 'assets/icons/bootstrap.svg',
		'src/icons': 'assets/icons',
	})
	config.addWatchTarget('src/style.css')
	config.addWatchTarget('tailwind.config.js')

	return {
		dir: {
			input: 'src',
			output: '_site',
			// those are relative to the `input` directory
			layouts: '_layouts',
			includes: '_includes',
		},
	}
}
