import './style.css'
import { registerSW } from 'virtual:sw-plugin'

if (location.pathname === '/') {
	import('./scripts/front-page.js')
}

registerSW('sw.js')
	.then(() => console.log('done'))
	.catch((error) => {
		console.error('Failed to register the service worker!', error)
	})
