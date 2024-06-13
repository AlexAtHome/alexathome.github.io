const path = require('node:path')
const fs = require('node:fs');
const markdownIt = require('markdown-it')
const markdownItEleventyImg = require('markdown-it-eleventy-img')
const { DateTime } = require("luxon");

const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const pluginPWA = require('@pkvach/eleventy-plugin-pwa')

module.exports = function (config) {
	// Plugins
	config.setLiquidOptions({
		jsTruthy: true,
	});
	config.addPlugin(pluginPWA, { swDest: './_site/sw.js' })
	config.addPlugin(syntaxHighlight)

	config.addShortcode("bsicon", (name, className) => {
		const content = fs.readFileSync(path.resolve('node_modules', 'bootstrap-icons', 'icons', `${name}.svg`), { encoding: 'utf8' });
		return `<span class="bs-icon ${className ?? ''}" aria-hidden="true">${content}</span>`
	})

	config.addShortcode("timestamp", (value, format = 'DD') => {
		const dt =
			value instanceof Date
				? DateTime.fromJSDate(value, { zone: "utc" })
				: DateTime.fromISO(value);

		const datetime = dt.toFormat("yyyy-LL-dd");
		const display = dt.toFormat(format);

		return `<time datetime="${datetime}">${display}</time>`;
	})

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
	config.addLayoutAlias('root', 'root.liquid')
	config.addLayoutAlias('blog', 'blog.liquid')
	config.addLayoutAlias('posts', 'posts.liquid')

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
