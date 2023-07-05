const EleventyVitePlugin = require('@11ty/eleventy-plugin-vite')
const markdownIt = require('markdown-it')
const path = require('node:path')
const faviconsPlugin = require('eleventy-plugin-gen-favicons')
const eleventyTargetSafe = require('eleventy-plugin-target-safe')
const markdownItEleventyImg = require('markdown-it-eleventy-img')
const lazyloadPlugin = require('eleventy-plugin-lazyload')
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (config) {
	config.addPlugin(EleventyVitePlugin, {
		tempFolderName: '.11ty-vite',
		viteOptions: {
			plugins: [],
		},
	})
	config.addPlugin(faviconsPlugin)
	config.addPlugin(syntaxHighlight)
	config.addPlugin(eleventyTargetSafe, {
		opener: true,
		follower: true,
		referrer: true,
	})
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
	config.addPlugin(lazyloadPlugin)

	config.addCollection('postlist', (api) => api.getFilteredByTag('post').reverse())
	config.addCollection('linuxlist', (api) => api.getFilteredByTag('linux').reverse())
	config.setFrontMatterParsingOptions({
		excerpt: true,
		excerpt_separator: '<!-- excerpt -->',
	})
	config.addPassthroughCopy('src/assets/images')
	config.addPassthroughCopy({
		'node_modules/prism-themes/themes/prism-one-dark.css': 'assets/one-dark.css',
		'node_modules/prism-themes/themes/prism-one-light.css': 'assets/one-light.css',
		'node_modules/bootstrap-icons/bootstrap-icons.svg': 'assets/icons/bootstrap.svg',
		'src/icons': 'assets/icons',
		'src/scripts': 'scripts',
	})
	config.addWatchTarget('src/style.css')
	config.addWatchTarget('src/main.js')
	config.addWatchTarget('src/images')
	config.addPassthroughCopy('src/images')
	config.addPassthroughCopy('src/main.js')
	config.addPassthroughCopy('src/style.css')
	config.addWatchTarget('tailwind.config.js')

	config.addLayoutAlias('root', 'root.liquid')
	config.addLayoutAlias('blog', 'blog.liquid')
	config.addLayoutAlias('posts', 'posts.liquid')

	config.addShortcode('githubUrl', () => 'https://github.com/AlexAtHome')
	config.addShortcode('pfp', () => '/images/pfp.png')

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
