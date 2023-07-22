const EleventyVitePlugin = require('@11ty/eleventy-plugin-vite')
const { EleventyRenderPlugin } = require('@11ty/eleventy')
const markdownIt = require('markdown-it')
const path = require('node:path')
const faviconsPlugin = require('eleventy-plugin-gen-favicons')
const eleventyTargetSafe = require('eleventy-plugin-target-safe')
const markdownItEleventyImg = require('markdown-it-eleventy-img')
const lazyloadPlugin = require('eleventy-plugin-lazyload')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const eleventyHTMLValidate = require('eleventy-plugin-html-validate')
const pluginWebc = require('@11ty/eleventy-plugin-webc')
const eleventyGoogleFonts = require("eleventy-google-fonts");

module.exports = function (config) {
	// Plugins
	config.addPlugin(EleventyVitePlugin, {
		tempFolderName: '.11ty-vite',
		viteOptions: {
			plugins: [],
		},
	})
	config.addPlugin(pluginWebc, { components: 'src/_components/**/*.webc' })
	config.addPlugin(EleventyRenderPlugin)
	config.addPlugin(faviconsPlugin)
	config.addPlugin(syntaxHighlight)
	config.addPlugin(eleventyTargetSafe, {
		opener: true,
		follower: true,
		referrer: true,
	})
	config.addPlugin(lazyloadPlugin)
	config.addPlugin(eleventyHTMLValidate)
  config.addPlugin(eleventyGoogleFonts);

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
				sizes: '100vw',
			},
		})
	)

	// Collections
	config.addCollection('postlist', (api) => api.getFilteredByTag('post').reverse())
	config.addCollection('linuxlist', (api) => api.getFilteredByTag('linux').reverse())

	// Filters
	config.addFilter('hostname', url => new URL(url).hostname.replace('www.', ''));

	// Frontmatter options
	config.setFrontMatterParsingOptions({
		excerpt: true,
		excerpt_separator: '<!-- excerpt -->',
	})

	// Passthrough copies
	config.addPassthroughCopy({
		'src/icons': 'assets/icons',
		'src/scripts': 'scripts',
	})
	config.addPassthroughCopy('src/images')
	config.addPassthroughCopy('src/main.js')
	config.addPassthroughCopy('src/style.css')

	// Watch targets
	config.addWatchTarget('tailwind.config.js')
	config.addWatchTarget('src/style.css')
	config.addWatchTarget('src/main.js')
	config.addWatchTarget('src/images')
	config.addWatchTarget('src/_components')

	// Layout aliases
	config.addLayoutAlias('root', 'root.webc')
	config.addLayoutAlias('blog', 'blog.webc')
	config.addLayoutAlias('posts', 'posts.webc')

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
