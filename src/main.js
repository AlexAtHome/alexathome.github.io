import './style.css'
import { registerSW } from 'virtual:sw-plugin'

if (location.pathname === '/') {
	import('./scripts/front-page.js')
}

registerSW('sw.js')
	.then((registration) => {
		registration.addEventListener('updatefound', () => {
			const updatedWorker = registration.installing
			updatedWorker.addEventListener('statechange', () => {
				if (updatedWorker.state === 'installed' && !!navigator.serviceWorker.controller) {
					location.reload()
				}
			}, { once: true })
		}, { once: true })
	})
	.catch((error) => {
		console.error('Failed to register the service worker!', error)
	})
