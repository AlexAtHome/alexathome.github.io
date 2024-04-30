const path = require('node:path')
const markdownIt = require('markdown-it')
const markdownItEleventyImg = require('markdown-it-eleventy-img')

const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const pluginWebc = require('@11ty/eleventy-plugin-webc')
const pluginPWA = require('@pkvach/eleventy-plugin-pwa')

module.exports = function (config) {
	// Plugins
	config.addPlugin(pluginPWA, { swDest: './_site/sw.js' })
	config.addPlugin(pluginWebc, { components: 'src/_components/**/*.webc' })
	config.addPlugin(syntaxHighlight)

	// Libraries
	config.setLibrary(
		'md',
		markdownIt({
			html: true,
			breaks: true,
			linkify: false,
		}).use(markdownItEleventyImg, {
			imgOptions: {
				widths: [2400, 1200, 800],
				urlPath: '/images/',
				outputDir: path.join('_site', 'images'),
				formats: ['avif', 'webp', 'png'],
			},
			globalAttributes: {
				class: 'markdown-image',
				decoding: 'async',
				loading: 'lazy',
				sizes: '100vw',
			},
		})
	)

	// Collections
	config.addCollection('postlist', (api) => api.getFilteredByTag('post').reverse())
	config.addCollection('linuxlist', (api) => api.getFilteredByTag('linux').reverse())

	// Filters
	config.addFilter('hostname', (url) => new URL(url).hostname.replace('www.', ''))

	// Frontmatter options
	config.setFrontMatterParsingOptions({
		excerpt: true,
		excerpt_separator: '<!-- excerpt -->',
	})

	// Passthrough copies
	config.setServerPassthroughCopyBehavior('passthrough')
	config.addPassthroughCopy({
		'src/icons': 'assets/icons',
		'node_modules/bootstrap-icons/bootstrap-icons.svg': 'assets/icons/bootstrap.svg',
		'node_modules/prism-themes/themes/prism-duotone-dark.css': 'assets/styles/prism-dark.css',
		'node_modules/prism-themes/themes/prism-vs.css': 'assets/styles/prism-light.css',
	})
	config.addPassthroughCopy('src/images')
	config.addPassthroughCopy('src/main.js')
	config.addPassthroughCopy('src/fonts')

	// Watch targets
	config.addWatchTarget('tailwind.config.js')
	config.addWatchTarget('src')
	config.addWatchTarget('_site/style.css')

	// Layout aliases
	config.addLayoutAlias('root', 'root.webc')
	config.addLayoutAlias('blog', 'blog.webc')
	config.addLayoutAlias('posts', 'posts.webc')

	// Global data
	config.addGlobalData('githubUrl', 'https://github.com/AlexAtHome/website')

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
