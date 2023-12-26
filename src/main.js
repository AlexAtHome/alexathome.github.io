import './style.css'
import "@11ty/is-land";
if (matchMedia('not (prefers-reduced-motion)').matches) {
	import('@zachleat/snow-fall')
}
