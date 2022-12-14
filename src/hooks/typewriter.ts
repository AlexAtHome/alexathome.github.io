import { useState, useEffect } from "preact/hooks"

export interface TypeWriterParams {
	text: string
	delay?: number
	speed?: number
	onEnd?: () => void
}

export function useTypeWriter({ text, delay = 0, speed = 75, onEnd }: TypeWriterParams) {
	const [output, setOutput] = useState('')
	let interval: number
	let index = 0

	const type = (str: string) => {
		let timeout = setTimeout(() => {
			interval = setInterval(() => {
				if (index > str.length) {
					clearInterval(interval)
					onEnd?.()
				} else {
					setOutput(str.slice(0, index))
					index++
				}
			}, speed)
			clearTimeout(timeout)
		}, delay);
	}

	useEffect(() => {
		type(text + ' ')
	}, [])

	return output
}
