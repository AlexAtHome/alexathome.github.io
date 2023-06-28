const markdownIt = require('markdown-it')

module.exports = function (config) {
	config.addPlugin(require('@11ty/eleventy-plugin-vite'), {
		plugins: [],
	})
	config.setLibrary(
		'md',
		markdownIt({
			html: true,
			breaks: true,
			linkify: false,
		})
	)
	config.addCollection('postlist', (api) => api.getFilteredByTag('post').reverse())
	config.addCollection('linuxlist', (api) => api.getFilteredByTag('linux').reverse())
	config.amendLibrary('md', (mdLib) => mdLib.use(require('markdown-it-highlightjs')))
	config.setFrontMatterParsingOptions({
		excerpt: true,
		excerpt_separator: '<!-- excerpt -->',
	})
	config.addPassthroughCopy('src/assets/images')
	config.addPassthroughCopy({
		'node_modules/bootstrap-icons/bootstrap-icons.svg': 'assets/icons/bootstrap.svg',
		'node_modules/highlight.js/styles/github-dark.css': 'assets/github-dark.css',
		'node_modules/highlight.js/styles/github.css': 'assets/github.css',
		'src/icons': 'assets/icons',
	})
	config.addWatchTarget('src/style.css')
	config.addWatchTarget('src/main.js')
	config.addWatchTarget('src/images')
	config.addPassthroughCopy('src/images')
	config.addPassthroughCopy('src/main.js')
	config.addPassthroughCopy('src/style.css')
	config.addWatchTarget('tailwind.config.js')

	config.addLayoutAlias('root', 'root.hbs')
	config.addLayoutAlias('blog', 'blog.hbs')
	config.addLayoutAlias('posts', 'posts.liquid')

	config.addShortcode('githubUrl', () => 'https://github.com/AlexAtHome')

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
