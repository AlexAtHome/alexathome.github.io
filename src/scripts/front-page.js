	const frontPageLink = document.querySelector('#front-page-link')
	frontPageLink.addEventListener('click', event => {
		event.preventDefault()
		scrollTo({ top: 0, behavior: 'smooth' })
	})
