const VER = '%SW_VERSION%'

const addResourcesToCache = async (resources) => {
	const cache = await caches.open(VER)
	await cache.addAll(resources)
}

const putInCache = async (request, response) => {
	const cache = await caches.open(VER)
	await cache.put(request, response)
}

const deleteOldCaches = async () => {
	const keyList = await caches.keys()
	const cachesToDelete = keyList.filter((key) => key !== VER)
	await Promise.all(cachesToDelete.map(caches.delete))
}

const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
	const responseFromCache = await caches.match(request)
	if (responseFromCache) {
		return responseFromCache
	}

	const preloadResponse = await preloadResponsePromise
	if (preloadResponse) {
		putInCache(request, preloadResponse.clone())
		return preloadResponse
	}

	try {
		const responseFromNetwork = await fetch(request)
		void putInCache(request, responseFromNetwork.clone())
		return responseFromNetwork
	} catch (error) {
		if (fallbackUrl) {
			const fallbackResponse = await caches.match(fallbackUrl)
			if (fallbackResponse) {
				return fallbackResponse
			}
		}
		return new Response('Network Error occured', {
			status: 408,
			headers: { 'Content-Type': 'text/plain' },
		})
	}
}

const enableNavigationPreload = async () => {
	if (self.registration?.navigationPreload) {
		await self.registration.navigationPreload.enable()
	}
}

self.addEventListener('install', (event) => {
	event.waitUntil(addResourcesToCache(['/']))
})

self.addEventListener('activate', (event) => {
	event.waitUntil(Promise.all([enableNavigationPreload(), deleteOldCaches()]))
})

self.addEventListener('fetch', (event) => {
	event.respondWith(
		cacheFirst({
			request: event.request,
			preloadResponsePromise: event.preloadResponse,
		})
	)
})
