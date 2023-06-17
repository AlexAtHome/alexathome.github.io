const pluginTailwind = require("@kevinnls/eleventy-plugin-tailwind");

module.exports = function (config) {
	config.addPlugin(pluginTailwind, {
    entry: "src/style.css",
    output: "_site/style.css",
    inputDir: "src"
  });

	return {
		dir: {
			input: 'src',
			output: '_site',
			// those are relative to the `input` directory
			layouts: '_layouts',
			includes: '_includes'
		}
	}
}
